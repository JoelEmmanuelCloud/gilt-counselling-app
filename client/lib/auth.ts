import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import { findUserById, User } from './models/user';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export interface AuthUser extends Omit<User, 'password'> {}

export const verifyToken = (token: string): { userId: string } | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    return decoded;
  } catch (error) {
    return null;
  }
};

export const getUserFromRequest = (request: NextRequest): AuthUser | null => {
  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.replace('Bearer ', '');
  const decoded = verifyToken(token);

  if (!decoded) {
    return null;
  }

  const user = findUserById(decoded.userId);

  if (!user) {
    return null;
  }

  // Remove password from user object
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
};

export { JWT_SECRET };
