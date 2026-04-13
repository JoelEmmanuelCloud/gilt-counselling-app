import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { createAppointment, getAllAppointments, getAppointmentsByUserId } from '@/lib/models/appointment';
import connectDB from '@/lib/mongodb';
export async function GET(request: NextRequest) {
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
    if (user.role === 'admin') {
      const appointments = await getAllAppointments();
      return NextResponse.json(appointments);
    }
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
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, email, phone, service, date, time, notes } = body;
    if (!name || !email || !phone || !service || !date || !time) {
      return NextResponse.json(
        { message: 'All required fields must be provided' },
        { status: 400 }
      );
    }
    const authResult = await requireAuth(request);
    const user = authResult.error ? null : authResult.user;
    const firstName = name.split(' ')[0];
    const appointmentData = {
      userId: user?.id || null,
      userName: name,
      userFirstName: firstName,
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
