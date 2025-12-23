import React from 'react';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'warm';
  className?: string;
}

export default function Card({ children, variant = 'default', className = '' }: CardProps) {
  const variants = {
    default: 'bg-white',
    warm: 'bg-warm-cream',
  };

  return (
    <div className={`${variants[variant]} rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 ${className}`}>
      {children}
    </div>
  );
}
