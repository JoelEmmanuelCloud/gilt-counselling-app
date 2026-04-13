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
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return NextResponse.json(
        {
          message: 'If an account exists with this email, you will receive a new verification code shortly.',
          expiresIn: 600,
        },
        { status: 200 }
      );
    }
    await invalidateOTPsForEmail(email.toLowerCase());
    const code = generateOTP();
    if (!isValidOTPFormat(code)) {
      console.error('Generated OTP is invalid:', code);
      return NextResponse.json(
        { message: 'Failed to generate verification code. Please try again.' },
        { status: 500 }
      );
    }
    await createOTP(email.toLowerCase(), code, 10);
    const { html, text } = generateOTPEmail(email, code, user.firstName);
    await sendEmail({
      to: email,
      subject: 'Your new verification code for Gilt Counselling Consult',
      html,
      text,
    });

    return NextResponse.json(
      {
        message: 'New verification code sent successfully. Please check your email.',
        expiresIn: 600,
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
