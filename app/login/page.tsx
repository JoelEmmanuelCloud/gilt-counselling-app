'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [useMagicLink, setUseMagicLink] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const { login, user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Redirect based on user role after successful login
  useEffect(() => {
    if (user) {
      // Check for redirect parameter
      const redirectUrl = searchParams.get('redirect');

      if (redirectUrl) {
        // Redirect to the requested page
        router.push(redirectUrl);
      } else if (user.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    }
  }, [user, router, searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (useMagicLink) {
        // Send magic link
        await axios.post('/api/auth/send-magic-link', { email });
        setMagicLinkSent(true);
        setLoading(false);
      } else {
        // Traditional login
        await login(email, password);
        // Will redirect based on role in the useEffect
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'An error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-gray-600 mt-2">Sign in to your account</p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {magicLinkSent && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              Magic link sent! Please check your email inbox.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gilt-gold focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>

            {!useMagicLink && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  required={!useMagicLink}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gilt-gold focus:border-transparent"
                  placeholder="Enter your password"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading || magicLinkSent}
              className="w-full bg-gilt-gold text-white py-3 rounded-lg font-semibold hover:bg-gilt-orange transition disabled:opacity-50"
            >
              {loading
                ? useMagicLink
                  ? 'Sending magic link...'
                  : 'Signing in...'
                : useMagicLink
                ? 'Send Magic Link'
                : 'Sign In'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => {
                setUseMagicLink(!useMagicLink);
                setError('');
                setMagicLinkSent(false);
              }}
              className="text-sm text-gilt-gold hover:text-gilt-orange font-medium"
            >
              {useMagicLink ? 'Use password instead' : 'Use magic link (passwordless)'}
            </button>
          </div>

          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{' '}
            <Link
              href={`/register${searchParams.get('redirect') ? `?redirect=${searchParams.get('redirect')}` : ''}`}
              className="text-gilt-gold hover:text-gilt-orange font-semibold"
            >
              Register here
            </Link>
          </p>

          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-700 font-semibold mb-2">Demo Credentials:</p>
            <p className="text-xs text-gray-600">Admin: admin@gilt.com / admin123</p>
            <p className="text-xs text-gray-600">User: user@example.com / user123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
