import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/user';
import { requireAdmin } from '@/lib/auth';

// GET all clients (admin only)
export async function GET(request: NextRequest) {
  const authResult = await requireAdmin();

  if (authResult.error) {
    return NextResponse.json(
      { message: authResult.error },
      { status: authResult.status }
    );
  }

  try {
    await connectDB();

    const clients = await User.find({ role: 'user' })
      .select('-sessionNotes')
      .sort({ createdAt: -1 });

    return NextResponse.json(clients, { status: 200 });
  } catch (error: any) {
    console.error('Get clients error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch clients' },
      { status: 500 }
    );
  }
}

// POST create new client (admin only)
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
    const {
      firstName,
      lastName,
      email,
      phone,
      source,
      dateOfBirth,
      gender,
      address,
      emergencyContact,
      medicalHistory,
      preferredContactMethod,
    } = body;

    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json(
        { message: 'First name, last name, email, and phone are required' },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if email already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { message: 'A client with this email already exists' },
        { status: 400 }
      );
    }

    const user = new User({
      firstName,
      lastName,
      email: email.toLowerCase(),
      phone,
      role: 'user',
      source: source || 'walk-in',
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
      gender,
      address,
      emergencyContact,
      medicalHistory,
      preferredContactMethod: preferredContactMethod || 'phone',
      emailNotifications: true,
      emailVerified: new Date(),
    });

    await user.save();

    return NextResponse.json(
      {
        message: 'Client created successfully',
        client: user,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Create client error:', error);
    return NextResponse.json(
      { message: 'Failed to create client' },
      { status: 500 }
    );
  }
}
