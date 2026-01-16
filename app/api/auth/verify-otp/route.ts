import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/user';
import { findOTPByCode, markOTPAsUsed, incrementAttempts } from '@/lib/models/otp';
import { isValidOTPFormat } from '@/lib/utils/otpGenerator';
import { sendWelcomeEmail } from '@/lib/email';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const MAX_ATTEMPTS = 3;

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json();

    // Validate inputs
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      );
    }

    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { message: 'Verification code is required' },
        { status: 400 }
      );
    }

    // Validate OTP format (must be 6 digits)
    if (!isValidOTPFormat(code)) {
      return NextResponse.json(
        { message: 'Verification code must be exactly 6 digits' },
        { status: 400 }
      );
    }

    await connectDB();

    // Find OTP record
    const otp = await findOTPByCode(email.toLowerCase(), code);

    if (!otp) {
      return NextResponse.json(
        { message: 'Invalid or expired verification code' },
        { status: 401 }
      );
    }

    // Check if max attempts reached
    if (otp.attempts >= MAX_ATTEMPTS) {
      return NextResponse.json(
        {
          message: 'Too many failed attempts. Please request a new verification code.',
          attemptsRemaining: 0,
        },
        { status: 401 }
      );
    }

    // Check if OTP is already used
    if (otp.used) {
      return NextResponse.json(
        { message: 'This verification code has already been used' },
        { status: 401 }
      );
    }

    // Check if OTP has expired
    if (new Date() > otp.expiresAt) {
      return NextResponse.json(
        { message: 'Verification code has expired. Please request a new one.' },
        { status: 401 }
      );
    }

    // Find user
    const user = await User.findOne({ email: otp.email });

    if (!user) {
      // Increment attempts even if user not found (to prevent brute force)
      await incrementAttempts(otp._id as string);
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // Mark OTP as used (successful verification)
    await markOTPAsUsed(otp._id as string);

    // Update email verified status if not already verified
    const isFirstTimeVerification = !user.emailVerified;
    if (!user.emailVerified) {
      user.emailVerified = new Date();
      await user.save();

      // Send welcome email for first-time verification
      try {
        await sendWelcomeEmail(user.email, user.name);
      } catch (emailError) {
        console.error('Failed to send welcome email:', emailError);
      }
    }

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
          image: user.image,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('OTP verification error:', error);
    return NextResponse.json(
      { message: 'Failed to verify code. Please try again.' },
      { status: 500 }
    );
  }
}
