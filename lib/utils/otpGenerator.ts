import crypto from 'crypto';

/**
 * Generate a cryptographically secure 6-digit OTP
 * Uses crypto.randomInt for true randomness (not Math.random)
 * @returns 6-digit OTP as a string (e.g., "123456")
 */
export function generateOTP(): string {
  // Generate a random integer between 100000 and 999999 (inclusive)
  // This ensures exactly 6 digits
  const otp = crypto.randomInt(100000, 1000000);
  return otp.toString();
}

/**
 * Validate OTP format
 * @param otp - The OTP code to validate
 * @returns true if OTP is exactly 6 digits, false otherwise
 */
export function isValidOTPFormat(otp: string): boolean {
  return /^\d{6}$/.test(otp);
}
