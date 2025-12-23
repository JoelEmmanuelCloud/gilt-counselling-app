import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { createAppointment, getAllAppointments, getAppointmentsByUserId } from '@/lib/models/appointment';
import connectDB from '@/lib/mongodb';

// GET /api/appointments - Get all appointments (admin) or user's appointments
export async function GET(request: NextRequest) {
  try {
    // Connect to database
    await connectDB();

    const user = await getUserFromRequest(request);

    if (!user) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Admin can see all appointments
    if (user.role === 'admin') {
      const appointments = await getAllAppointments();
      return NextResponse.json(appointments);
    }

    // Regular users see only their appointments
    const appointments = await getAppointmentsByUserId(user.id);
    return NextResponse.json(appointments);
  } catch (error) {
    console.error('Get appointments error:', error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}

// POST /api/appointments - Create new appointment
export async function POST(request: NextRequest) {
  try {
    // Connect to database
    await connectDB();

    const body = await request.json();
    const { name, email, phone, service, date, time, notes } = body;

    // Validate input
    if (!name || !email || !phone || !service || !date || !time) {
      return NextResponse.json(
        { message: 'All required fields must be provided' },
        { status: 400 }
      );
    }

    // Try to get user if authenticated (optional for appointments)
    const user = await getUserFromRequest(request);

    // Create appointment
    const appointmentData = {
      userId: user?.id || null,
      userName: name,
      userEmail: email,
      userPhone: phone,
      service,
      date,
      time,
      notes: notes || ''
    };

    const newAppointment = await createAppointment(appointmentData);

    return NextResponse.json(
      {
        message: 'Appointment booked successfully',
        appointment: newAppointment
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create appointment error:', error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}
