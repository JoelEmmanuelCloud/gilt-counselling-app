import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/user';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const MAX_ATTEMPTS = 5;
const LOCK_MINUTES = 15;

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || typeof email !== 'string' || !password || typeof password !== 'string') {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOne({ email: email.toLowerCase(), role: 'admin' }).select('+password');

    const invalidResponse = NextResponse.json(
      { message: 'Invalid email or password' },
      { status: 401 }
    );

    if (!user || !user.password) {
      return invalidResponse;
    }

    if (user.lockUntil && user.lockUntil > new Date()) {
      const remainingMinutes = Math.ceil((user.lockUntil.getTime() - Date.now()) / (60 * 1000));
      return NextResponse.json(
        { message: `Too many failed attempts. Please try again in ${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''}.` },
        { status: 429 }
      );
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      const attempts = (user.failedLoginAttempts || 0) + 1;
      const updates: Record<string, unknown> = { failedLoginAttempts: attempts };
      if (attempts >= MAX_ATTEMPTS) {
        updates.lockUntil = new Date(Date.now() + LOCK_MINUTES * 60 * 1000);
        updates.failedLoginAttempts = 0;
      }
      await User.findByIdAndUpdate(user._id, updates);
      return invalidResponse;
    }

    await User.findByIdAndUpdate(user._id, {
      failedLoginAttempts: 0,
      lockUntil: null,
    });

    const token = jwt.sign(
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
        token,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          role: user.role,
          image: user.image,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { message: 'Failed to sign in. Please try again.' },
      { status: 500 }
    );
  }
}
