import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/user';
import { requireCounselor } from '@/lib/auth';

// GET counselor's availability
export async function GET(request: NextRequest) {
  const authResult = await requireCounselor();

  if (authResult.error || !authResult.user) {
    return NextResponse.json(
      { message: authResult.error || 'Not authenticated' },
      { status: authResult.status || 401 }
    );
  }

  const user = authResult.user;

  try {
    await connectDB();

    const counselor = await User.findById(user.id)
      .select('availability isAvailable');

    if (!counselor) {
      return NextResponse.json(
        { message: 'Counselor not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      availability: counselor.availability || [],
      isAvailable: counselor.isAvailable ?? true,
    }, { status: 200 });
  } catch (error: any) {
    console.error('Get availability error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch availability' },
      { status: 500 }
    );
  }
}

// PATCH update counselor's availability
export async function PATCH(request: NextRequest) {
  const authResult = await requireCounselor();

  if (authResult.error || !authResult.user) {
    return NextResponse.json(
      { message: authResult.error || 'Not authenticated' },
      { status: authResult.status || 401 }
    );
  }

  const user = authResult.user;

  try {
    const body = await request.json();
    const { availability, isAvailable } = body;

    await connectDB();

    const updates: any = {};

    if (availability !== undefined) {
      updates.availability = availability;
    }

    if (isAvailable !== undefined) {
      updates.isAvailable = isAvailable;
    }

    const updatedCounselor = await User.findByIdAndUpdate(
      user.id,
      updates,
      { new: true }
    ).select('availability isAvailable');

    return NextResponse.json({
      message: 'Availability updated successfully',
      availability: updatedCounselor.availability,
      isAvailable: updatedCounselor.isAvailable,
    }, { status: 200 });
  } catch (error: any) {
    console.error('Update availability error:', error);
    return NextResponse.json(
      { message: 'Failed to update availability' },
      { status: 500 }
    );
  }
}
