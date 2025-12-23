import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { getAppointmentById, updateAppointment, deleteAppointment } from '@/lib/models/appointment';

// PATCH /api/appointments/[id] - Update appointment status
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = getUserFromRequest(request);

    if (!user) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { id } = params;
    const body = await request.json();
    const { status } = body;

    const appointment = getAppointmentById(id);
    if (!appointment) {
      return NextResponse.json(
        { message: 'Appointment not found' },
        { status: 404 }
      );
    }

    // Check if user has permission to update
    if (user.role !== 'admin' && appointment.userId !== user.id) {
      return NextResponse.json(
        { message: 'Not authorized to update this appointment' },
        { status: 403 }
      );
    }

    const updatedAppointment = updateAppointment(id, { status });

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
  { params }: { params: { id: string } }
) {
  try {
    const user = getUserFromRequest(request);

    if (!user) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { id } = params;

    const appointment = getAppointmentById(id);
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

    const deleted = deleteAppointment(id);
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
