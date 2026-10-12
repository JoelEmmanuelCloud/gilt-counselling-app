'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';

const REMEMBER_KEY = 'admin-login-email';

const stripePattern: React.CSSProperties = {
  backgroundImage:
    'repeating-linear-gradient(135deg, rgba(255,255,255,0.22) 0px, rgba(255,255,255,0.22) 2px, transparent 2px, transparent 8px)',
  maskImage: 'radial-gradient(ellipse 75% 90% at 90% 50%, #000 25%, transparent 78%)',
  WebkitMaskImage: 'radial-gradient(ellipse 75% 90% at 90% 50%, #000 25%, transparent 78%)',
};

const fieldClass =
  'block h-12 w-full rounded-md border bg-white px-3.5 text-base text-gray-900 shadow-sm transition-colors duration-150 focus:border-gilt-teal-dark focus:outline-none focus:ring-2 focus:ring-gilt-teal-dark/25';

export default function AdminLoginForm() {
  const { adminLogin } = useAuth();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [capsLock, setCapsLock] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    let saved: string | null = null;
    try {
      saved = localStorage.getItem(REMEMBER_KEY);
    } catch {}
    if (saved) {
      setEmail(saved);
      passwordRef.current?.focus();
    } else {
      emailRef.current?.focus();
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    const trimmedEmail = email.trim();
    try {
      await adminLogin(trimmedEmail, password);
      try {
        if (remember) {
          localStorage.setItem(REMEMBER_KEY, trimmedEmail);
        } else {
          localStorage.removeItem(REMEMBER_KEY);
        }
      } catch {}
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

  const borderClass = error ? 'border-red-500' : 'border-gray-300';

  return (
    <div className="fixed inset-0 z-[60] flex overflow-y-auto bg-white font-body">
      <section className="flex min-h-full w-full flex-col lg:w-1/2">
        <header className="flex items-center justify-between px-6 pt-6 sm:px-8">
          <Link
            href="/"
            className="relative block h-14 w-32 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-gilt-teal-dark"
            aria-label="Gilt Counselling Consult home"
          >
            <Image
              src="/Gilt Counselling Consult Profile.svg"
              alt=""
              fill
              priority
              sizes="128px"
              className="object-contain object-left"
            />
          </Link>
          <Link
            href="/"
            className="inline-flex h-11 items-center rounded-md border border-gray-300 px-4 text-sm font-medium text-gray-800 shadow-sm transition-colors duration-150 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gilt-teal-dark lg:hidden"
          >
            Back to site
          </Link>
        </header>

        <div className="flex flex-1 items-center justify-center px-6 py-12 sm:px-8">
          <div className="w-full max-w-[400px]">
            <h1 className="text-center font-body text-[28px] font-semibold tracking-tight text-gray-900 sm:text-[32px]">
              Sign in to Gilt Admin
            </h1>
            <p className="mt-2 text-center text-[15px] text-gray-600">
              Manage the testimonials published on your website.
            </p>

            {error && (
              <div
                id="admin-login-error"
                role="alert"
                className="mt-8 flex gap-3 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
              >
                <svg className="mt-0.5 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-semibold">{error}</p>
                  <p className="mt-0.5">Check your email and password, then try again.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <label htmlFor="admin-email" className="mb-2 block text-[15px] font-medium text-gray-900">
                  Email
                </label>
                <input
                  ref={emailRef}
                  id="admin-email"
                  type="email"
                  inputMode="email"
                  autoComplete="username"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={!!error}
                  aria-describedby={error ? 'admin-login-error' : undefined}
                  className={`${fieldClass} ${borderClass}`}
                />
              </div>

              <div>
                <label htmlFor="admin-password" className="mb-2 block text-[15px] font-medium text-gray-900">
                  Password
                </label>
                <div className="relative">
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
                    className={`${fieldClass} ${borderClass} pr-12`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    aria-pressed={showPassword}
                    aria-controls="admin-password"
                    className="absolute inset-y-0 right-0 flex w-12 cursor-pointer items-center justify-center rounded-r-md text-gray-600 transition-colors duration-150 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gilt-teal-dark"
                  >
                    {showPassword ? (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </button>
                </div>
                {capsLock && (
                  <p id="admin-capslock" className="mt-2 text-sm text-amber-800">
                    Caps Lock is on
                  </p>
                )}
              </div>

              <label className="flex cursor-pointer items-center gap-3 text-[15px] text-gray-800">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-5 w-5 cursor-pointer rounded border-gray-400 accent-gray-900"
                />
                Remember my email on this device
              </label>

              <button
                type="submit"
                disabled={submitting}
                aria-busy={submitting}
                className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-gilt-teal-dark px-4 text-base font-medium text-white shadow-sm transition-colors duration-150 hover:bg-gilt-teal-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-gilt-teal-dark focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting && (
                  <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent motion-safe:animate-spin" aria-hidden="true" />
                )}
                {submitting ? 'Signing in...' : 'Sign in'}
              </button>
            </form>

            <p className="mt-8 text-center text-[15px] text-gray-600">
              Not an administrator?{' '}
              <Link
                href="/"
                className="font-medium text-gilt-teal-dark underline-offset-4 hover:underline focus:outline-none focus-visible:underline"
              >
                Return to the website
              </Link>
            </p>
          </div>
        </div>
      </section>

      <aside className="relative hidden min-h-full w-1/2 overflow-hidden bg-gilt-teal-deep lg:flex lg:flex-col">
        <div className="pointer-events-none absolute inset-0" style={stripePattern} aria-hidden="true" />

        <div className="relative flex justify-end p-6 sm:p-8">
          <Link
            href="/"
            className="inline-flex h-11 items-center rounded-md bg-white px-5 text-[15px] font-medium text-gray-900 shadow-sm transition-colors duration-150 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gilt-teal-deep"
          >
            Back to site
          </Link>
        </div>

        <div className="relative flex flex-1 items-center px-12 pb-24 xl:px-16">
          <div className="max-w-lg">
            <p className="font-mono text-sm tracking-wide text-amber-200">
              Gilt Counselling Consult &middot; Admin
            </p>
            <p className="mt-4 text-4xl font-semibold leading-[1.1] tracking-tight text-white xl:text-5xl">
              Every story shared is a step toward healing.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-white/85">
              Publish client testimonials, school outreach, community events and media features in one place.
            </p>
            <Link
              href="/testimonials"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex h-11 items-center gap-2 rounded-md bg-white px-5 text-[15px] font-medium text-gray-900 shadow-sm transition-colors duration-150 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gilt-teal-deep"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
              View live testimonials
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}
