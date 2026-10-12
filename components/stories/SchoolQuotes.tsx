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

  if (failed) {
    return (
      <p className="max-w-5xl mx-auto rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-800" role="alert">
        We couldn&apos;t load school feedback right now. Please refresh the page to try again.
      </p>
    );
  }

  if (entries.length === 0) {
    return <p className="max-w-5xl mx-auto text-center text-gray-600">School feedback will appear here soon.</p>;
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
