import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/lib/models/user";
import { createOTP } from "@/lib/models/otp";
import { generateOTP } from "@/lib/utils/otpGenerator";
import { sendEmail, generateOTPEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, phone } = await request.json();
    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectDB();
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }
    const user = await User.create({
      firstName,
      lastName,
      email,
      phone: phone || "",
      role: "user",
      source: "online",
      emailVerified: null,
      preferredContactMethod: "email",
      emailNotifications: true,
    });
    const code = generateOTP();
    await createOTP(email.toLowerCase(), code, 10);
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
