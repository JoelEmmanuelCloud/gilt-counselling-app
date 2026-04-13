import crypto from 'crypto';

export function generateOTP(): string {
  const otp = crypto.randomInt(100000, 1000000);
  return otp.toString();
}

export function isValidOTPFormat(otp: string): boolean {
  return /^\d{6}$/.test(otp);
}
