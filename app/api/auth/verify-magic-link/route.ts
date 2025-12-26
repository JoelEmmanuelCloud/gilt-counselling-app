import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/user';
import { findMagicLinkByToken, markMagicLinkAsUsed } from '@/lib/models/magicLink';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ message: 'Token is required' }, { status: 400 });
    }

    await connectDB();

    // Find valid magic link
    const magicLink = await findMagicLinkByToken(token);

    if (!magicLink) {
      return NextResponse.json(
        { message: 'Invalid or expired magic link' },
        { status: 400 }
      );
    }

    // Find user
    const user = await User.findOne({ email: magicLink.email });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Mark magic link as used
    await markMagicLinkAsUsed(token);

    // Generate JWT token
    const jwtToken = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return NextResponse.json(
      {
        message: 'Login successful',
        token: jwtToken,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Magic link verification error:', error);
    return NextResponse.json(
      { message: 'Failed to verify magic link. Please try again.' },
      { status: 500 }
    );
  }
}
