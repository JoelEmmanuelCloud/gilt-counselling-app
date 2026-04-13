import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/user';
import { requireAdmin } from '@/lib/auth';
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireAdmin();

  if (authResult.error) {
    return NextResponse.json(
      { message: authResult.error },
      { status: authResult.status }
    );
  }

  try {
    const { id } = await params;
    await connectDB();

    const counselor = await User.findOne({ _id: id, role: 'counselor' })
      ;

    if (!counselor) {
      return NextResponse.json(
        { message: 'Counselor not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(counselor, { status: 200 });
  } catch (error: any) {
    console.error('Get counselor error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch counselor' },
      { status: 500 }
    );
  }
}
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireAdmin();

  if (authResult.error) {
    return NextResponse.json(
      { message: authResult.error },
      { status: authResult.status }
    );
  }

  try {
    const { id } = await params;
    const body = await request.json();

    await connectDB();

    const counselor = await User.findOne({ _id: id, role: 'counselor' });

    if (!counselor) {
      return NextResponse.json(
        { message: 'Counselor not found' },
        { status: 404 }
      );
    }
    const allowedFields = [
      'name',
      'email',
      'phone',
      'specializations',
      'bio',
      'availability',
      'isAvailable',
      'profilePhoto',
    ];

    const updates: any = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updates[field] = body[field];
      }
    }

    const updatedCounselor = await User.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    );

    return NextResponse.json(
      {
        message: 'Counselor updated successfully',
        counselor: updatedCounselor,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Update counselor error:', error);
    return NextResponse.json(
      { message: 'Failed to update counselor' },
      { status: 500 }
    );
  }
}
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireAdmin();

  if (authResult.error) {
    return NextResponse.json(
      { message: authResult.error },
      { status: authResult.status }
    );
  }

  try {
    const { id } = await params;
    await connectDB();

    const counselor = await User.findOne({ _id: id, role: 'counselor' });

    if (!counselor) {
      return NextResponse.json(
        { message: 'Counselor not found' },
        { status: 404 }
      );
    }
    await User.findByIdAndUpdate(id, { role: 'user' });

    return NextResponse.json(
      { message: 'Counselor role removed successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Delete counselor error:', error);
    return NextResponse.json(
      { message: 'Failed to remove counselor' },
      { status: 500 }
    );
  }
}
