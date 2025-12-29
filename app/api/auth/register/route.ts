import { NextRequest, NextResponse } from 'next/server';
import { createUser, findUserByEmail } from '@/lib/models/user';
import { generateToken } from '@/lib/auth';
import connectDB from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    // Connect to database
    await connectDB();

    const body = await request.json();
    const { name, email, password, phone } = body;

    // Validate input
    if (!name || !email || !password || !phone) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      );
    }

    // Create new user
    const newUser = await createUser(name, email, password, phone);

    // Generate token with MongoDB _id
    const token = generateToken(newUser._id!.toString(), newUser.email);

    // Return user data (without password)
    const userObj = newUser.toObject();
    const { password: _, ...userWithoutPassword } = userObj;

    return NextResponse.json(
      {
        message: 'User registered successfully',
        token,
        user: {
          ...userWithoutPassword,
          id: userObj._id.toString(),
        }
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: error.message || 'Server error' },
      { status: 500 }
    );
  }
}
