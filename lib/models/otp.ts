import mongoose, { Schema, Model } from 'mongoose';

export interface IOTP {
  _id?: string;
  email: string;
  code: string;
  expiresAt: Date;
  used: boolean;
  attempts: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const OTPSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v: string) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: 'Please provide a valid email',
      },
    },
    code: {
      type: String,
      required: [true, 'OTP code is required'],
      validate: {
        validator: function (v: string) {
          return /^\d{6}$/.test(v);
        },
        message: 'OTP code must be exactly 6 digits',
      },
    },
    expiresAt: {
      type: Date,
      required: [true, 'Expiration date is required'],
      index: { expires: 0 }, // TTL index - automatically delete documents when expiresAt is reached
    },
    used: {
      type: Boolean,
      default: false,
    },
    attempts: {
      type: Number,
      default: 0,
      min: 0,
      max: 3,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for efficient lookups
OTPSchema.index({ email: 1, createdAt: -1 });

// Index for code lookups
OTPSchema.index({ code: 1 });

// Prevent model recompilation in development
const OTP: Model<IOTP> = mongoose.models.OTP || mongoose.model<IOTP>('OTP', OTPSchema);

export default OTP;

// Helper functions

/**
 * Create a new OTP record
 * @param email - User's email address
 * @param code - 6-digit OTP code
 * @param expiryMinutes - Minutes until OTP expires (default: 10)
 */
export const createOTP = async (email: string, code: string, expiryMinutes: number = 10) => {
  const expiresAt = new Date(Date.now() + expiryMinutes * 60 * 1000);

  const otp = new OTP({
    email: email.toLowerCase(),
    code,
    expiresAt,
    used: false,
    attempts: 0,
  });

  return await otp.save();
};

/**
 * Find the most recent valid OTP for an email
 * @param email - User's email address
 */
export const findValidOTP = async (email: string) => {
  return await OTP.findOne({
    email: email.toLowerCase(),
    used: false,
    expiresAt: { $gt: new Date() },
  }).sort({ createdAt: -1 });
};

/**
 * Find OTP by email and code
 * @param email - User's email address
 * @param code - 6-digit OTP code
 */
export const findOTPByCode = async (email: string, code: string) => {
  return await OTP.findOne({
    email: email.toLowerCase(),
    code,
    used: false,
    expiresAt: { $gt: new Date() },
  });
};

/**
 * Mark OTP as used
 * @param otpId - OTP document ID
 */
export const markOTPAsUsed = async (otpId: string) => {
  return await OTP.findByIdAndUpdate(
    otpId,
    { used: true },
    { new: true }
  );
};

/**
 * Increment attempt count
 * @param otpId - OTP document ID
 */
export const incrementAttempts = async (otpId: string) => {
  return await OTP.findByIdAndUpdate(
    otpId,
    { $inc: { attempts: 1 } },
    { new: true }
  );
};

/**
 * Invalidate all unused OTPs for an email
 * @param email - User's email address
 */
export const invalidateOTPsForEmail = async (email: string) => {
  return await OTP.updateMany(
    {
      email: email.toLowerCase(),
      used: false,
      expiresAt: { $gt: new Date() },
    },
    { used: true }
  );
};
