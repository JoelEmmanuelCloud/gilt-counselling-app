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

  // Check both NextAuth (Google) and custom OTP auth
  const isAuthenticated = status === 'authenticated' || (token && customUser);

  const handleClick = () => {
    if (isAuthenticated) {
      // Authenticated - go to dashboard
      router.push('/account');
    } else {
      // Not authenticated - show auth modal
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
          redirectTo="/account"
        />
      )}
    </>
  );
}
