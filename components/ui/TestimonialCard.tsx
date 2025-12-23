import React from 'react';

interface TestimonialCardProps {
  quote: string;
  firstName: string;
  service?: string;
  date?: string;
  className?: string;
}

export default function TestimonialCard({
  quote,
  firstName,
  service,
  date,
  className = ''
}: TestimonialCardProps) {
  return (
    <div className={`card-warm ${className}`}>
      <div className="mb-4">
        <svg className="w-8 h-8 text-soft-gold opacity-50" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>
      <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">
        "{quote}"
      </p>
      <div className="border-t border-soft-beige pt-4">
        <p className="font-semibold text-gray-900">{firstName}</p>
        {(service || date) && (
          <p className="text-sm text-gray-600 mt-1">
            {service && <span>{service}</span>}
            {service && date && <span className="mx-2">•</span>}
            {date && <span>{date}</span>}
          </p>
        )}
      </div>
    </div>
  );
}
