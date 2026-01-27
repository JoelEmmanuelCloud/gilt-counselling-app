import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Notification from '@/lib/models/notification';
import { requireAuth } from '@/lib/auth';

// PATCH - Mark notification as read
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireAuth(request);

  if (authResult.error || !authResult.user) {
    return NextResponse.json(
      { message: authResult.error || 'Not authenticated' },
      { status: authResult.status || 401 }
    );
  }

  const user = authResult.user;
  const { id } = await params;

  try {
    await connectDB();

    // Find notification and verify it belongs to the user
    const notification = await Notification.findOne({
      _id: id,
      userId: user.id,
    });

    if (!notification) {
      return NextResponse.json(
        { message: 'Notification not found' },
        { status: 404 }
      );
    }

    // Update the notification
    notification.read = true;
    await notification.save();

    return NextResponse.json(notification, { status: 200 });
  } catch (error: any) {
    console.error('Update notification error:', error);
    return NextResponse.json(
      { message: 'Failed to update notification' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a notification
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireAuth(request);

  if (authResult.error || !authResult.user) {
    return NextResponse.json(
      { message: authResult.error || 'Not authenticated' },
      { status: authResult.status || 401 }
    );
  }

  const user = authResult.user;
  const { id } = await params;

  try {
    await connectDB();

    // Find and delete notification, verifying it belongs to the user
    const notification = await Notification.findOneAndDelete({
      _id: id,
      userId: user.id,
    });

    if (!notification) {
      return NextResponse.json(
        { message: 'Notification not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Notification deleted' }, { status: 200 });
  } catch (error: any) {
    console.error('Delete notification error:', error);
    return NextResponse.json(
      { message: 'Failed to delete notification' },
      { status: 500 }
    );
  }
}
