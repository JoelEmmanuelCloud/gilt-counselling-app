import { getServerSession } from 'next-auth';
import { headers } from 'next/headers';
import { authConfig } from './auth.config';
import * as jwt from 'jsonwebtoken';
import connectDB from './mongodb';
import User from './models/user';

/**
 * Get the current session (server-side only)
 * @returns The current session or null
 */
export async function getSession() {
  return await getServerSession(authConfig);
}

/**
 * Get the current user from session (server-side only)
 * @returns The current user or null
 */
export async function getCurrentUser() {
  const session = await getSession();
  return session?.user || null;
}

/**
 * Verify JWT token and get user from database
 * @param token - JWT token string
 * @returns User object or null
 */
async function verifyTokenAndGetUser(token: string) {
  try {
    const secret = process.env.JWT_SECRET || 'your-secret-key';
    // Token payload uses 'userId' (from verify-otp) or 'id' (from generateToken)
    const decoded = jwt.verify(token, secret) as { userId?: string; id?: string; email: string };
    const userId = decoded.userId || decoded.id;

    if (!userId) {
      return null;
    }

    await connectDB();
    const user = await User.findById(userId).select('-sessionNotes');

    if (!user) {
      return null;
    }

    return {
      id: user._id.toString(),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      phone: user.phone,
      image: user.profilePhoto || user.image,
    };
  } catch (error) {
    return null;
  }
}

/**
 * Require authentication for API routes
 * Returns user if authenticated, error otherwise
 * Supports both NextAuth sessions (Google) and JWT Bearer tokens (OTP)
 *
 * @param request - Optional NextRequest object to get headers from directly
 *
 * @example
 * const authResult = await requireAuth(request);
 * if (authResult.error) {
 *   return NextResponse.json({ message: authResult.error }, { status: authResult.status });
 * }
 * const user = authResult.user;
 */
export async function requireAuth(request?: { headers: { get: (name: string) => string | null } }) {
  // First, try NextAuth session (Google auth)
  const session = await getSession();

  if (session?.user) {
    return {
      user: session.user,
      error: null,
      status: 200,
    };
  }

  // If no NextAuth session, check for Bearer token (OTP auth)
  // Try to get authorization from request headers first, then fall back to headers()
  let authorization: string | null = null;

  if (request?.headers) {
    authorization = request.headers.get('authorization');
  }

  if (!authorization) {
    const headersList = await headers();
    authorization = headersList.get('authorization');
  }

  if (authorization?.startsWith('Bearer ')) {
    const token = authorization.substring(7);
    const user = await verifyTokenAndGetUser(token);

    if (user) {
      return {
        user,
        error: null,
        status: 200,
      };
    }
  }

  return {
    error: 'Not authenticated',
    status: 401,
    user: null,
  };
}

/**
 * Require admin role for API routes
 * Returns user if authenticated and admin, error otherwise
 * Supports both NextAuth sessions (Google) and JWT Bearer tokens (OTP)
 *
 * @param request - Optional NextRequest object to get headers from directly
 *
 * @example
 * const authResult = await requireAdmin(request);
 * if (authResult.error) {
 *   return NextResponse.json({ message: authResult.error }, { status: authResult.status });
 * }
 * const adminUser = authResult.user;
 */
export async function requireAdmin(request?: { headers: { get: (name: string) => string | null } }) {
  const authResult = await requireAuth(request);

  if (authResult.error) {
    return authResult;
  }

  if (authResult.user?.role !== 'admin') {
    return {
      error: 'Admin access required',
      status: 403,
      user: null,
    };
  }

  return authResult;
}

/**
 * Require counselor role for API routes
 * Returns user if authenticated and counselor, error otherwise
 * Supports both NextAuth sessions (Google) and JWT Bearer tokens (OTP)
 *
 * @param request - Optional NextRequest object to get headers from directly
 */
export async function requireCounselor(request?: { headers: { get: (name: string) => string | null } }) {
  const authResult = await requireAuth(request);

  if (authResult.error) {
    return authResult;
  }

  if (authResult.user?.role !== 'counselor') {
    return {
      error: 'Counselor access required',
      status: 403,
      user: null,
    };
  }

  return authResult;
}

/**
 * Require admin or counselor role for API routes
 * Returns user if authenticated and admin or counselor, error otherwise
 * Supports both NextAuth sessions (Google) and JWT Bearer tokens (OTP)
 *
 * @param request - Optional NextRequest object to get headers from directly
 */
export async function requireAdminOrCounselor(request?: { headers: { get: (name: string) => string | null } }) {
  const authResult = await requireAuth(request);

  if (authResult.error) {
    return authResult;
  }

  if (authResult.user?.role !== 'admin' && authResult.user?.role !== 'counselor') {
    return {
      error: 'Admin or counselor access required',
      status: 403,
      user: null,
    };
  }

  return authResult;
}

/**
 * Generate JWT token for user authentication
 * @param userId - User ID
 * @param email - User email
 * @returns JWT token string
 */
export function generateToken(userId: string, email: string): string {
  const secret = process.env.JWT_SECRET || 'your-secret-key';
  return jwt.sign(
    { id: userId, email },
    secret,
    { expiresIn: '7d' }
  );
}
