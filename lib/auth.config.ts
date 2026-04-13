import type { NextAuthOptions } from 'next-auth';
import Google from 'next-auth/providers/google';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from './mongodb-client';

export const authConfig: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),

  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
  ],

  pages: {
    signIn: '/book-appointment',
    verifyRequest: '/auth/verify-request',
    error: '/auth/error',
  },

  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60,
  },

  callbacks: {
    async signIn({ user, account, profile }) {
      return true;
    },

    async jwt({ token, user, account, trigger, session }) {
      if (user) {
        token.userId = user.id;
        token.role = (user as any).role || 'user';
        token.phone = (user as any).phone;
      }
      if (trigger === 'update' && session) {
        token.firstName = session.firstName;
        token.lastName = session.lastName;
        token.phone = session.phone;
      }

      return token;
    },

    async session({ session, token }) {
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
