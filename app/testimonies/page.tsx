'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import SectionHeading from '@/components/ui/SectionHeading';
import TestimonialCard from '@/components/ui/TestimonialCard';
import Button from '@/components/ui/Button';
import Pagination from '@/components/ui/Pagination';
import { TestimonialCardSkeleton } from '@/components/ui/Skeleton';
import { usePublishedEntries } from '@/components/stories/usePublishedEntries';

const PAGE_SIZE = 6;

export default function TestimoniesPage() {
  const { entries, loading, failed } = usePublishedEntries('client');
  const [page, setPage] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.max(1, Math.ceil(entries.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageEntries = entries.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const changePage = (nextPage: number) => {
    setPage(Math.min(Math.max(1, nextPage), totalPages));
    const grid = gridRef.current;
    if (!grid) return;
    grid.focus({ preventScroll: true });
    const navHeight = window.matchMedia('(min-width: 768px)').matches ? 136 : 120;
    if (grid.getBoundingClientRect().top < navHeight) {
      grid.scrollIntoView({ block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-off-white">
      <PageHeader
        eyebrow="Testimonies"
        title="Stories of Hope & Growth"
        description="Hear from those we've had the privilege to support on their journey toward healing and growth."
        image={{ src: '/images/office1.jpg', alt: 'A calm counselling room with two armchairs, a small table, and a plant' }}
      >
        <p className="mt-4 text-sm text-gray-900/80">
          All testimonials are shared anonymously to protect our clients' privacy and confidentiality.
        </p>
      </PageHeader>

      <section className="section-container" aria-busy={loading}>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12" role="status" aria-live="polite">
            <span className="sr-only">Loading testimonials</span>
            {[0, 1, 2].map((i) => (
              <TestimonialCardSkeleton key={i} />
            ))}
          </div>
        ) : failed ? (
          <p className="max-w-3xl mx-auto rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-800" role="alert">
            We couldn&apos;t load testimonials right now. Please refresh the page to try again.
          </p>
        ) : entries.length === 0 ? (
          <p className="text-center text-gray-600">Client testimonials will appear here soon.</p>
        ) : (
          <>
          <div
            ref={gridRef}
            tabIndex={-1}
            aria-label="Testimonials"
            className="grid scroll-mt-[120px] focus:outline-none grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 md:scroll-mt-[136px]"
          >
            {pageEntries.map((testimonial) => (
              <TestimonialCard
                key={testimonial._id}
                quote={testimonial.quote || ''}
                firstName={testimonial.name || ''}
                service={testimonial.service}
                date={testimonial.date}
              />
            ))}
          </div>
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onPageChange={changePage}
            label="Testimonial pages"
          />
          </>
        )}
      </section>

      <section className="section-container bg-warm-cream">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-white rounded-lg p-8 shadow-calm">
            <svg className="w-12 h-12 text-soft-gold mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <h3 className="heading-sm mb-4">Your Privacy is Sacred</h3>
            <p className="body-md text-gray-700 mb-4">
              All testimonials shared here have been anonymized to protect the identity and privacy of our clients.
              We use first names only and obtain explicit consent before sharing any feedback.
            </p>
            <p className="text-sm text-gray-600">
              Confidentiality is one of our core values, and we take it seriously in everything we do.
            </p>
          </div>
        </div>
      </section>

      <section className="section-container bg-off-white">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeading
            title="Your Story Could Inspire Someone"
            subtitle="If our counselling services have helped you, consider sharing your experience to give hope to others who may be struggling."
            centered
          />
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link href="/contact">
              <Button variant="ghost">
                Share Your Story
              </Button>
            </Link>
            <Link href="/book-appointment">
              <Button variant="primary">
                Begin Your Journey
              </Button>
            </Link>
          </div>
          <p className="text-sm text-gray-600 mt-6">
            We'll work with you to ensure your privacy is protected while sharing your message of hope.
          </p>
        </div>
      </section>
    </div>
  );
}
