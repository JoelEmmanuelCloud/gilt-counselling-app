'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useAuth } from '@/lib/AuthContext';
import Button from '@/components/ui/Button';

interface AuthModalProps {
  onClose?: () => void;
  redirectTo?: string;
}

type Step = 'email' | 'otp';

export default function AuthModal({ onClose, redirectTo }: AuthModalProps) {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendCountdown, setResendCountdown] = useState(0);
  const [remainingAttempts, setRemainingAttempts] = useState(3);

  const { sendOTP, verifyOTP, resendOTP } = useAuth();

  // Resend countdown timer
  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => {
        setResendCountdown(resendCountdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCountdown]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await sendOTP(email);
      setStep('otp');
      setResendCountdown(30); // 30 second cooldown
    } catch (err: any) {
      setError(err.message || 'Failed to send verification code');
    } finally {
      setLoading(false);
    }
  };

  const handleOTPVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await verifyOTP(email, otp);
      // User is now logged in, redirect to dashboard or specified page
      window.location.href = redirectTo || '/dashboard';
    } catch (err: any) {
      setError(err.message || 'Invalid verification code');
      if (remainingAttempts > 1) {
        setRemainingAttempts(remainingAttempts - 1);
      } else {
        setError('Too many failed attempts. Please request a new code.');
        setRemainingAttempts(3);
        setOtp('');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendCountdown > 0) return;

    setError('');
    setLoading(true);

    try {
      await resendOTP(email);
      setResendCountdown(30);
      setRemainingAttempts(3);
      setOtp('');
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to resend code');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    try {
      await signIn('google', {
        callbackUrl: redirectTo || '/book-appointment',
      });
    } catch (err) {
      setError('Failed to sign in with Google. Please try again.');
      setLoading(false);
    }
  };

  const handleBack = () => {
    setStep('email');
    setOtp('');
    setError('');
    setRemainingAttempts(3);
  };

  const handleOTPChange = (value: string) => {
    // Only allow digits and max 6 characters
    const cleaned = value.replace(/\D/g, '').slice(0, 6);
    setOtp(cleaned);
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-md w-full p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="relative w-32 h-20 mx-auto mb-4">
            <Image
              src="/Gilt Counselling Consult Profile.svg"
              alt="Gilt Counselling Consult"
              fill
              className="object-contain"
            />
          </div>
          <h2 className="text-2xl font-heading font-bold text-gray-900 mb-2">
            {step === 'email' ? 'Sign in to continue' : 'Enter verification code'}
          </h2>
          <p className="text-gray-600 text-sm">
            {step === 'email'
              ? 'Sign in to book your appointment with Gilt Counselling'
              : `We've sent a code to ${email}`
            }
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
            {remainingAttempts < 3 && remainingAttempts > 0 && step === 'otp' && (
              <div className="text-xs mt-1">
                {remainingAttempts} attempt{remainingAttempts !== 1 ? 's' : ''} remaining
              </div>
            )}
          </div>
        )}

        {/* Email Entry Step */}
        {step === 'email' && (
          <div className="space-y-4">
            {/* Google Sign In */}
            <button
              onClick={handleGoogleAuth}
              disabled={loading}
              className="w-full bg-white border-2 border-gray-300 text-gray-700 px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-3 transition-opacity disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or</span>
              </div>
            </div>

            {/* Email Form */}
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-soft-terracotta focus:border-transparent"
                  placeholder="your.email@example.com"
                  disabled={loading}
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full"
              >
                {loading ? 'Sending code...' : 'Continue with Email'}
              </Button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-6">
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        )}

        {/* OTP Verification Step */}
        {step === 'otp' && (
          <form onSubmit={handleOTPVerify} className="space-y-6">
            <div className="text-center mb-6">
              <p className="text-sm font-semibold text-gray-800">
                {email}
                <button
                  type="button"
                  onClick={handleBack}
                  className="ml-2 text-soft-terracotta hover:text-soft-terracotta/80 text-xs"
                >
                  Edit
                </button>
              </p>
            </div>

            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                Verification Code
              </label>
              <input
                type="text"
                id="otp"
                inputMode="numeric"
                pattern="\d{6}"
                required
                value={otp}
                onChange={(e) => handleOTPChange(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-soft-terracotta focus:border-transparent text-center text-2xl tracking-widest font-mono"
                placeholder="000000"
                maxLength={6}
                disabled={loading}
                autoFocus
              />
              <p className="text-xs text-gray-500 mt-2 text-center">
                Enter the 6-digit code from your email
              </p>
            </div>

            <Button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="w-full"
            >
              {loading ? 'Verifying...' : 'Verify Code'}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={loading || resendCountdown > 0}
                className="text-sm text-soft-terracotta hover:text-soft-terracotta/80 font-medium disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                {resendCountdown > 0
                  ? `Resend code in ${resendCountdown}s`
                  : 'Resend verification code'}
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={handleBack}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                ← Back to email
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
