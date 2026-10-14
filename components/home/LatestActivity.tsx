'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SectionHeading from '@/components/ui/SectionHeading';
import Skeleton from '@/components/ui/Skeleton';
import StoryDialog from '@/components/stories/StoryDialog';
import type { ActivityItem } from './activity';

interface LatestActivityProps {
  items: ActivityItem[];
  loading: boolean;
}

function ActivityMeta({ item, light = false }: { item: ActivityItem; light?: boolean }) {
  return (
    <p className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm ${light ? 'text-white/85' : 'text-gray-600'}`}>
      <span className={`eyebrow rounded-full px-2.5 py-0.5 text-xs font-semibold ${light ? 'bg-white/90 text-gray-900' : `${item.tone.tile} ${item.tone.text}`}`}>
        {item.badge}
      </span>
      {item.story.date && <span>{item.story.date}</span>}
    </p>
  );
}

function ActivitySkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5" role="status" aria-live="polite">
      <span className="sr-only">Loading the latest activities</span>
      <Skeleton className="aspect-[16/10] w-full lg:col-span-3" />
      <div className="space-y-4 lg:col-span-2" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex gap-4">
            <Skeleton className="h-20 w-28 flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-3 w-1/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LatestActivity({ items, loading }: LatestActivityProps) {
  const [openItem, setOpenItem] = useState<ActivityItem | null>(null);

  if (!loading && items.length === 0) return null;

  const [featured, ...rest] = items;
  const others = rest.slice(0, 4);

  return (
    <section className="section-container bg-off-white">
      <SectionHeading
        title="What We've Been Up To"
        highlight="Up To"
        subtitle="The latest events, media features and community outreach from Gilt Counselling Consult."
        centered
      />

      {loading ? (
        <ActivitySkeleton />
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 lg:gap-8">
          <button
            type="button"
            onClick={() => setOpenItem(featured)}
            className="group relative block aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-900 text-left shadow-md focus:outline-none focus-visible:ring-4 focus-visible:ring-gilt-gold sm:aspect-[16/10] lg:col-span-3 lg:aspect-auto lg:min-h-[420px]"
          >
            {featured.story.images[0] && (
              <Image
                src={featured.story.images[0]}
                alt=""
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.04]"
              />
            )}
            <span className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/65 to-black/10" aria-hidden="true" />
            <span className="absolute left-4 top-4 rounded-full bg-gilt-gold px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-900">
              Latest
            </span>
            <span className="absolute inset-x-0 bottom-0 block p-5 sm:p-7">
              <ActivityMeta item={featured} light />
              <span className="mt-2 block font-heading text-xl font-bold leading-snug text-white sm:text-2xl lg:text-3xl">
                {featured.story.title}
              </span>
              {featured.story.organization && (
                <span className="mt-1 block text-sm font-medium text-white/80">{featured.story.organization}</span>
              )}
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gilt-gold">
                Read the story
                <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </span>
          </button>

          {others.length > 0 && (
            <ul className="flex flex-col divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white shadow-sm lg:col-span-2">
              {others.map((item) => (
                <li key={item.story.id}>
                  <button
                    type="button"
                    onClick={() => setOpenItem(item)}
                    className="group flex w-full gap-4 p-4 text-left transition-colors duration-150 hover:bg-warm-cream/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-900"
                  >
                    <span className="relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-md bg-warm-cream">
                      {item.story.images[0] && (
                        <Image src={item.story.images[0]} alt="" fill sizes="112px" className="object-cover" />
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <ActivityMeta item={item} />
                      <span className={`mt-1.5 line-clamp-2 block font-semibold leading-snug text-gray-900 transition-colors duration-150 ${item.tone.hoverText}`}>
                        {item.story.title}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
        <Link href="/news" className="btn-primary w-full sm:w-auto">
          View all News &amp; Media
        </Link>
        <Link href="/outreach" className="btn-secondary w-full sm:w-auto">
          Explore our Outreach
        </Link>
      </div>

      <StoryDialog story={openItem?.story ?? null} badge={openItem?.badge ?? ''} onClose={() => setOpenItem(null)} />
    </section>
  );
}
