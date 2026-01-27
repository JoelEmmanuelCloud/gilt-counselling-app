import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Appointment from '@/lib/models/appointment';
import User from '@/lib/models/user';
import Notification, { createNotification } from '@/lib/models/notification';
import { requireAdmin } from '@/lib/auth';
import { sendCounselorAssignmentEmail } from '@/lib/email';

// PATCH - Assign counselor to appointment
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireAdmin(request);

  if (authResult.error || !authResult.user) {
    return NextResponse.json(
      { message: authResult.error || 'Not authenticated' },
      { status: authResult.status || 401 }
    );
  }

  const { id } = await params;

  try {
    await connectDB();

    const body = await request.json();
    const { counselorId } = body;

    if (!counselorId) {
      return NextResponse.json(
        { message: 'Counselor ID is required' },
        { status: 400 }
      );
    }

    // Find the appointment
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return NextResponse.json(
        { message: 'Appointment not found' },
        { status: 404 }
      );
    }

    // Find the counselor
    const counselor = await User.findOne({
      _id: counselorId,
      role: 'counselor',
    });

    if (!counselor) {
      return NextResponse.json(
        { message: 'Counselor not found' },
        { status: 404 }
      );
    }

    // Check if counselor is available
    if (counselor.isAvailable === false) {
      return NextResponse.json(
        { message: 'Counselor is not available for appointments' },
        { status: 400 }
      );
    }

    const counselorName = `${counselor.firstName} ${counselor.lastName}`;
    const previousCounselorId = appointment.counselorId?.toString();

    // Update the appointment with counselor details
    appointment.counselorId = counselorId;
    appointment.counselorName = counselorName;
    appointment.lastModifiedBy = 'admin';
    await appointment.save();

    // Create in-app notification for the counselor
    await createNotification({
      userId: counselorId,
      type: 'appointment_assigned',
      title: 'New Appointment Assigned',
      message: `You have been assigned a new appointment with ${appointment.userName} for ${appointment.service} on ${appointment.date} at ${appointment.time}.`,
      data: {
        appointmentId: appointment._id.toString(),
        clientName: appointment.userName,
        clientEmail: appointment.userEmail,
        clientPhone: appointment.userPhone,
        service: appointment.service,
        date: appointment.date,
        time: appointment.time,
      },
      read: false,
    });

    // Send email notification to counselor
    try {
      await sendCounselorAssignmentEmail(
        counselor.email,
        counselor.firstName,
        appointment.userName,
        appointment.userEmail,
        appointment.userPhone,
        appointment.service,
        appointment.date,
        appointment.time,
        appointment._id.toString()
      );
    } catch (emailError) {
      console.error('Failed to send assignment email:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json({
      message: 'Counselor assigned successfully',
      appointment: {
        _id: appointment._id,
        counselorId: appointment.counselorId,
        counselorName: appointment.counselorName,
      },
    }, { status: 200 });
  } catch (error: any) {
    console.error('Assign counselor error:', error);
    return NextResponse.json(
      { message: 'Failed to assign counselor' },
      { status: 500 }
    );
  }
}
