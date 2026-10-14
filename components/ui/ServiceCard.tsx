import React from 'react';
import { BRAND_TONES, type BrandTone } from '@/lib/brandTones';

interface ServiceCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  tone?: BrandTone;
  className?: string;
}

export default function ServiceCard({
  title,
  description,
  icon,
  tone = BRAND_TONES[3],
  className = ''
}: ServiceCardProps) {
  return (
    <div className={`card group border-t-4 ${tone.border} ${className}`}>
      {icon && (
        <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl ${tone.tile} [&>svg]:h-8 [&>svg]:w-8`}>
          {icon}
        </div>
      )}
      <h3 className={`heading-sm mb-3 transition-colors duration-300 ${tone.hoverText}`}>
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed text-left">
        {description}
      </p>
    </div>
  );
}
