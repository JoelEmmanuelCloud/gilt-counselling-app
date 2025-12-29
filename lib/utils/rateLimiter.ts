import { checkAndUpdateRateLimit, getRateLimitStatus, resetRateLimit } from '../models/otpRateLimit';

/**
 * Check if an email has exceeded the OTP request rate limit
 * @param email - User's email address
 * @returns Object indicating if request is allowed and remaining time if rate limited
 */
export async function checkOTPRateLimit(email: string): Promise<{
  allowed: boolean;
  remainingTime?: number;
  message?: string;
}> {
  const result = await checkAndUpdateRateLimit(email, 3, 1); // 3 requests per 1 hour

  if (!result.allowed) {
    return {
      allowed: false,
      remainingTime: result.remainingTime,
      message: `Too many OTP requests. Please try again in ${result.remainingTime} minute${
        result.remainingTime !== 1 ? 's' : ''
      }.`,
    };
  }

  return {
    allowed: true,
  };
}

/**
 * Get the current rate limit status for an email
 * @param email - User's email address
 */
export async function getOTPRateLimitStatus(email: string) {
  return await getRateLimitStatus(email);
}

/**
 * Reset rate limit for an email (admin function)
 * @param email - User's email address
 */
export async function resetOTPRateLimit(email: string) {
  return await resetRateLimit(email);
}
