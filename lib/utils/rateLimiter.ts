import { checkAndUpdateRateLimit, getRateLimitStatus, resetRateLimit } from '../models/otpRateLimit';

export async function checkOTPRateLimit(email: string): Promise<{
  allowed: boolean;
  remainingTime?: number;
  message?: string;
}> {
  const result = await checkAndUpdateRateLimit(email, 3, 1);

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

export async function getOTPRateLimitStatus(email: string) {
  return await getRateLimitStatus(email);
}

export async function resetOTPRateLimit(email: string) {
  return await resetRateLimit(email);
}
