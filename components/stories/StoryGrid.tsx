'use client';

import React, { useState } from 'react';
import Skeleton from '@/components/ui/Skeleton';
import type { StoryCategory } from '@/lib/testimonialCategories';
import { usePublishedEntries } from './usePublishedEntries';
import StoryCard from './StoryCard';
import StoryDialog from './StoryDialog';
import type { Story } from './types';

interface StoryGridProps {
  category: StoryCategory;
  badge: string;
  emptyMessage: string;
  extraStories?: Story[];
}

function StoryGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" role="status" aria-live="polite">
      <span className="sr-only">Loading stories</span>
      {[0, 1, 2].map((i) => (
        <div key={i} className="overflow-hidden rounded-lg border border-gray-200 bg-white" aria-hidden="true">
          <Skeleton className="aspect-[4/3] w-full rounded-none" />
          <div className="space-y-3 p-5">
            <Skeleton className="h-3 w-1/3" />
            <Skeleton className="h-5 w-5/6" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function StoryGrid({ category, badge, emptyMessage, extraStories = [] }: StoryGridProps) {
  const { entries, loading, failed } = usePublishedEntries(category);
  const [openStory, setOpenStory] = useState<Story | null>(null);

  if (loading) {
    return <StoryGridSkeleton />;
  }

  const stories: Story[] = [
    ...entries.map((entry) => ({
      id: entry._id,
      title: entry.title || '',
      organization: entry.organization,
      date: entry.date,
      description: entry.description || '',
      images: entry.images || [],
      videoUrl: entry.videoUrl,
    })),
    ...extraStories,
  ];

  return (
    <>
      {failed && (
        <p className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-800" role="alert">
          We couldn&apos;t load the latest stories right now. Please refresh the page to try again.
        </p>
      )}
      {stories.length === 0 && !failed ? (
        <p className="text-center text-gray-600">{emptyMessage}</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} badge={badge} onOpen={setOpenStory} />
          ))}
        </div>
      )}
      <StoryDialog story={openStory} badge={badge} onClose={() => setOpenStory(null)} />
    </>
  );
}
