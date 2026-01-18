'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
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
  const { data: session } = useSession();
  const router = useRouter();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleClick = () => {
    if (session?.user) {
      // Authenticated - go to dashboard
      router.push('/dashboard');
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
          redirectTo="/dashboard"
        />
      )}
    </>
  );
}
