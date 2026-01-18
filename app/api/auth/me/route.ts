import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/lib/auth.config';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/user';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET(request: NextRequest) {
  try {
    // First, check for NextAuth session (Google auth)
    const session = await getServerSession(authConfig);

    if (session?.user) {
      // NextAuth user (logged in via Google)
      return NextResponse.json({ user: session.user });
    }

    // If no NextAuth session, check for custom JWT token (OTP auth)
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];

    // Verify JWT token
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      email: string;
      role: string;
    };

    // Fetch user from database
    await connectDB();
    const user = await User.findById(decoded.userId);

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // Return user data in same format as NextAuth
    return NextResponse.json({
      user: {
        id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        image: user.image,
      },
    });
  } catch (error: any) {
    console.error('Auth verification error:', error);

    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return NextResponse.json(
        { message: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: 'Authentication failed' },
      { status: 401 }
    );
  }
}
