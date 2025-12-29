import mongoose from 'mongoose';
import OTP from '../lib/models/otp';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/gilt-counselling';

async function checkOTP() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB connected');

    // Find the most recent OTP for user@example.com
    const otp = await OTP.findOne({ email: 'user@example.com' })
      .sort({ createdAt: -1 })
      .exec();

    if (otp) {
      console.log('\n📧 Latest OTP for user@example.com:');
      console.log('Code:', otp.code);
      console.log('Created:', otp.createdAt);
      console.log('Expires:', otp.expiresAt);
      console.log('Used:', otp.used);
      console.log('Attempts:', otp.attempts);

      // Check if expired
      const now = new Date();
      const isExpired = now > otp.expiresAt;
      console.log('Is Expired:', isExpired);

      if (!isExpired && !otp.used) {
        console.log('\n✅ OTP is valid and can be used for testing');
      } else {
        console.log('\n❌ OTP is either expired or already used');
      }
    } else {
      console.log('\n❌ No OTP found for user@example.com');
    }

    await mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkOTP();
