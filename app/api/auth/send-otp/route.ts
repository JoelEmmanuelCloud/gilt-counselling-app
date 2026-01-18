import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/user';
import { createOTP } from '@/lib/models/otp';
import { generateOTP, isValidOTPFormat } from '@/lib/utils/otpGenerator';
import { checkOTPRateLimit } from '@/lib/utils/rateLimiter';
import { sendEmail, generateOTPEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email format
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    await connectDB();

    // Check rate limiting BEFORE generating OTP
    const rateLimitCheck = await checkOTPRateLimit(email);
    if (!rateLimitCheck.allowed) {
      return NextResponse.json(
        {
          message: rateLimitCheck.message || 'Too many requests. Please try again later.',
          remainingTime: rateLimitCheck.remainingTime,
        },
        { status: 429 }
      );
    }

    // Find or create user
    let user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      // Auto-create new user with email
      // They can update their profile (name, phone) later
      user = await User.create({
        email: email.toLowerCase(),
        name: email.split('@')[0], // Temporary name from email
        emailVerified: null, // Will be set after OTP verification
        role: 'user',
      });
      console.log('New user auto-created for OTP:', email);
    }

    // Generate 6-digit OTP
    const code = generateOTP();

    // Validate OTP format (should always be valid, but double-check)
    if (!isValidOTPFormat(code)) {
      console.error('Generated OTP is invalid:', code);
      return NextResponse.json(
        { message: 'Failed to generate verification code. Please try again.' },
        { status: 500 }
      );
    }

    // Create OTP record with 10-minute expiration
    await createOTP(email.toLowerCase(), code, 10);

    // Generate email content
    const { html, text } = generateOTPEmail(email, code, user.firstName);

    // Send email
    await sendEmail({
      to: email,
      subject: 'Your verification code for Gilt Counselling Consult',
      html,
      text,
    });

    return NextResponse.json(
      {
        message: 'Verification code sent successfully. Please check your email.',
        expiresIn: 600, // 10 minutes in seconds
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('OTP send error:', error);
    return NextResponse.json(
      { message: 'Failed to send verification code. Please try again.' },
      { status: 500 }
    );
  }
}
