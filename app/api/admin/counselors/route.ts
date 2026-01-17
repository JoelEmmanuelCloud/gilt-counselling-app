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
      .select('-password -sessionNotes')
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
      name,
      email,
      phone,
      password,
      specializations,
      bio,
      availability,
    } = body;

    if (!name || !email) {
      return NextResponse.json(
        { message: 'Name and email are required' },
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

    // Create counselor with default or provided password
    const defaultPassword = password || 'Counselor123!';

    const counselor = new User({
      name,
      email: email.toLowerCase(),
      phone,
      password: defaultPassword,
      role: 'counselor',
      specializations: specializations || [],
      bio: bio || '',
      availability: availability || [],
      isAvailable: true,
      emailNotifications: true,
    });

    await counselor.save();

    // Send welcome email to counselor
    try {
      await sendCounselorWelcomeEmail(email, name, defaultPassword);
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
    }

    // Remove password from response
    const { password: _, ...counselorResponse } = counselor.toObject();

    return NextResponse.json(
      {
        message: 'Counselor created successfully',
        counselor: counselorResponse,
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
