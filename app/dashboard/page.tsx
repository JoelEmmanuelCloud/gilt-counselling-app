'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to My Account page - this is now the main user dashboard
    router.replace('/account');
  }, [router]);

  return (
    <div className="min-h-screen bg-off-white flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-soft-terracotta mb-4"></div>
        <p className="text-gray-600">Redirecting to your account...</p>
      </div>
    </div>
  );
}
