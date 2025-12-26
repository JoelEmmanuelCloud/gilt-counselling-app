import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/user';
import Appointment from '@/lib/models/appointment';
import { requireAdmin } from '@/lib/auth';
import { sendEmail, generateAppointmentConfirmationEmail } from '@/lib/email';

// POST create appointment for client (admin-assisted booking)
export async function POST(request: NextRequest) {
  const authResult = await requireAdmin();

  if (authResult.error) {
    return NextResponse.json(
      { message: authResult.error },
      { status: authResult.status }
    );
  }

  try {
    const body = await request.json();
    const { userId, service, date, time, notes, status, sendConfirmation } = body;

    if (!userId || !service || !date || !time) {
      return NextResponse.json(
        { message: 'User ID, service, date, and time are required' },
        { status: 400 }
      );
    }

    await connectDB();

    // Get client details
    const client = await User.findById(userId);

    if (!client) {
      return NextResponse.json(
        { message: 'Client not found' },
        { status: 404 }
      );
    }

    // Create appointment
    const appointment = new Appointment({
      userId: client._id,
      userName: client.name,
      userEmail: client.email,
      userPhone: client.phone,
      service,
      date,
      time,
      status: status || 'confirmed',
      notes: notes || `Booked by admin: ${authResult.user.email}`,
    });

    await appointment.save();

    // Send confirmation email if requested
    if (sendConfirmation && client.emailNotifications) {
      try {
        const { html } = generateAppointmentConfirmationEmail(
          client.name,
          service,
          date,
          time,
          'To be confirmed'
        );

        await sendEmail({
          to: client.email,
          subject: 'Appointment Confirmed - Gilt Counselling Consult',
          html,
        });
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError);
        // Continue even if email fails
      }
    }

    return NextResponse.json(
      {
        message: 'Appointment created successfully',
        appointment,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Create booking error:', error);
    return NextResponse.json(
      { message: 'Failed to create appointment' },
      { status: 500 }
    );
  }
}
