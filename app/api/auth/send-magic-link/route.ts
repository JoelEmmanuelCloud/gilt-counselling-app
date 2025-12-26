import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/user';
import { createMagicLink } from '@/lib/models/magicLink';
import { sendEmail, generateMagicLinkEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    await connectDB();

    // Check if user exists
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return NextResponse.json(
        { message: 'No account found with this email address' },
        { status: 404 }
      );
    }

    // Generate unique token
    const token = uuidv4();

    // Create magic link in database (expires in 15 minutes)
    await createMagicLink(email.toLowerCase(), token, 15);

    // Generate email content
    const { html, text } = generateMagicLinkEmail(email, token, user.name);

    // Send email
    await sendEmail({
      to: email,
      subject: 'Sign in to Gilt Counselling Consult',
      html,
      text,
    });

    return NextResponse.json(
      {
        message: 'Magic link sent successfully. Please check your email.',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Magic link send error:', error);
    return NextResponse.json(
      { message: 'Failed to send magic link. Please try again.' },
      { status: 500 }
    );
  }
}
