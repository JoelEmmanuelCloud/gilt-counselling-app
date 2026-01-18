import mongoose from 'mongoose';
import User from '../lib/models/user';
import Appointment from '../lib/models/appointment';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/gilt-counselling';

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected successfully!');

    // Clear existing data
    console.log('Clearing existing users and appointments...');
    await User.deleteMany({});
    await Appointment.deleteMany({});
    console.log('Data cleared!');

    // Create Admin User
    console.log('Creating admin user...');
    const adminUser = new User({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@gilt.com',
      phone: '+234 803 309 4050',
      role: 'admin',
      emailVerified: new Date(),
    });
    await adminUser.save();
    console.log('Admin user created: admin@gilt.com (use OTP to sign in)');

    // Create Regular User
    console.log('Creating regular user...');
    const regularUser = new User({
      firstName: 'John',
      lastName: 'Doe',
      email: 'user@example.com',
      phone: '+234 706 573 4165',
      role: 'user',
      emailVerified: new Date(),
    });
    await regularUser.save();
    console.log('Regular user created: user@example.com (use OTP to sign in)');

    // Create another regular user
    const regularUser2 = new User({
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      phone: '+234 806 211 5372',
      role: 'user',
      emailVerified: new Date(),
    });
    await regularUser2.save();
    console.log('Another user created: jane@example.com (use OTP to sign in)');

    // Create sample appointments
    console.log('Creating sample appointments...');

    const appointment1 = new Appointment({
      userId: regularUser._id,
      userName: `${regularUser.firstName} ${regularUser.lastName}`,
      userEmail: regularUser.email,
      userPhone: regularUser.phone,
      service: 'Individual Counseling',
      date: '2025-12-30',
      time: '10:00 AM',
      status: 'pending',
      notes: 'First session - anxiety management',
    });
    await appointment1.save();

    const appointment2 = new Appointment({
      userId: regularUser._id,
      userName: `${regularUser.firstName} ${regularUser.lastName}`,
      userEmail: regularUser.email,
      userPhone: regularUser.phone,
      service: 'Career Counseling',
      date: '2026-01-05',
      time: '2:00 PM',
      status: 'confirmed',
      notes: 'Career transition support',
    });
    await appointment2.save();

    const appointment3 = new Appointment({
      userId: regularUser2._id,
      userName: `${regularUser2.firstName} ${regularUser2.lastName}`,
      userEmail: regularUser2.email,
      userPhone: regularUser2.phone,
      service: 'Family Counseling',
      date: '2025-12-28',
      time: '3:00 PM',
      status: 'confirmed',
      notes: 'Family communication workshop',
    });
    await appointment3.save();

    const appointment4 = new Appointment({
      userId: regularUser2._id,
      userName: `${regularUser2.firstName} ${regularUser2.lastName}`,
      userEmail: regularUser2.email,
      userPhone: regularUser2.phone,
      service: 'Youth Counseling',
      date: '2025-12-20',
      time: '11:00 AM',
      status: 'completed',
      notes: 'Teen mentoring session',
    });
    await appointment4.save();

    console.log('Sample appointments created!');

    console.log('\n=== Seed Complete ===');
    console.log('All users use passwordless OTP authentication.');
    console.log('Admin: admin@gilt.com');
    console.log('User: user@example.com');
    console.log('User: jane@example.com');
    console.log('=====================\n');

    await mongoose.connection.close();
    console.log('Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
