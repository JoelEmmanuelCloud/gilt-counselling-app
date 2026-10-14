'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SectionHeading from '@/components/ui/SectionHeading';
import Marquee from '@/components/ui/Marquee';
import StoryDialog from '@/components/stories/StoryDialog';
import type { ActivityItem } from './activity';

const PHOTOS_PER_STORY = 2;
const MAX_PHOTOS = 20;

interface MomentsStripProps {
  items: ActivityItem[];
}

export default function MomentsStrip({ items }: MomentsStripProps) {
  const [openItem, setOpenItem] = useState<ActivityItem | null>(null);

  const moments = items
    .flatMap((item) => item.story.images.slice(0, PHOTOS_PER_STORY).map((src) => ({ src, item })))
    .slice(0, MAX_PHOTOS);

  if (moments.length < 4) return null;

  return (
    <section className="overflow-hidden bg-white py-10 sm:py-14 md:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Moments from Our Work"
          highlight="Our Work"
          subtitle="Conferences, school visits, workshops and celebrations. Tap a photo to read the story behind it."
          centered
        />
      </div>

      <div className="mx-auto max-w-[1600px]">
        <Marquee label="Photos from our activities" durationSeconds={moments.length * 5} gapClassName="gap-3 pr-3 sm:gap-4 sm:pr-4">
          {moments.map(({ src, item }, index) => (
            <li key={`${item.story.id}-${index}`} className={`flex-shrink-0 ${index % 3 === 1 ? 'w-44 sm:w-56' : 'w-56 sm:w-72'}`}>
              <button
                type="button"
                onClick={() => setOpenItem(item)}
                className="group relative block h-52 w-full overflow-hidden rounded-lg bg-gray-200 shadow-sm focus:outline-none focus-visible:ring-4 focus-visible:ring-gilt-gold sm:h-64"
              >
                <Image
                  src={src}
                  alt={item.story.title}
                  fill
                  sizes="288px"
                  quality={60}
                  className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden="true" />
                <span className="absolute inset-x-0 bottom-0 line-clamp-2 p-3 text-left text-sm font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden="true">
                  {item.story.title}
                </span>
              </button>
            </li>
          ))}
        </Marquee>
      </div>

      <div className="mt-8 flex justify-center px-4 sm:mt-10">
        <Link href="/news" className="btn-secondary w-full sm:w-auto">
          See more on News &amp; Media
        </Link>
      </div>

      <StoryDialog story={openItem?.story ?? null} badge={openItem?.badge ?? ''} onClose={() => setOpenItem(null)} />
    </section>
  );
}
