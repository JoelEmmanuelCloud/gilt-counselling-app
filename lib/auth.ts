import { headers } from 'next/headers';
import * as jwt from 'jsonwebtoken';
import connectDB from './mongodb';
import User from './models/user';

export function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is not set');
  }
  return secret;
}

export async function getUserFromToken(token: string) {
  let decoded: { userId?: string };
  try {
    decoded = jwt.verify(token, getJwtSecret()) as { userId?: string };
  } catch {
    return null;
  }

  if (!decoded.userId) {
    return null;
  }

  await connectDB();
  const user = await User.findById(decoded.userId);

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
}

export async function requireAdmin() {
  const headersList = await headers();
  const authorization = headersList.get('authorization');

  if (!authorization?.startsWith('Bearer ')) {
    return { error: 'Not authenticated', status: 401, user: null };
  }

  const user = await getUserFromToken(authorization.substring(7));

  if (!user) {
    return { error: 'Not authenticated', status: 401, user: null };
  }

  if (user.role !== 'admin') {
    return { error: 'Admin access required', status: 403, user: null };
  }

  return { error: null, status: 200, user };
}
