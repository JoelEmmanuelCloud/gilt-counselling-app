import React from 'react';

interface ImagePlaceholderProps {
  description: string;
  dimensions?: string;
  usageNotes?: string;
  className?: string;
}

export default function ImagePlaceholder({
  description,
  dimensions = '100%',
  usageNotes,
  className = ''
}: ImagePlaceholderProps) {
  return (
    <div
      className={`border-2 border-dashed border-soft-gold bg-warm-cream rounded-lg p-8 flex flex-col items-center justify-center text-center ${className}`}
      style={{ minHeight: dimensions }}
    >
      <div className="text-soft-gold mb-2">
        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <p className="font-heading text-lg font-semibold text-gray-800 mb-2">
        {description}
      </p>
      {usageNotes && (
        <p className="text-sm text-gray-600 max-w-md">
          {usageNotes}
        </p>
      )}
      <p className="text-xs text-gray-500 mt-3">
        Replace this placeholder with actual image
      </p>
    </div>
  );
}
