'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import Button from '@/components/ui/Button';

interface AuthModalProps {
  onClose?: () => void;
  redirectTo?: string;
  initialMode?: 'signin' | 'signup';
}

type Step = 'form' | 'otp';
type Mode = 'signin' | 'signup';

export default function AuthModal({ onClose, redirectTo, initialMode = 'signin' }: AuthModalProps) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>(initialMode);
  const [step, setStep] = useState<Step>('form');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [resendCountdown, setResendCountdown] = useState(0);
  const [remainingAttempts, setRemainingAttempts] = useState(3);
  const [mounted, setMounted] = useState(false);

  const { sendOTP, verifyOTP, resendOTP } = useAuth();

  // Mount check for portal (SSR compatibility)
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Resend countdown timer
  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => {
        setResendCountdown(resendCountdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCountdown]);

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create account');
      }

      // Signup now sends OTP, go directly to OTP verification step
      setSuccessMessage('Account created! Check your email for the verification code.');
      setResendCountdown(30);

      setTimeout(() => {
        setSuccessMessage('');
        setStep('otp');
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await sendOTP(email);
      setStep('otp');
      setResendCountdown(30);
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
      const userData = await verifyOTP(email, otp);
      if (onClose) onClose();

      // Redirect based on user role
      setTimeout(() => {
        if (userData?.role === 'admin') {
          router.push('/admin');
        } else if (userData?.role === 'counselor') {
          router.push('/counselor');
        } else if (redirectTo) {
          router.push(redirectTo);
        } else {
          router.push('/dashboard');
        }
      }, 100);
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


  const handleBack = () => {
    setStep('form');
    setOtp('');
    setError('');
    setRemainingAttempts(3);
  };

  const handleOTPChange = (value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 6);
    setOtp(cleaned);
  };

  const switchMode = (newMode: Mode) => {
    setMode(newMode);
    setStep('form');
    setError('');
    setSuccessMessage('');
    setOtp('');
  };

  // Don't render on server or before mount
  if (!mounted) return null;

  const modalContent = (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-2 sm:p-4 lg:p-6"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl max-w-md lg:max-w-lg w-full p-4 sm:p-6 md:p-8 lg:p-10 relative max-h-[95vh] sm:max-h-[90vh] lg:max-h-[85vh] overflow-y-auto shadow-xl lg:shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 lg:top-5 lg:right-5 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-10">
          <div className="relative w-24 h-16 sm:w-32 sm:h-20 lg:w-36 lg:h-24 mx-auto mb-3 sm:mb-4 lg:mb-5">
            <Image
              src="/Gilt Counselling Consult Profile.svg"
              alt="Gilt Counselling Consult"
              fill
              className="object-contain"
            />
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-heading font-bold text-gray-900 mb-1 sm:mb-2 lg:mb-3">
            {step === 'otp'
              ? 'Enter verification code'
              : mode === 'signin'
                ? 'Sign in to continue'
                : 'Create your account'
            }
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm lg:text-base px-2 lg:px-4">
            {step === 'otp'
              ? `We've sent a code to ${email}`
              : mode === 'signin'
                ? 'Sign in to book your appointment with Gilt Counselling'
                : 'Join Gilt Counselling to book your appointment'
            }
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-3 py-2 sm:px-4 sm:py-3 lg:px-5 lg:py-4 rounded-lg lg:rounded-xl mb-4 sm:mb-6 lg:mb-8 text-xs sm:text-sm lg:text-base">
            {error}
            {remainingAttempts < 3 && remainingAttempts > 0 && step === 'otp' && (
              <div className="text-xs lg:text-sm mt-1">
                {remainingAttempts} attempt{remainingAttempts !== 1 ? 's' : ''} remaining
              </div>
            )}
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-3 py-2 sm:px-4 sm:py-3 lg:px-5 lg:py-4 rounded-lg lg:rounded-xl mb-4 sm:mb-6 lg:mb-8 text-xs sm:text-sm lg:text-base">
            {successMessage}
          </div>
        )}

        {/* Sign In Form */}
        {mode === 'signin' && step === 'form' && (
          <div className="space-y-3 sm:space-y-4 lg:space-y-5">
            {/* Email Form */}
            <form onSubmit={handleEmailSubmit} className="space-y-3 sm:space-y-4 lg:space-y-5">
              <div>
                <label htmlFor="signin-email" className="block text-xs sm:text-sm lg:text-base font-medium text-gray-700 mb-1 sm:mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  id="signin-email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2.5 sm:px-4 sm:py-3 lg:px-5 lg:py-3.5 text-sm sm:text-base lg:text-lg border border-gray-300 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-soft-terracotta focus:border-transparent transition-all"
                  placeholder="your.email@example.com"
                  disabled={loading}
                />
              </div>

              <Button type="submit" disabled={loading} className="w-full text-sm sm:text-base lg:text-lg py-2.5 sm:py-3 lg:py-3.5">
                {loading ? 'Sending code...' : 'Continue with Email'}
              </Button>
            </form>

            <p className="text-[10px] sm:text-xs lg:text-sm text-gray-500 text-center mt-4 sm:mt-6 lg:mt-8">
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </p>

            {/* Sign Up Link */}
            <div className="text-center mt-3 sm:mt-4 lg:mt-5 pt-3 sm:pt-4 lg:pt-5 border-t border-gray-200">
              <p className="text-xs sm:text-sm lg:text-base text-gray-600">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => switchMode('signup')}
                  className="font-semibold text-soft-terracotta hover:text-soft-terracotta/80 transition-colors"
                >
                  Sign Up
                </button>
              </p>
            </div>
          </div>
        )}

        {/* Sign Up Form */}
        {mode === 'signup' && step === 'form' && (
          <div className="space-y-3 sm:space-y-4 lg:space-y-5">
            {/* Sign Up Form */}
            <form onSubmit={handleSignUpSubmit} className="space-y-3 sm:space-y-4 lg:space-y-5">
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-xs sm:text-sm lg:text-base font-medium text-gray-700 mb-1 lg:mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-3 py-2.5 sm:px-4 sm:py-3 lg:px-5 lg:py-3.5 text-sm sm:text-base lg:text-lg border border-gray-300 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-soft-terracotta focus:border-transparent transition-all"
                    placeholder="John"
                    disabled={loading}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-xs sm:text-sm lg:text-base font-medium text-gray-700 mb-1 lg:mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-3 py-2.5 sm:px-4 sm:py-3 lg:px-5 lg:py-3.5 text-sm sm:text-base lg:text-lg border border-gray-300 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-soft-terracotta focus:border-transparent transition-all"
                    placeholder="Doe"
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="signup-email" className="block text-xs sm:text-sm lg:text-base font-medium text-gray-700 mb-1 lg:mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="signup-email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2.5 sm:px-4 sm:py-3 lg:px-5 lg:py-3.5 text-sm sm:text-base lg:text-lg border border-gray-300 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-soft-terracotta focus:border-transparent transition-all"
                  placeholder="you@example.com"
                  disabled={loading}
                />
              </div>

              <Button type="submit" disabled={loading || !!successMessage} className="w-full text-sm sm:text-base lg:text-lg py-2.5 sm:py-3 lg:py-3.5">
                {loading ? 'Creating account...' : successMessage ? 'Success!' : 'Create Account'}
              </Button>
            </form>

            <p className="text-[10px] sm:text-xs lg:text-sm text-gray-500 text-center mt-3 sm:mt-4 lg:mt-6">
              By signing up, you agree to our Terms of Service and Privacy Policy.
            </p>

            {/* Sign In Link */}
            <div className="text-center mt-3 sm:mt-4 lg:mt-5 pt-3 sm:pt-4 lg:pt-5 border-t border-gray-200">
              <p className="text-xs sm:text-sm lg:text-base text-gray-600">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => switchMode('signin')}
                  className="font-semibold text-soft-terracotta hover:text-soft-terracotta/80 transition-colors"
                >
                  Sign In
                </button>
              </p>
            </div>
          </div>
        )}

        {/* OTP Verification Step */}
        {step === 'otp' && (
          <form onSubmit={handleOTPVerify} className="space-y-4 sm:space-y-6 lg:space-y-8">
            <div className="text-center mb-4 sm:mb-6 lg:mb-8">
              <p className="text-xs sm:text-sm lg:text-base font-semibold text-gray-800 break-all px-2 lg:px-4">
                {email}
                <button
                  type="button"
                  onClick={handleBack}
                  className="ml-2 text-soft-terracotta hover:text-soft-terracotta/80 text-xs lg:text-sm"
                >
                  Edit
                </button>
              </p>
            </div>

            <div>
              <label htmlFor="otp" className="block text-xs sm:text-sm lg:text-base font-medium text-gray-700 mb-1 sm:mb-2 lg:mb-3">
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
                className="w-full px-3 py-2.5 sm:px-4 sm:py-3 lg:px-6 lg:py-4 border border-gray-300 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-soft-terracotta focus:border-transparent text-center text-xl sm:text-2xl lg:text-3xl tracking-widest font-mono transition-all"
                placeholder="000000"
                maxLength={6}
                disabled={loading}
                autoFocus
              />
              <p className="text-[10px] sm:text-xs lg:text-sm text-gray-500 mt-1 sm:mt-2 lg:mt-3 text-center">
                Enter the 6-digit code from your email
              </p>
            </div>

            <Button type="submit" disabled={loading || otp.length !== 6} className="w-full text-sm sm:text-base lg:text-lg py-2.5 sm:py-3 lg:py-3.5">
              {loading ? 'Verifying...' : 'Verify Code'}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={loading || resendCountdown > 0}
                className="text-xs sm:text-sm lg:text-base text-soft-terracotta hover:text-soft-terracotta/80 font-medium disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
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
                className="text-xs sm:text-sm lg:text-base text-gray-600 hover:text-gray-800 transition-colors"
              >
                ← Back to {mode === 'signin' ? 'sign in' : 'sign up'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );

  // Use portal to render at document body level, escaping any stacking contexts
  return createPortal(modalContent, document.body);
}
