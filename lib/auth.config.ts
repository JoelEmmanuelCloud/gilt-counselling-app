import type { NextAuthOptions } from 'next-auth';
import Google from 'next-auth/providers/google';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from './mongodb-client';

// NOTE: Email/OTP authentication is handled by custom API endpoints:
// - POST /api/auth/send-otp - Send 6-digit verification code
// - POST /api/auth/verify-otp - Verify code and authenticate user
// - POST /api/auth/resend-otp - Resend verification code
// This provides better UX than magic links (no email click required)

// Legacy: Custom NextAuth magic link email template (no longer used)
// Kept for reference - replaced by OTP authentication
function generateNextAuthMagicLinkEmail(url: string, email: string) {
  const displayName = email.split('@')[0];
  const APP_URL = process.env.NEXT_PUBLIC_APP_URL || '';

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sign in to Gilt Counselling Consult</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif; background-color: #F5F1E8;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F5F1E8; padding: 40px 0;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #D9A85D 0%, #F5A623 100%); padding: 40px 32px; text-align: center;">
                    <img src="${APP_URL}/Gilt Counselling Consult.jpg" alt="Gilt Counselling Consult" style="max-width: 200px; height: auto; margin: 0 auto 16px; display: block;" />
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                      Gilt Counselling Consult
                    </h1>
                    <p style="margin: 8px 0 0; color: #ffffff; font-size: 14px; opacity: 0.9;">
                      Empowering teens & youths for optimal development
                    </p>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 40px 32px;">
                    <h2 style="margin: 0 0 16px; color: #1a1a1a; font-size: 24px; font-weight: 600;">
                      Welcome back, ${displayName}!
                    </h2>
                    <p style="margin: 0 0 24px; color: #4a4a4a; font-size: 16px; line-height: 1.6;">
                      Click the button below to sign in to your Gilt Counselling account. This link will expire in 24 hours for your security.
                    </p>

                    <!-- Button -->
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" style="padding: 12px 0;">
                          <a href="${url}"
                             style="display: inline-block; background: linear-gradient(135deg, #D9A85D 0%, #F5A623 100%); color: #ffffff; text-decoration: none; padding: 16px 48px; border-radius: 8px; font-size: 16px; font-weight: 600; box-shadow: 0 2px 4px rgba(217, 168, 93, 0.3);">
                            Sign In to Your Account
                          </a>
                        </td>
                      </tr>
                    </table>

                    <p style="margin: 24px 0 0; color: #6a6a6a; font-size: 14px; line-height: 1.6;">
                      Or copy and paste this URL into your browser:
                    </p>
                    <p style="margin: 8px 0; color: #D9A85D; font-size: 13px; word-break: break-all; background-color: #f9f9f9; padding: 12px; border-radius: 6px; border-left: 3px solid #D9A85D;">
                      ${url}
                    </p>

                    <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e5e5;">
                      <p style="margin: 0 0 8px; color: #6a6a6a; font-size: 13px;">
                        <strong>Didn't request this?</strong>
                      </p>
                      <p style="margin: 0; color: #8a8a8a; font-size: 13px; line-height: 1.5;">
                        If you didn't try to sign in, you can safely ignore this email. The link will expire automatically.
                      </p>
                    </div>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #F5F1E8; padding: 32px; text-align: center;">
                    <p style="margin: 0 0 12px; color: #4a4a4a; font-size: 13px; font-weight: 600;">
                      Contact Us
                    </p>
                    <p style="margin: 0 0 4px; color: #6a6a6a; font-size: 12px;">
                      📍 88 Woji Road, Port Harcourt, Nigeria
                    </p>
                    <p style="margin: 0 0 4px; color: #6a6a6a; font-size: 12px;">
                      📍 470 Front St W, Toronto, Canada
                    </p>
                    <p style="margin: 0 0 4px; color: #6a6a6a; font-size: 12px;">
                      📞 +234 803 309 4050
                    </p>
                    <p style="margin: 0 0 16px; color: #6a6a6a; font-size: 12px;">
                      ✉️ hello@giltcounselling.com
                    </p>
                    <p style="margin: 16px 0 0; color: #8a8a8a; font-size: 11px;">
                      © ${new Date().getFullYear()} Gilt Counselling Consult. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  const text = `
Welcome back, ${displayName}!

Click this link to sign in to your Gilt Counselling account:
${url}

This link will expire in 24 hours for your security.

If you didn't try to sign in, you can safely ignore this email.

---
Gilt Counselling Consult
Empowering teens & youths for optimal development

Nigeria Office: 88 Woji Road, Port Harcourt
Canada Office: 470 Front St W, Toronto
Phone: +234 803 309 4050
Email: hello@giltcounselling.com
  `;

  return { html, text };
}

export const authConfig: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),

  providers: [
    // Google OAuth Provider
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true, // Allow linking if email matches
    }),

    // Email/OTP authentication handled by custom endpoints (see note above)
    // No NextAuth Email provider needed - we use our own OTP system
  ],

  pages: {
    signIn: '/book-appointment',
    verifyRequest: '/auth/verify-request',
    error: '/auth/error',
  },

  session: {
    strategy: 'jwt', // Use JWT for sessions (stored in HTTP-only cookies)
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },

  callbacks: {
    async signIn({ user, account, profile }) {
      // Allow all sign-ins (admin-only checks are done elsewhere)
      return true;
    },

    async jwt({ token, user, account, trigger, session }) {
      // On initial sign-in, add user data to token
      if (user) {
        token.userId = user.id;
        token.role = (user as any).role || 'user';
        token.phone = (user as any).phone;
      }

      // Handle profile updates
      if (trigger === 'update' && session) {
        token.name = session.name;
        token.phone = session.phone;
      }

      return token;
    },

    async session({ session, token }) {
      // Add custom fields to session from JWT token
      if (token && session.user) {
        session.user.id = token.userId as string;
        session.user.role = token.role as 'user' | 'admin';
        session.user.phone = token.phone as string | undefined;
      }

      return session;
    },
  },

  events: {
    async createUser({ user }) {
      // Log new user creation
      console.log('New user created:', user.email);
    },

    async signIn({ user, account, isNewUser }) {
      console.log(`User ${user.email} signed in via ${account?.provider}`);
      if (isNewUser) {
        console.log('First-time sign-in for user:', user.email);
      }
    },
  },
};
