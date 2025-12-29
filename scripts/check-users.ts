import mongoose from 'mongoose';
import User from '../lib/models/user';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/gilt-counselling';

async function checkUsers() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB connected');

    // Find all users
    const users = await User.find({}).select('name email role').limit(10).exec();

    if (users.length > 0) {
      console.log(`\n📋 Found ${users.length} users:\n`);
      users.forEach((user, index) => {
        console.log(`${index + 1}. ${user.name} <${user.email}> [${user.role}]`);
      });
    } else {
      console.log('\n❌ No users found in database');
    }

    await mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkUsers();
