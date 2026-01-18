import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/lib/models/user";
import { sendWelcomeEmail } from "@/lib/email";

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
      emailVerified: new Date(), // Auto-verify since they'll use OTP
      preferredContactMethod: "email",
      emailNotifications: true,
    });

    // Send welcome email (uses the consistent email template design)
    try {
      await sendWelcomeEmail(email, firstName);
    } catch (emailError) {
      console.error("Failed to send welcome email:", emailError);
      // Don't fail the signup if email fails
    }

    return NextResponse.json(
      {
        message:
          "Account created successfully! You can now sign in with a verification code.",
        userId: user._id,
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
