'use client';

import React from 'react';
import Image from 'next/image';
import type { Story } from './types';

interface StoryCardProps {
  story: Story;
  badge: string;
  onOpen: (story: Story) => void;
}

export default function StoryCard({ story, badge, onOpen }: StoryCardProps) {
  const cover = story.images[0];
  const photoCount = story.images.length;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md focus-within:ring-2 focus-within:ring-gray-900">
      <div className="relative aspect-[4/3] bg-warm-cream">
        {cover ? (
          <Image
            src={cover}
            alt=""
            fill
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 motion-safe:group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm font-medium text-gray-500">No photos yet</div>
        )}
        {(photoCount > 1 || story.videoUrl) && (
          <div className="absolute bottom-3 right-3 flex gap-2">
            {photoCount > 1 && (
              <span className="rounded-full bg-gray-900/80 px-2.5 py-1 text-xs font-medium text-white">
                {photoCount} photos
              </span>
            )}
            {story.videoUrl && (
              <span className="rounded-full bg-gray-900/80 px-2.5 py-1 text-xs font-medium text-white">Video</span>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="mb-2 flex flex-wrap items-center gap-x-2 text-sm text-gray-600">
          <span className="eyebrow text-gray-700">{badge}</span>
          {story.date && <span aria-hidden="true">&middot;</span>}
          {story.date && <span>{story.date}</span>}
        </p>
        <h3 className="line-clamp-2 text-lg font-semibold leading-snug tracking-tight text-gray-900">{story.title}</h3>
        {story.organization && (
          <p className="mt-1 line-clamp-1 text-sm font-medium text-gray-700">{story.organization}</p>
        )}
        <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-gray-600">{story.description}</p>
        <button
          type="button"
          onClick={() => onOpen(story)}
          className="mt-auto self-start pt-4 text-sm font-semibold text-gray-900 underline decoration-soft-terracotta decoration-2 underline-offset-4 after:absolute after:inset-0 after:content-[''] group-hover:decoration-gray-900 focus:outline-none"
        >
          View story<span className="sr-only">: {story.title}</span>
        </button>
      </div>
    </article>
  );
}
