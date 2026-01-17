import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./mongodb-client";
import User from "./models/user";
import bcrypt from "bcryptjs";
import connectDB from "./mongodb";
import { sendEmail } from "./email";

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise) as any,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: "user", // Default role for Google sign-ups
          emailVerified: profile.email_verified ? new Date() : null,
        };
      },
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT ? parseInt(process.env.EMAIL_SERVER_PORT) : undefined,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      async sendVerificationRequest({ identifier: email, url, provider }) {
        try {
          await sendEmail({
            to: email,
            subject: "Sign in to Gilt Counselling Consult",
            html: `
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="utf-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
                  <div style="background: linear-gradient(135deg, #D9A85D 0%, #F5A623 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                    <h1 style="color: white; margin: 0; font-size: 28px;">Sign in to Gilt Counselling</h1>
                  </div>

                  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0;">
                    <p style="font-size: 16px; margin-bottom: 20px;">Hello,</p>

                    <p style="font-size: 16px; margin-bottom: 20px;">
                      Click the button below to sign in to your Gilt Counselling Consult account:
                    </p>

                    <div style="text-align: center; margin: 30px 0;">
                      <a href="${url}"
                         style="background: linear-gradient(135deg, #D9A85D 0%, #F5A623 100%);
                                color: white;
                                padding: 15px 40px;
                                text-decoration: none;
                                border-radius: 8px;
                                font-weight: bold;
                                font-size: 16px;
                                display: inline-block;">
                        Sign In
                      </a>
                    </div>

                    <p style="font-size: 14px; color: #666; margin-top: 30px;">
                      Or copy and paste this link into your browser:
                    </p>
                    <p style="font-size: 12px; color: #1BA5BB; word-break: break-all;">
                      ${url}
                    </p>

                    <p style="font-size: 14px; color: #666; margin-top: 30px;">
                      This link will expire in 24 hours and can only be used once.
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

                    <p style="font-size: 12px; color: #999; margin-top: 30px;">
                      If you didn't request this email, you can safely ignore it.
                    </p>
                  </div>
                </body>
              </html>
            `,
          });
        } catch (error) {
          console.error("Failed to send magic link email:", error);
          throw new Error("Failed to send verification email");
        }
      },
    }),
    // Keep credentials provider for admin users who have passwords
    CredentialsProvider({
      id: "admin-credentials",
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        await connectDB();

        const user = await User.findOne({ email: credentials.email });

        // Only allow admin users with passwords
        if (!user || !user.password || user.role !== "admin") {
          throw new Error("Invalid credentials");
        }

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordCorrect) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
          image: user.profilePhoto,
          emailVerified: user.emailVerified,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // If signing in with Google
      if (account?.provider === "google") {
        await connectDB();

        // Check if user exists
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          // Create new user with Google data
          const newUser = new User({
            name: user.name,
            email: user.email,
            profilePhoto: user.image,
            role: "user",
            emailVerified: new Date(),
            source: "online",
            preferredContactMethod: "email",
            emailNotifications: true,
          });
          await newUser.save();
        } else if (!existingUser.emailVerified) {
          // Auto-verify email if signing in with Google
          existingUser.emailVerified = new Date();
          await existingUser.save();
        }
      }

      return true;
    },
    async jwt({ token, user, trigger, session }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.role = user.role || "user";
        token.emailVerified = (user as any).emailVerified || null;
      }

      // Update token when session is updated
      if (trigger === "update" && session) {
        token.name = session.name;
        token.email = session.email;
      }

      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "user" | "admin";
        session.user.emailVerified = token.emailVerified as Date | null;
      }

      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
    newUser: "/dashboard", // Redirect new users here
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};
