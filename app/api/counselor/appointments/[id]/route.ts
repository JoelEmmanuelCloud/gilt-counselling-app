import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Appointment from '@/lib/models/appointment';
import { requireCounselor } from '@/lib/auth';
import { sendAppointmentStatusEmail } from '@/lib/email';

// GET single appointment (counselor only)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireCounselor();

  if (authResult.error || !authResult.user) {
    return NextResponse.json(
      { message: authResult.error || 'Not authenticated' },
      { status: authResult.status || 401 }
    );
  }

  const user = authResult.user;

  try {
    const { id } = await params;
    await connectDB();

    const appointment = await Appointment.findOne({
      _id: id,
      counselorId: user.id,
    });

    if (!appointment) {
      return NextResponse.json(
        { message: 'Appointment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(appointment, { status: 200 });
  } catch (error: any) {
    console.error('Get appointment error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch appointment' },
      { status: 500 }
    );
  }
}

// PATCH update appointment (counselor only)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireCounselor();

  if (authResult.error || !authResult.user) {
    return NextResponse.json(
      { message: authResult.error || 'Not authenticated' },
      { status: authResult.status || 401 }
    );
  }

  const user = authResult.user;

  try {
    const { id } = await params;
    const body = await request.json();

    await connectDB();

    const appointment = await Appointment.findOne({
      _id: id,
      counselorId: user.id,
    });

    if (!appointment) {
      return NextResponse.json(
        { message: 'Appointment not found' },
        { status: 404 }
      );
    }

    // Fields that counselor can update
    const allowedFields = ['status', 'counselorNotes'];
    const updates: any = { lastModifiedBy: 'counselor' };

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updates[field] = body[field];
      }
    }

    // Handle cancellation
    if (body.status === 'cancelled') {
      updates.cancelledBy = 'counselor';
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    );

    // Send email notification for status changes
    if (body.status && body.status !== appointment.status) {
      try {
        // Use userFirstName if available, otherwise extract from userName
        const firstName = appointment.userFirstName || appointment.userName.split(' ')[0];
        await sendAppointmentStatusEmail(
          appointment.userEmail,
          firstName,
          body.status,
          appointment.date,
          appointment.time,
          appointment.service
        );
      } catch (emailError) {
        console.error('Failed to send status email:', emailError);
      }
    }

    return NextResponse.json(
      {
        message: 'Appointment updated successfully',
        appointment: updatedAppointment,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Update appointment error:', error);
    return NextResponse.json(
      { message: 'Failed to update appointment' },
      { status: 500 }
    );
  }
}
