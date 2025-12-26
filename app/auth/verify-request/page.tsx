'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function VerifyRequest() {
  return (
    <div className="min-h-screen bg-off-white flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-soft-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-soft-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>

          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-4">
            Check your email
          </h1>

          <p className="text-gray-600 mb-6 leading-relaxed">
            A sign-in link has been sent to your email address. Click the link in the email to complete your sign-in.
          </p>

          <div className="bg-warm-cream rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-700">
              <strong>Didn't receive the email?</strong>
            </p>
            <ul className="text-sm text-gray-600 mt-2 space-y-1">
              <li>• Check your spam or junk folder</li>
              <li>• Make sure you entered the correct email</li>
              <li>• Wait a few minutes and try again</li>
            </ul>
          </div>

          <Link href="/">
            <Button className="w-full bg-soft-terracotta text-white hover:bg-soft-terracotta/90">
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
