import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/user';
import { requireAdmin } from '@/lib/auth';
import bcrypt from 'bcryptjs';

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
      .select('-password -sessionNotes')
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
      name,
      email,
      phone,
      password,
      source,
      dateOfBirth,
      gender,
      address,
      emergencyContact,
      medicalHistory,
      preferredContactMethod,
    } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { message: 'Name, email, and phone are required' },
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

    // Create user with default or provided password
    const defaultPassword = password || 'Welcome123!';

    const user = new User({
      name,
      email: email.toLowerCase(),
      phone,
      password: defaultPassword,
      role: 'user',
      source: source || 'walk-in',
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
      gender,
      address,
      emergencyContact,
      medicalHistory,
      preferredContactMethod: preferredContactMethod || 'phone',
      emailNotifications: true,
    });

    await user.save();

    // Remove password from response
    const { password: _, ...userResponse } = user.toObject();

    return NextResponse.json(
      {
        message: 'Client created successfully',
        client: userResponse,
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
