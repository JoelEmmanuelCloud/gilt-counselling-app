import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/lib/models/user";
import { createOTP } from "@/lib/models/otp";
import { generateOTP } from "@/lib/utils/otpGenerator";
import { sendEmail, generateOTPEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, phone } = await request.json();

    // Validation
    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    // Create user (passwordless - they'll use OTP to sign in)
    const user = await User.create({
      firstName,
      lastName,
      email,
      phone: phone || "",
      role: "user",
      source: "online",
      emailVerified: null, // Will be verified after OTP confirmation
      preferredContactMethod: "email",
      emailNotifications: true,
    });

    // Generate and send OTP for verification
    const code = generateOTP();
    await createOTP(email.toLowerCase(), code, 10); // 10 minutes expiry

    // Send OTP email
    const { html, text } = generateOTPEmail(email, code, firstName);
    await sendEmail({
      to: email,
      subject: "Verify your email - Gilt Counselling Consult",
      html,
      text,
    });

    return NextResponse.json(
      {
        message: "Account created! Please check your email for the verification code.",
        userId: user._id,
        email: email,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Failed to create account. Please try again." },
      { status: 500 }
    );
  }
}
