import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Appointment from '@/lib/models/appointment';
import { requireCounselor } from '@/lib/auth';

// GET all appointments assigned to the counselor
export async function GET(request: NextRequest) {
  const authResult = await requireCounselor();

  if (authResult.error || !authResult.user) {
    return NextResponse.json(
      { message: authResult.error || 'Not authenticated' },
      { status: authResult.status || 401 }
    );
  }

  const user = authResult.user;

  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const date = searchParams.get('date');

    const query: any = { counselorId: user.id };

    if (status && status !== 'all') {
      query.status = status;
    }

    if (date) {
      query.date = date;
    }

    const appointments = await Appointment.find(query)
      .sort({ date: 1, time: 1 });

    return NextResponse.json(appointments, { status: 200 });
  } catch (error: any) {
    console.error('Get counselor appointments error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch appointments' },
      { status: 500 }
    );
  }
}
