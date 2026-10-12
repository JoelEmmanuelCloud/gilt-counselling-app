'use client';

import React from 'react';
import { QuoteCardSkeleton } from '@/components/ui/Skeleton';
import { usePublishedEntries } from './usePublishedEntries';

export default function SchoolQuotes() {
  const { entries, loading, failed } = usePublishedEntries('school');

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8" role="status" aria-live="polite">
        <span className="sr-only">Loading school feedback</span>
        <QuoteCardSkeleton />
        <QuoteCardSkeleton />
      </div>
    );
  }

  if (failed || entries.length === 0) {
    return null;
  }

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
      {entries.map((entry) => (
        <figure key={entry._id} className="bg-white rounded-lg p-6 sm:p-8 shadow-calm">
          <figcaption className="heading-sm mb-4">{entry.school}</figcaption>
          <div className="space-y-4">
            {(entry.quotes || []).map((quote, index) => (
              <blockquote key={index} className="border-t border-soft-beige pt-4 first:border-t-0 first:pt-0">
                <p className="text-gray-700 leading-relaxed italic mb-1">&ldquo;{quote.text}&rdquo;</p>
                <footer className="text-sm font-semibold text-gray-900">{quote.role}</footer>
              </blockquote>
            ))}
          </div>
        </figure>
      ))}
    </div>
  );
}
