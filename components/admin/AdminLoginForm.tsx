'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';

const inputClass =
  'w-full rounded-lg border bg-white py-3 pl-11 text-base text-gray-900 placeholder-gray-400 transition-colors duration-200 focus:border-gray-900 focus:outline-none focus:ring-4 focus:ring-gilt-gold/30';

export default function AdminLoginForm() {
  const { adminLogin } = useAuth();
  const passwordRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState('wecare@giltcounselling.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [capsLock, setCapsLock] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await adminLogin(email.trim(), password);
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
      setPassword('');
      passwordRef.current?.focus();
    } finally {
      setSubmitting(false);
    }
  };

  const detectCapsLock = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setCapsLock(e.getModifierState('CapsLock'));
  };

  const borderClass = error ? 'border-red-400' : 'border-gray-300';

  return (
    <div className="grid min-h-[calc(100dvh-5rem)] bg-off-white lg:grid-cols-2">
      <div className="relative hidden overflow-hidden lg:block">
        <Image
          src="/images/office1.jpg"
          alt=""
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/95 via-gray-900/60 to-gilt-teal/40" />
        <div className="relative flex h-full flex-col justify-between p-12 text-white xl:p-16">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-black/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-gilt-gold" aria-hidden="true" />
            Admin Portal
          </span>
          <div className="max-w-md">
            <p className="font-heading text-4xl font-bold leading-tight xl:text-5xl">
              Share the stories that bring hope.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-white/90">
              Curate client testimonials, school outreach, community events, and media
              features shown across Gilt Counselling Consult.
            </p>
            <p className="mt-10 border-t border-white/20 pt-6 text-sm text-white/75">
              &copy; {new Date().getFullYear()} Gilt Counselling Consult
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center px-4 py-12 sm:px-8">
        <div className="w-full max-w-md">
          <div className="relative mx-auto mb-8 h-20 w-36">
            <Image
              src="/Gilt Counselling Consult Profile.svg"
              alt="Gilt Counselling Consult"
              fill
              sizes="144px"
              className="object-contain"
            />
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-calm-lg sm:p-10">
            <div className="mb-8 text-center">
              <h1 className="font-heading text-3xl font-bold text-gray-900">Welcome back</h1>
              <p className="mt-2 text-base text-gray-600">
                Sign in to manage your site&rsquo;s testimonials.
              </p>
            </div>

            {error && (
              <div
                id="admin-login-error"
                role="alert"
                className="mb-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
              >
                <svg className="mt-0.5 h-5 w-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                </svg>
                <div>
                  <p className="font-semibold">{error}</p>
                  <p className="mt-0.5 text-red-700">Check your email and password, then try again.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="admin-email" className="mb-2 block text-sm font-medium text-gray-800">
                  Email address
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <input
                    id="admin-email"
                    type="email"
                    inputMode="email"
                    autoComplete="username"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-invalid={!!error}
                    aria-describedby={error ? 'admin-login-error' : undefined}
                    className={`${inputClass} ${borderClass} pr-4`}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="admin-password" className="mb-2 block text-sm font-medium text-gray-800">
                  Password
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                  <input
                    ref={passwordRef}
                    id="admin-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={detectCapsLock}
                    onKeyUp={detectCapsLock}
                    onBlur={() => setCapsLock(false)}
                    aria-invalid={!!error}
                    aria-describedby={[error && 'admin-login-error', capsLock && 'admin-capslock'].filter(Boolean).join(' ') || undefined}
                    className={`${inputClass} ${borderClass} pr-14`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    aria-pressed={showPassword}
                    aria-controls="admin-password"
                    className="absolute inset-y-1 right-1 flex w-11 cursor-pointer items-center justify-center rounded-md text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
                  >
                    {showPassword ? (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {capsLock && (
                  <p id="admin-capslock" className="mt-2 flex items-center gap-1.5 text-sm text-amber-800">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Caps Lock is on
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                aria-busy={submitting}
                className="flex min-h-[48px] w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-gilt-gold px-5 py-3 text-base font-semibold text-gray-900 shadow-sm transition-colors duration-200 hover:bg-gilt-gold/85 focus:outline-none focus-visible:ring-4 focus-visible:ring-gray-900/30 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting && (
                  <span className="h-4 w-4 rounded-full border-2 border-gray-900 border-t-transparent motion-safe:animate-spin" aria-hidden="true" />
                )}
                {submitting ? 'Signing in...' : 'Sign in'}
              </button>
            </form>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-md px-3 text-sm font-medium text-gray-700 transition-colors duration-200 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
