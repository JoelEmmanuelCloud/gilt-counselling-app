import { getServerSession } from 'next-auth';
import { authConfig } from './auth.config';
import jwt from 'jsonwebtoken';

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
 * Require authentication for API routes
 * Returns user if authenticated, error otherwise
 *
 * @example
 * const authResult = await requireAuth();
 * if (authResult.error) {
 *   return NextResponse.json({ message: authResult.error }, { status: authResult.status });
 * }
 * const user = authResult.user;
 */
export async function requireAuth() {
  const session = await getSession();

  if (!session || !session.user) {
    return {
      error: 'Not authenticated',
      status: 401,
      user: null,
    };
  }

  return {
    user: session.user,
    error: null,
    status: 200,
  };
}

/**
 * Require admin role for API routes
 * Returns user if authenticated and admin, error otherwise
 *
 * @example
 * const authResult = await requireAdmin();
 * if (authResult.error) {
 *   return NextResponse.json({ message: authResult.error }, { status: authResult.status });
 * }
 * const adminUser = authResult.user;
 */
export async function requireAdmin() {
  const session = await getSession();

  if (!session || !session.user) {
    return {
      error: 'Not authenticated',
      status: 401,
      user: null,
    };
  }

  if (session.user.role !== 'admin') {
    return {
      error: 'Admin access required',
      status: 403,
      user: null,
    };
  }

  return {
    user: session.user,
    error: null,
    status: 200,
  };
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
