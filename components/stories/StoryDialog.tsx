'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import type { Story } from './types';

interface StoryDialogProps {
  story: Story | null;
  badge: string;
  onClose: () => void;
}

export default function StoryDialog({ story, badge, onClose }: StoryDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (story && !dialog.open) {
      dialog.showModal();
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }

    if (!story && dialog.open) {
      dialog.close();
    }
  }, [story]);

  const requestClose = () => {
    dialogRef.current?.close();
    onClose();
  };

  const handleCancel = (event: React.SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault();
    requestClose();
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) {
      requestClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onCancel={handleCancel}
      onClick={handleBackdropClick}
      aria-labelledby="story-dialog-title"
      className="m-auto w-[calc(100%-2rem)] max-w-3xl max-h-[90dvh] overflow-hidden rounded-lg bg-white p-0 shadow-lg backdrop:bg-gray-900/60"
    >
      {story && (
        <div className="flex max-h-[90dvh] flex-col">
          <div className="flex items-start justify-between gap-4 border-b border-gray-200 px-5 py-4 sm:px-8">
            <div className="min-w-0">
              <p className="mb-1 flex flex-wrap items-center gap-x-2 text-sm text-gray-600">
                <span className="eyebrow text-gilt-gold-strong">{badge}</span>
                {story.date && <span aria-hidden="true">&middot;</span>}
                {story.date && <span>{story.date}</span>}
              </p>
              <h2 id="story-dialog-title" className="text-xl font-semibold leading-snug tracking-tight text-gray-900 sm:text-2xl">
                {story.title}
              </h2>
              {story.organization && <p className="mt-1 text-sm font-medium text-gray-700">{story.organization}</p>}
            </div>
            <button
              type="button"
              onClick={requestClose}
              aria-label="Close story"
              className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-md text-gray-600 transition-colors duration-150 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="overflow-y-auto px-5 py-5 sm:px-8 sm:py-6">
            <p className="whitespace-pre-line text-[15px] leading-relaxed text-gray-700">{story.description}</p>

            {story.images.length > 0 && (
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {story.images.map((url, index) => (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block aspect-[4/3] overflow-hidden rounded-lg bg-warm-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
                  >
                    <Image
                      src={url}
                      alt={`${story.title}, photo ${index + 1} of ${story.images.length}`}
                      fill
                      sizes="(min-width: 640px) 360px, 100vw"
                      className="object-cover"
                      loading="lazy"
                    />
                    <span className="sr-only">(opens full-size photo in a new tab)</span>
                  </a>
                ))}
              </div>
            )}

            {story.videoUrl && (
              <video controls preload="none" poster={story.images[0]} className="mt-6 w-full rounded-lg">
                <source src={story.videoUrl} type="video/mp4" />
              </video>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}
