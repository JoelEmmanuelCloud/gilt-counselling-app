import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/user';
import { createOTP, invalidateOTPsForEmail } from '@/lib/models/otp';
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

    // Check rate limiting (resend counts towards the same limit)
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

    // Check if user exists
    const user = await User.findOne({ email: email.toLowerCase() });

    // For security, don't reveal if user exists or not
    if (!user) {
      // Still return success to prevent email enumeration
      return NextResponse.json(
        {
          message: 'If an account exists with this email, you will receive a new verification code shortly.',
          expiresIn: 600, // 10 minutes in seconds
        },
        { status: 200 }
      );
    }

    // Invalidate all previous unused OTPs for this email
    await invalidateOTPsForEmail(email.toLowerCase());

    // Generate new 6-digit OTP
    const code = generateOTP();

    // Validate OTP format (should always be valid, but double-check)
    if (!isValidOTPFormat(code)) {
      console.error('Generated OTP is invalid:', code);
      return NextResponse.json(
        { message: 'Failed to generate verification code. Please try again.' },
        { status: 500 }
      );
    }

    // Create new OTP record with 10-minute expiration
    await createOTP(email.toLowerCase(), code, 10);

    // Generate email content
    const { html, text } = generateOTPEmail(email, code, user.name);

    // Send email
    await sendEmail({
      to: email,
      subject: 'Your new verification code for Gilt Counselling Consult',
      html,
      text,
    });

    return NextResponse.json(
      {
        message: 'New verification code sent successfully. Please check your email.',
        expiresIn: 600, // 10 minutes in seconds
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('OTP resend error:', error);
    return NextResponse.json(
      { message: 'Failed to resend verification code. Please try again.' },
      { status: 500 }
    );
  }
}
