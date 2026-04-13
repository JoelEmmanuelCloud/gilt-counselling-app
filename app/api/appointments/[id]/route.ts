import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { getAppointmentById, updateAppointment, deleteAppointment } from '@/lib/models/appointment';
import connectDB from '@/lib/mongodb';
import { sendAppointmentStatusEmail, sendRescheduleEmail } from '@/lib/email';
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireAuth(request);

  if (authResult.error) {
    return NextResponse.json(
      { message: authResult.error },
      { status: authResult.status }
    );
  }

  try {
    await connectDB();

    const user = authResult.user;

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { status, date, time, service, notes } = body;

    const appointment = await getAppointmentById(id);
    if (!appointment) {
      return NextResponse.json(
        { message: 'Appointment not found' },
        { status: 404 }
      );
    }
    if (user.role !== 'admin' && appointment.userId?.toString() !== user.id) {
      return NextResponse.json(
        { message: 'Not authorized to update this appointment' },
        { status: 403 }
      );
    }
    if (user.role !== 'admin' && !['pending', 'confirmed'].includes(appointment.status)) {
      return NextResponse.json(
        { message: 'You can only reschedule pending or confirmed appointments.' },
        { status: 403 }
      );
    }
    const updateData: any = {};

    if (date || time) {
      if ((date && date !== appointment.date) || (time && time !== appointment.time)) {
        updateData.rescheduledFrom = {
          date: appointment.date,
          time: appointment.time,
          rescheduledAt: new Date(),
        };
      }
    }
    if (status) updateData.status = status;
    if (date) updateData.date = date;
    if (time) updateData.time = time;
    if (service) updateData.service = service;
    if (notes !== undefined) updateData.notes = notes;
    updateData.lastModifiedBy = user.role === 'admin' ? 'admin' : 'user';
    if (status === 'cancelled' && user.role !== 'admin') {
      updateData.cancelledBy = 'user';
    } else if (status === 'cancelled') {
      updateData.cancelledBy = 'admin';
    }

    const updatedAppointment = await updateAppointment(id, updateData);
    try {
      const firstName = appointment.userFirstName || appointment.userName.split(' ')[0];

      if (updateData.rescheduledFrom) {
        await sendRescheduleEmail(
          appointment.userEmail,
          firstName,
          updateData.rescheduledFrom.date,
          updateData.rescheduledFrom.time,
          date || appointment.date,
          time || appointment.time,
          appointment.service
        );
      } else if (status && status !== appointment.status) {
        await sendAppointmentStatusEmail(
          appointment.userEmail,
          firstName,
          status,
          appointment.date,
          appointment.time,
          appointment.service
        );
      }
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
    }

    return NextResponse.json({
      message: 'Appointment updated successfully',
      appointment: updatedAppointment
    });
  } catch (error) {
    console.error('Update appointment error:', error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireAuth(request);

  if (authResult.error) {
    return NextResponse.json(
      { message: authResult.error },
      { status: authResult.status }
    );
  }

  try {
    await connectDB();

    const user = authResult.user;

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 401 }
      );
    }

    const { id } = await params;

    const appointment = await getAppointmentById(id);
    if (!appointment) {
      return NextResponse.json(
        { message: 'Appointment not found' },
        { status: 404 }
      );
    }
    if (user.role !== 'admin') {
      return NextResponse.json(
        { message: 'Only admins can delete appointments' },
        { status: 403 }
      );
    }

    const deleted = await deleteAppointment(id);
    if (!deleted) {
      return NextResponse.json(
        { message: 'Appointment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error('Delete appointment error:', error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}
