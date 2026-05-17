'use client';

import React from 'react';
import Button from '@/components/ui/Button';

const PHONE_NUMBER = '2347065734165';
const DEFAULT_MESSAGE = encodeURIComponent(
  'Hello, I would like to book a counselling session with Gilt Counselling Consult. Please help me schedule an appointment.'
);

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
  const handleClick = () => {
    window.open(`https://wa.me/${PHONE_NUMBER}?text=${DEFAULT_MESSAGE}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <Button onClick={handleClick} className={className}>
      {children}
    </Button>
  );
}
