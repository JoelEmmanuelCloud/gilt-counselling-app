import type { NextAuthOptions } from 'next-auth';
import Google from 'next-auth/providers/google';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from './mongodb-client';

// NOTE: Email/OTP authentication is handled by custom API endpoints:
// - POST /api/auth/send-otp - Send 6-digit verification code
// - POST /api/auth/verify-otp - Verify code and authenticate user
// - POST /api/auth/resend-otp - Resend verification code

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
        token.firstName = session.firstName;
        token.lastName = session.lastName;
        token.phone = session.phone;
      }

      return token;
    },

    async session({ session, token }) {
      // Add custom fields to session from JWT token
      if (token && session.user) {
        session.user.id = token.userId as string;
        session.user.role = token.role as 'user' | 'admin' | 'counselor';
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
