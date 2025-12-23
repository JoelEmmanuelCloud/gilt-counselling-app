import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail, validatePassword } from '@/lib/models/user';
import { generateToken } from '@/lib/auth';
import connectDB from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    // Connect to database
    await connectDB();

    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user
    const user = await findUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Validate password
    const isValidPassword = await validatePassword(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate token with MongoDB _id
    const token = generateToken(user._id!.toString());

    // Return user data (without password)
    const userObj = user.toObject();
    const { password: _, ...userWithoutPassword } = userObj;

    return NextResponse.json({
      message: 'Login successful',
      token,
      user: {
        ...userWithoutPassword,
        id: userObj._id.toString(),
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}
