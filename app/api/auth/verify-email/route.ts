import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/lib/models/user";

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { error: "Verification token is required" },
        { status: 400 }
      );
    }

    await connectDB();
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpiry: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired verification token" },
        { status: 400 }
      );
    }
    user.emailVerified = new Date();
    user.verificationToken = undefined;
    user.verificationTokenExpiry = undefined;
    await user.save();

    return NextResponse.json(
      {
        message: "Email verified successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Email verification error:", error);
    return NextResponse.json(
      { error: "Failed to verify email. Please try again." },
      { status: 500 }
    );
  }
}
