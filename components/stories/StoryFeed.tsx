'use client';

import React from 'react';
import EventTestimonialCard from '@/components/ui/EventTestimonialCard';
import { StoryCardSkeleton } from '@/components/ui/Skeleton';
import type { StoryCategory } from '@/lib/testimonialCategories';
import { usePublishedEntries } from './usePublishedEntries';

interface StoryFeedProps {
  category: StoryCategory;
  badge: string;
  emptyMessage: string;
}

export default function StoryFeed({ category, badge, emptyMessage }: StoryFeedProps) {
  const { entries, loading, failed } = usePublishedEntries(category);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8" role="status" aria-live="polite">
        <span className="sr-only">Loading {badge.toLowerCase()} stories</span>
        <StoryCardSkeleton />
        <StoryCardSkeleton />
      </div>
    );
  }

  if (failed) {
    return (
      <p className="max-w-5xl mx-auto rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-800" role="alert">
        We couldn&apos;t load these stories right now. Please refresh the page to try again.
      </p>
    );
  }

  if (entries.length === 0) {
    return <p className="max-w-5xl mx-auto text-center text-gray-600">{emptyMessage}</p>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
      {entries.map((entry) => (
        <EventTestimonialCard
          key={entry._id}
          badge={badge}
          title={entry.title || ''}
          organization={entry.organization}
          date={entry.date}
          description={entry.description || ''}
          images={entry.images}
          videoUrl={entry.videoUrl}
        />
      ))}
    </div>
  );
}
