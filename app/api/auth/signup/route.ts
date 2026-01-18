import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/lib/models/user";
import { sendEmail } from "@/lib/email";

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

    // Send welcome email
    try {
      await sendEmail({
        to: email,
        subject: "Welcome to Gilt Counselling Consult!",
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(135deg, #D9A85D 0%, #F5A623 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to Gilt Counselling!</h1>
              </div>

              <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0;">
                <p style="font-size: 16px; margin-bottom: 20px;">Hi ${firstName},</p>

                <p style="font-size: 16px; margin-bottom: 20px;">
                  Thank you for creating an account with Gilt Counselling Consult. We're excited to have you!
                </p>

                <p style="font-size: 16px; margin-bottom: 20px;">
                  Your account has been created successfully. To sign in, simply use your email address and we'll send you a verification code - no password needed!
                </p>

                <div style="text-align: center; margin: 30px 0;">
                  <a href="${process.env.NEXT_PUBLIC_APP_URL}/auth/signin"
                     style="background: linear-gradient(135deg, #D9A85D 0%, #F5A623 100%);
                            color: white;
                            padding: 15px 40px;
                            text-decoration: none;
                            border-radius: 8px;
                            font-weight: bold;
                            font-size: 16px;
                            display: inline-block;">
                    Sign In Now
                  </a>
                </div>

                <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">

                <p style="font-size: 14px; color: #666;">
                  <strong>Our Services:</strong><br>
                  • Individual Counselling<br>
                  • Couples Therapy<br>
                  • Family Counselling<br>
                  • Career Counselling<br>
                  • And more...
                </p>

                <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">

                <p style="font-size: 14px; color: #666;">
                  <strong>Our Locations:</strong><br>
                  🇳🇬 Port Harcourt, Rivers State, Nigeria<br>
                  🇨🇦 Winnipeg, Manitoba, Canada
                </p>

                <p style="font-size: 14px; color: #666;">
                  <strong>Contact us:</strong><br>
                  📧 hello@giltcounselling.com<br>
                  📱 +234 803 309 4050
                </p>
              </div>
            </body>
          </html>
        `,
      });
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
