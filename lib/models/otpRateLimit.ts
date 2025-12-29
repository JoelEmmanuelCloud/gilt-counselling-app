import mongoose, { Schema, Model } from 'mongoose';

export interface IOTPRateLimit {
  _id?: string;
  email: string;
  requestCount: number;
  windowStart: Date;
  expiresAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const OTPRateLimitSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v: string) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: 'Please provide a valid email',
      },
    },
    requestCount: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    windowStart: {
      type: Date,
      required: true,
      default: Date.now,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 }, // TTL index - automatically delete after 1 hour
    },
  },
  {
    timestamps: true,
  }
);

// Index on email for fast lookups
OTPRateLimitSchema.index({ email: 1 });

// Prevent model recompilation in development
const OTPRateLimit: Model<IOTPRateLimit> =
  mongoose.models.OTPRateLimit || mongoose.model<IOTPRateLimit>('OTPRateLimit', OTPRateLimitSchema);

export default OTPRateLimit;

// Helper functions

/**
 * Create or update rate limit record for an email
 * @param email - User's email address
 * @param maxRequests - Maximum requests allowed per window (default: 3)
 * @param windowHours - Hours in the rolling window (default: 1)
 * @returns Object indicating if request is allowed and remaining time if rate limited
 */
export const checkAndUpdateRateLimit = async (
  email: string,
  maxRequests: number = 3,
  windowHours: number = 1
): Promise<{ allowed: boolean; remainingTime?: number }> => {
  const now = new Date();
  const oneHourAgo = new Date(now.getTime() - windowHours * 60 * 60 * 1000);

  // Find existing rate limit record
  const rateLimit = await OTPRateLimit.findOne({ email: email.toLowerCase() });

  if (!rateLimit) {
    // No record exists, create new one
    const expiresAt = new Date(now.getTime() + windowHours * 60 * 60 * 1000);
    await OTPRateLimit.create({
      email: email.toLowerCase(),
      requestCount: 1,
      windowStart: now,
      expiresAt,
    });
    return { allowed: true };
  }

  // Check if window has expired (older than 1 hour)
  if (rateLimit.windowStart < oneHourAgo) {
    // Reset the window
    const expiresAt = new Date(now.getTime() + windowHours * 60 * 60 * 1000);
    await OTPRateLimit.findByIdAndUpdate(rateLimit._id, {
      requestCount: 1,
      windowStart: now,
      expiresAt,
    });
    return { allowed: true };
  }

  // Window is still valid, check if limit exceeded
  if (rateLimit.requestCount >= maxRequests) {
    // Calculate remaining time in minutes
    const windowEnd = new Date(rateLimit.windowStart.getTime() + windowHours * 60 * 60 * 1000);
    const remainingMs = windowEnd.getTime() - now.getTime();
    const remainingMinutes = Math.ceil(remainingMs / (60 * 1000));

    return {
      allowed: false,
      remainingTime: remainingMinutes,
    };
  }

  // Increment request count
  await OTPRateLimit.findByIdAndUpdate(rateLimit._id, {
    $inc: { requestCount: 1 },
  });

  return { allowed: true };
};

/**
 * Get current rate limit status for an email
 * @param email - User's email address
 */
export const getRateLimitStatus = async (email: string) => {
  const rateLimit = await OTPRateLimit.findOne({ email: email.toLowerCase() });

  if (!rateLimit) {
    return {
      requests: 0,
      windowStart: null,
      isLimited: false,
    };
  }

  const now = new Date();
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

  // Check if window has expired
  if (rateLimit.windowStart < oneHourAgo) {
    return {
      requests: 0,
      windowStart: null,
      isLimited: false,
    };
  }

  return {
    requests: rateLimit.requestCount,
    windowStart: rateLimit.windowStart,
    isLimited: rateLimit.requestCount >= 3,
  };
};

/**
 * Reset rate limit for an email (admin function)
 * @param email - User's email address
 */
export const resetRateLimit = async (email: string) => {
  return await OTPRateLimit.deleteOne({ email: email.toLowerCase() });
};
