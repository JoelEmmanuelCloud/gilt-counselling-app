import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
  className?: string;
}

export default function Button({
  variant = 'primary',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'px-6 py-3 rounded-lg font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-soft-gold text-white hover:bg-muted-coral focus:ring-soft-gold',
    secondary: 'bg-gentle-blue-grey text-white hover:bg-muted-teal focus:ring-gentle-blue-grey',
    ghost: 'bg-transparent border-2 border-soft-gold text-soft-gold hover:bg-soft-gold hover:text-white focus:ring-soft-gold',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
