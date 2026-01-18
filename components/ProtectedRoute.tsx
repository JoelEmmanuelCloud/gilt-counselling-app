'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';

export default function ProtectedRoute({
  children,
  adminOnly = false
}: {
  children: React.ReactNode;
  adminOnly?: boolean;
}) {
  const { user, token } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Give time for auth to initialize
    const timer = setTimeout(() => {
      setIsChecking(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isChecking) return;

    if (!token || !user) {
      // Redirect to home - user can sign in from there
      router.push('/');
      return;
    }

    if (adminOnly && user.role !== 'admin') {
      router.push('/account');
    }
  }, [user, token, adminOnly, router, isChecking]);

  // Show loading state while checking auth
  if (isChecking) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gilt-gold mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!token || !user) {
    return null;
  }

  if (adminOnly && user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-heading font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">You don't have permission to access this page.</p>
          <button
            onClick={() => router.push('/account')}
            className="bg-gilt-gold text-white px-6 py-2 rounded-lg hover:bg-gilt-orange transition"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
