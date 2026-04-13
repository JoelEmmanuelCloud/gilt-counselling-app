import { getServerSession } from 'next-auth';
import { headers } from 'next/headers';
import { authConfig } from './auth.config';
import * as jwt from 'jsonwebtoken';
import connectDB from './mongodb';
import User from './models/user';

export async function getSession() {
  return await getServerSession(authConfig);
}

export async function getCurrentUser() {
  const session = await getSession();
  return session?.user || null;
}

async function verifyTokenAndGetUser(token: string) {
  try {
    const secret = process.env.JWT_SECRET || 'your-secret-key';
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

export async function requireAuth(request?: { headers: { get: (name: string) => string | null } }) {
  const session = await getSession();

  if (session?.user) {
    return {
      user: session.user,
      error: null,
      status: 200,
    };
  }
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

export function generateToken(userId: string, email: string): string {
  const secret = process.env.JWT_SECRET || 'your-secret-key';
  return jwt.sign(
    { id: userId, email },
    secret,
    { expiresIn: '7d' }
  );
}
