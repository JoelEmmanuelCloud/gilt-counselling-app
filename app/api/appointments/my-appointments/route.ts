import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { getAppointmentsByUserId } from '@/lib/models/appointment';
import connectDB from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  const authResult = await requireAuth();

  if (authResult.error) {
    return NextResponse.json(
      { message: authResult.error },
      { status: authResult.status }
    );
  }

  try {
    // Connect to database
    await connectDB();

    const user = authResult.user;

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 401 }
      );
    }

    const appointments = await getAppointmentsByUserId(user.id);
    return NextResponse.json({ appointments });
  } catch (error) {
    console.error('Get my appointments error:', error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}
