import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/user';
import { requireAuth } from '@/lib/auth';

// GET current user profile
export async function GET(request: NextRequest) {
  const authResult = await requireAuth();

  if (authResult.error) {
    return NextResponse.json(
      { message: authResult.error },
      { status: authResult.status }
    );
  }

  try {
    if (!authResult.user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 401 }
      );
    }

    await connectDB();

    const user = await User.findOne({ email: authResult.user.email }).select('-sessionNotes');

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    console.error('Get profile error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

// PATCH update user profile
export async function PATCH(request: NextRequest) {
  const authResult = await requireAuth();

  if (authResult.error) {
    return NextResponse.json(
      { message: authResult.error },
      { status: authResult.status }
    );
  }

  try {
    if (!authResult.user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Remove fields that shouldn't be updated this way
    const { role, _id, sessionNotes, ...updateData } = body;

    await connectDB();

    const user = await User.findOneAndUpdate(
      { email: authResult.user.email },
      { $set: updateData },
      { new: true, runValidators: true, upsert: false }
    ).select('-sessionNotes');

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: 'Profile updated successfully',
        user,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Update profile error:', error);
    return NextResponse.json(
      { message: 'Failed to update profile' },
      { status: 500 }
    );
  }
}
