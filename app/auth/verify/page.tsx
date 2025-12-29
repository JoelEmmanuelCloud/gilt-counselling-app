'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

function VerifyMagicLinkContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState('Verifying your magic link...');

  useEffect(() => {
    const verifyToken = async () => {
      const token = searchParams.get('token');

      if (!token) {
        setStatus('error');
        setMessage('Invalid verification link. No token provided.');
        return;
      }

      try {
        const response = await axios.post('/api/auth/verify-magic-link', { token });

        if (response.data.token) {
          // Store token and user info
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));

          setStatus('success');
          setMessage('Successfully authenticated! Redirecting...');

          // Redirect based on role
          setTimeout(() => {
            if (response.data.user.role === 'admin') {
              router.push('/admin');
            } else {
              router.push('/dashboard');
            }
          }, 1500);
        }
      } catch (error: any) {
        setStatus('error');
        setMessage(
          error.response?.data?.message || 'Failed to verify magic link. It may have expired.'
        );
      }
    };

    verifyToken();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-white to-cream flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {status === 'verifying' && (
          <>
            <div className="w-16 h-16 border-4 border-gilt-gold border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Verifying...</h1>
            <p className="text-gray-600">{message}</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Success!</h1>
            <p className="text-gray-600">{message}</p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Verification Failed</h1>
            <p className="text-gray-600 mb-6">{message}</p>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-3 bg-gilt-gold text-white rounded-lg font-medium hover:bg-opacity-90 transition-all"
            >
              Back to Home
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function VerifyMagicLinkPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gilt-teal/10 via-white to-gilt-gold/10 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-gilt-teal mb-4"></div>
          <p className="text-gray-600">Verifying...</p>
        </div>
      </div>
    }>
      <VerifyMagicLinkContent />
    </Suspense>
  );
}
