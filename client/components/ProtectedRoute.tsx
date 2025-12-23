'use client';

import { useEffect } from 'react';
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

  useEffect(() => {
    if (!token || !user) {
      router.push('/login');
      return;
    }

    if (adminOnly && user.role !== 'admin') {
      router.push('/dashboard');
    }
  }, [user, token, adminOnly, router]);

  if (!token || !user) {
    return null;
  }

  if (adminOnly && user.role !== 'admin') {
    return null;
  }

  return <>{children}</>;
}
