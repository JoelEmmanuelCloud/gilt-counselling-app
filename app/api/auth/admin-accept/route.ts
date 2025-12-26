import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/lib/models/user";
import {
  findAdminInviteByToken,
  markAdminInviteAsUsed,
} from "@/lib/models/adminInvite";

export async function POST(request: NextRequest) {
  try {
    const { token, name, phone, password } = await request.json();

    // Validation
    if (!token || !name || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    await connectDB();

    // Find valid invite
    const invite = await findAdminInviteByToken(token);

    if (!invite) {
      return NextResponse.json(
        { error: "Invalid or expired invitation" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: invite.email });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin user
    const user = await User.create({
      name,
      email: invite.email,
      phone: phone || "",
      password: hashedPassword,
      role: "admin", // Assign admin role
      emailVerified: new Date(), // Auto-verify email for invited admins
      source: "online",
      preferences: {
        contactMethod: "email",
        emailNotifications: true,
      },
    });

    // Mark invite as used
    await markAdminInviteAsUsed(token);

    return NextResponse.json(
      {
        message: "Admin account created successfully",
        userId: user._id,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Admin account creation error:", error);
    return NextResponse.json(
      { error: "Failed to create admin account. Please try again." },
      { status: 500 }
    );
  }
}
