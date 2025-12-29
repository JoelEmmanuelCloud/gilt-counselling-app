import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/user';
import Appointment from '@/lib/models/appointment';
import { requireAdmin } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const authResult = await requireAdmin();

  if (authResult.error) {
    return NextResponse.json(
      { message: authResult.error },
      { status: authResult.status }
    );
  }

  try {
    await connectDB();

    // Get user profile (exclude password but include sessionNotes for admin)
    const user = await User.findById(id).select('-password');

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // Get all appointments for this user
    const appointments = await Appointment.find({ userId: id }).sort({ createdAt: -1 });

    // Calculate stats
    const stats = {
      totalAppointments: appointments.length,
      pending: appointments.filter(a => a.status === 'pending').length,
      confirmed: appointments.filter(a => a.status === 'confirmed').length,
      completed: appointments.filter(a => a.status === 'completed').length,
      cancelled: appointments.filter(a => a.status === 'cancelled').length,
    };

    return NextResponse.json({
      user,
      appointments,
      stats,
    }, { status: 200 });
  } catch (error: any) {
    console.error('Get user profile error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch user profile' },
      { status: 500 }
    );
  }
}
