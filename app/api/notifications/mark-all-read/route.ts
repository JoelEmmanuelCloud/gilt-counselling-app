import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { markAllAsRead } from '@/lib/models/notification';
import { requireAuth } from '@/lib/auth';

// PATCH - Mark all notifications as read
export async function PATCH(request: NextRequest) {
  const authResult = await requireAuth(request);

  if (authResult.error || !authResult.user) {
    return NextResponse.json(
      { message: authResult.error || 'Not authenticated' },
      { status: authResult.status || 401 }
    );
  }

  const user = authResult.user;

  try {
    await connectDB();

    const result = await markAllAsRead(user.id);

    return NextResponse.json({
      message: 'All notifications marked as read',
      modifiedCount: result.modifiedCount,
    }, { status: 200 });
  } catch (error: any) {
    console.error('Mark all read error:', error);
    return NextResponse.json(
      { message: 'Failed to mark notifications as read' },
      { status: 500 }
    );
  }
}
