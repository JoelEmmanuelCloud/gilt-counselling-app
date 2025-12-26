import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth.config.nextauth";
import { v4 as uuidv4 } from "uuid";
import connectDB from "@/lib/mongodb";
import User from "@/lib/models/user";
import { createAdminInvite } from "@/lib/models/adminInvite";
import { sendEmail } from "@/lib/email";

// Send admin invitation
export async function POST(request: NextRequest) {
  try {
    // Get session to verify admin
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized - Admin access required" },
        { status: 401 }
      );
    }

    const { email, name } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Generate unique token
    const token = uuidv4();

    // Create admin invite (expires in 48 hours)
    await createAdminInvite(email, token, session.user.id, 48);

    // Send invitation email
    const inviteUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/admin-accept?token=${token}`;

    try {
      await sendEmail({
        to: email,
        subject: "Admin Invitation - Gilt Counselling Consult",
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(135deg, #1BA5BB 0%, #5FB74E 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 28px;">Admin Invitation</h1>
              </div>

              <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0;">
                <p style="font-size: 16px; margin-bottom: 20px;">Hi${name ? ` ${name}` : ""},</p>

                <p style="font-size: 16px; margin-bottom: 20px;">
                  You have been invited to join Gilt Counselling Consult as an <strong>Administrator</strong>.
                </p>

                <p style="font-size: 16px; margin-bottom: 30px;">
                  As an admin, you'll have access to:
                </p>

                <ul style="font-size: 15px; color: #555; margin-bottom: 30px;">
                  <li>Client management dashboard</li>
                  <li>Appointment scheduling and management</li>
                  <li>Admin-assisted booking for phone/WhatsApp clients</li>
                  <li>Client records and session notes</li>
                  <li>System configuration</li>
                </ul>

                <p style="font-size: 16px; margin-bottom: 30px;">
                  Click the button below to accept your invitation and create your admin account:
                </p>

                <div style="text-align: center; margin: 30px 0;">
                  <a href="${inviteUrl}"
                     style="background: linear-gradient(135deg, #1BA5BB 0%, #5FB74E 100%);
                            color: white;
                            padding: 15px 40px;
                            text-decoration: none;
                            border-radius: 8px;
                            font-weight: bold;
                            font-size: 16px;
                            display: inline-block;">
                    Accept Invitation & Create Account
                  </a>
                </div>

                <p style="font-size: 14px; color: #666; margin-top: 30px;">
                  Or copy and paste this link into your browser:
                </p>
                <p style="font-size: 12px; color: #1BA5BB; word-break: break-all;">
                  ${inviteUrl}
                </p>

                <p style="font-size: 14px; color: #666; margin-top: 30px;">
                  This invitation will expire in 48 hours for security reasons.
                </p>

                <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">

                <p style="font-size: 14px; color: #666;">
                  <strong>Gilt Counselling Consult</strong><br>
                  Professional Counselling & Psychotherapy Services
                </p>

                <p style="font-size: 14px; color: #666;">
                  🇳🇬 Port Harcourt, Rivers State, Nigeria<br>
                  🇨🇦 Winnipeg, Manitoba, Canada
                </p>

                <p style="font-size: 12px; color: #999; margin-top: 30px;">
                  If you didn't expect this invitation, please ignore this email or contact us.
                </p>
              </div>
            </body>
          </html>
        `,
      });
    } catch (emailError) {
      console.error("Failed to send invitation email:", emailError);
      return NextResponse.json(
        { error: "Failed to send invitation email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Admin invitation sent successfully",
        email,
        expiresIn: "48 hours",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Admin invitation error:", error);
    return NextResponse.json(
      { error: "Failed to send admin invitation" },
      { status: 500 }
    );
  }
}
