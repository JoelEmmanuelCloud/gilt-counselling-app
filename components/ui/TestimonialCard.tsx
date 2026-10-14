import React from 'react';
import { BRAND_TONES, type BrandTone } from '@/lib/brandTones';

interface TestimonialCardProps {
  quote: string;
  firstName: string;
  service?: string;
  date?: string;
  tone?: BrandTone;
  className?: string;
}

export default function TestimonialCard({
  quote,
  firstName,
  service,
  date,
  tone = BRAND_TONES[3],
  className = ''
}: TestimonialCardProps) {
  return (
    <div className={`card-warm border-t-4 ${tone.border} ${className}`}>
      <div className="mb-4">
        <svg className={`w-9 h-9 ${tone.icon}`} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>
      <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">
        "{quote}"
      </p>
      <div className="flex items-center gap-3 border-t border-soft-beige pt-4">
        {firstName && (
          <span className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full font-semibold text-white ${tone.solid}`} aria-hidden="true">
            {firstName.charAt(0).toUpperCase()}
          </span>
        )}
        <div className="min-w-0">
          <p className="font-semibold text-gray-900">{firstName}</p>
          {(service || date) && (
            <p className="text-sm text-gray-600 mt-1">
              {service && <span className={`font-medium ${tone.text}`}>{service}</span>}
              {service && date && <span className="mx-2">•</span>}
              {date && <span>{date}</span>}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
