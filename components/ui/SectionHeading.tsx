import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = false,
  className = ''
}: SectionHeadingProps) {
  return (
    <div className={`mb-8 md:mb-12 ${centered ? 'text-center' : ''} ${className}`}>
      <h2 className="heading-lg mb-4">{title}</h2>
      {subtitle && (
        <p className="body-lg text-gray-600 max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
