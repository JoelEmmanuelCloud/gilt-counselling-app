import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { findAdminInviteByToken } from "@/lib/models/adminInvite";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { error: "Invitation token is required" },
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

    return NextResponse.json(
      {
        email: invite.email,
        expiresAt: invite.expiresAt,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Admin invite verification error:", error);
    return NextResponse.json(
      { error: "Failed to verify invitation" },
      { status: 500 }
    );
  }
}
