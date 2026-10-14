'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { PublishedEntry } from '@/components/stories/usePublishedEntries';

const ROTATE_MS = 8000;

interface TestimonialHighlightsProps {
  testimonials: PublishedEntry[];
}

export default function TestimonialHighlights({ testimonials }: TestimonialHighlightsProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const count = testimonials.length;

  useEffect(() => {
    if (count < 2 || paused || reduceMotion) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % count), ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [count, paused, reduceMotion]);

  if (count === 0) return null;

  const current = testimonials[Math.min(active, count - 1)];
  const details = [current.service, current.date].filter(Boolean).join(' · ');

  return (
    <section
      className="bg-gray-900 py-10 text-white sm:py-14 md:py-16 lg:py-20 xl:py-24"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:max-w-4xl lg:px-8">
        <p className="eyebrow mb-4 text-gilt-gold">What our clients say</p>
        <div className="mb-4 font-serif text-5xl leading-none text-gilt-orange sm:text-6xl" aria-hidden="true">&ldquo;</div>
        <div className="min-h-[220px] sm:min-h-[200px]" aria-live={paused ? 'polite' : 'off'}>
          <AnimatePresence mode="wait">
            <motion.figure
              key={current._id}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
            >
              <blockquote className="line-clamp-6 font-heading text-lg italic leading-relaxed sm:text-xl md:text-2xl">
                {current.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center justify-center gap-3">
                <span className="h-0.5 w-10 bg-gilt-gold" aria-hidden="true" />
                <span className="text-left">
                  <span className="block font-semibold">{current.name || 'Client'}</span>
                  {details && <span className="block text-sm text-gray-400">{details}</span>}
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        {count > 1 && (
          <div className="mt-6 flex justify-center">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial._id}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Show testimonial ${index + 1} of ${count}`}
                aria-current={index === active}
                className="flex h-11 min-w-[28px] items-center justify-center rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-gilt-gold"
              >
                <span className={`block h-2 rounded-full transition-all duration-300 ${index === active ? 'w-6 bg-gilt-gold' : 'w-2 bg-white/30'}`} aria-hidden="true" />
              </button>
            ))}
          </div>
        )}

        <Link
          href="/testimonies"
          className="mt-6 inline-flex min-h-[48px] items-center gap-2 rounded-md border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-gilt-gold"
        >
          Read all testimonies
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
