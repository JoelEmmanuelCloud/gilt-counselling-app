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
    primary: 'bg-soft-terracotta text-gray-900 hover:bg-soft-terracotta/90 focus:ring-soft-terracotta font-semibold',
    secondary: 'bg-gentle-blue-grey text-white hover:bg-muted-teal focus:ring-gentle-blue-grey',
    ghost: 'bg-transparent border-2 border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-300',
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
