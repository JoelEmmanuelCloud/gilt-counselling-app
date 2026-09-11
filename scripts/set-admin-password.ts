import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { config } from 'dotenv';
import path from 'path';
import dns from 'dns';

config({ path: path.resolve(process.cwd(), '.env.local') });

dns.setServers(['8.8.8.8', '1.1.1.1']);

import User from '../lib/models/user';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in .env.local');
}

const email = process.argv[2];
const password = process.argv[3];

if (!email || !password) {
  console.error('Usage: npm run set-admin-password -- <email> <password>');
  process.exit(1);
}

if (password.length < 10) {
  console.error('Password must be at least 10 characters long.');
  process.exit(1);
}

async function run() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI);
  console.log('Connected successfully!');

  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user) {
    console.error(`No user found with email ${email}`);
    await mongoose.disconnect();
    process.exit(1);
  }

  if (user.role !== 'admin') {
    console.error(`User ${email} does not have the admin role (role: ${user.role}).`);
    await mongoose.disconnect();
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await User.findByIdAndUpdate(user._id, {
    password: passwordHash,
    failedLoginAttempts: 0,
    lockUntil: null,
  });

  console.log(`Password set for ${email}.`);

  await mongoose.disconnect();
}

run().catch((error) => {
  console.error('Failed to set admin password:', error);
  process.exit(1);
});
