import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { getAppointmentById, updateAppointment, deleteAppointment } from '@/lib/models/appointment';
import connectDB from '@/lib/mongodb';

// PATCH /api/appointments/[id] - Update appointment status
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    // Check if user has permission to update
    if (user.role !== 'admin' && appointment.userId?.toString() !== user.id) {
      return NextResponse.json(
        { message: 'Not authorized to update this appointment' },
        { status: 403 }
      );
    }

    // Users can only edit pending appointments (not confirmed/completed)
    if (user.role !== 'admin' && appointment.status !== 'pending') {
      return NextResponse.json(
        { message: 'You can only edit pending appointments. Please contact us to reschedule confirmed appointments.' },
        { status: 403 }
      );
    }

    // Track rescheduling
    const updateData: any = {};

    if (date || time) {
      // If date or time is being changed, track it
      if ((date && date !== appointment.date) || (time && time !== appointment.time)) {
        updateData.rescheduledFrom = {
          date: appointment.date,
          time: appointment.time,
          rescheduledAt: new Date(),
        };
      }
    }

    // Build update object
    if (status) updateData.status = status;
    if (date) updateData.date = date;
    if (time) updateData.time = time;
    if (service) updateData.service = service;
    if (notes !== undefined) updateData.notes = notes;

    // Track who made the change
    updateData.lastModifiedBy = user.role === 'admin' ? 'admin' : 'user';

    // If user cancels, track it
    if (status === 'cancelled' && user.role !== 'admin') {
      updateData.cancelledBy = 'user';
    } else if (status === 'cancelled') {
      updateData.cancelledBy = 'admin';
    }

    const updatedAppointment = await updateAppointment(id, updateData);

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

// DELETE /api/appointments/[id] - Delete appointment (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;

    const appointment = await getAppointmentById(id);
    if (!appointment) {
      return NextResponse.json(
        { message: 'Appointment not found' },
        { status: 404 }
      );
    }

    // Only admin can delete appointments
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
