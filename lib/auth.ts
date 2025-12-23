import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import { findUserById } from './models/user';
import connectDB from './mongodb';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export const verifyToken = (token: string): { userId: string } | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    return decoded;
  } catch (error) {
    return null;
  }
};

export const getUserFromRequest = async (request: NextRequest) => {
  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.replace('Bearer ', '');
  const decoded = verifyToken(token);

  if (!decoded) {
    return null;
  }

  // Connect to database
  await connectDB();

  const user = await findUserById(decoded.userId);

  if (!user) {
    return null;
  }

  // Convert to plain object and remove password
  const userObj = user.toObject();
  const { password, ...userWithoutPassword } = userObj;

  // Add id field for compatibility
  return {
    ...userWithoutPassword,
    id: userObj._id.toString(),
  };
};

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
};

export { JWT_SECRET };
