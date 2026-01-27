import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Notification, { getNotificationsByUserId, getUnreadCount } from '@/lib/models/notification';
import { requireAuth } from '@/lib/auth';

// GET notifications for the current user
export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const unreadOnly = searchParams.get('unread') === 'true';

    let query: any = { userId: user.id };

    if (unreadOnly) {
      query.read = false;
    }

    const notifications = await Notification.find(query)
      .sort({ createdAt: -1 })
      .limit(limit);

    const unreadCount = await getUnreadCount(user.id);

    return NextResponse.json({
      notifications,
      unreadCount,
    }, { status: 200 });
  } catch (error: any) {
    console.error('Get notifications error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch notifications' },
      { status: 500 }
    );
  }
}
