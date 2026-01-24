import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/user';
import { requireAdmin } from '@/lib/auth';
import { sendCounselorWelcomeEmail } from '@/lib/email';

// GET all counselors (admin only)
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

    const counselors = await User.find({ role: 'counselor' })
      .select('-sessionNotes')
      .sort({ createdAt: -1 });

    return NextResponse.json(counselors, { status: 200 });
  } catch (error: any) {
    console.error('Get counselors error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch counselors' },
      { status: 500 }
    );
  }
}

// POST create new counselor (admin only)
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
      specializations,
      bio,
      availability,
      profilePhoto,
    } = body;

    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { message: 'First name, last name, and email are required' },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if email already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { message: 'A user with this email already exists' },
        { status: 400 }
      );
    }

    const counselor = new User({
      firstName,
      lastName,
      email: email.toLowerCase(),
      phone,
      role: 'counselor',
      specializations: specializations || [],
      bio: bio || '',
      availability: availability || [],
      isAvailable: true,
      emailNotifications: true,
      emailVerified: new Date(),
      profilePhoto: profilePhoto || undefined,
    });

    await counselor.save();

    // Send welcome email to counselor
    try {
      await sendCounselorWelcomeEmail(email, firstName);
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
    }

    return NextResponse.json(
      {
        message: 'Counselor created successfully',
        counselor,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Create counselor error:', error);
    return NextResponse.json(
      { message: 'Failed to create counselor' },
      { status: 500 }
    );
  }
}
