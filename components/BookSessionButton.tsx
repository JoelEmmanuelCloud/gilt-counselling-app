'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import AuthModal from '@/components/AuthModal';
import Button from '@/components/ui/Button';

interface BookSessionButtonProps {
  children?: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

export default function BookSessionButton({
  children = 'Book Session',
  className = '',
  variant = 'primary'
}: BookSessionButtonProps) {
  const { data: session, status } = useSession();
  const { user: customUser, token } = useAuth();
  const router = useRouter();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const user = session?.user || customUser;
  const isAuthenticated = status === 'authenticated' || (token && customUser);

  const handleClick = () => {
    if (isAuthenticated) {
      if (user?.role === 'admin') {
        router.push('/admin');
      } else if (user?.role === 'counselor') {
        router.push('/counselor');
      } else {
        router.push('/dashboard');
      }
    } else {
      setShowAuthModal(true);
    }
  };

  return (
    <>
      <Button
        onClick={handleClick}
        className={className}
      >
        {children}
      </Button>

      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          redirectTo="/dashboard"
        />
      )}
    </>
  );
}
