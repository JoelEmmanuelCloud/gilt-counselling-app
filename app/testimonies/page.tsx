'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import SectionHeading from '@/components/ui/SectionHeading';
import TestimonialCard from '@/components/ui/TestimonialCard';
import EventTestimonialCard from '@/components/ui/EventTestimonialCard';
import Button from '@/components/ui/Button';

interface SchoolQuote {
  text: string;
  role: string;
}

interface Testimonial {
  _id: string;
  category: 'client' | 'school' | 'community' | 'media';
  quote?: string;
  name?: string;
  service?: string;
  date?: string;
  school?: string;
  quotes?: SchoolQuote[];
  title?: string;
  organization?: string;
  description?: string;
  images?: string[];
  videoUrl?: string;
}

export default function TestimoniesPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/api/testimonials');
        const data = await response.json();
        setTestimonials(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to load testimonials', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const clientTestimonials = testimonials.filter((t) => t.category === 'client');
  const schoolTestimonials = testimonials.filter((t) => t.category === 'school');
  const communityTestimonials = testimonials.filter((t) => t.category === 'community');
  const mediaTestimonials = testimonials.filter((t) => t.category === 'media');

  return (
    <div className="min-h-screen bg-off-white">

      <section className="bg-gradient-to-br from-warm-cream via-off-white to-warm-sand py-10 sm:py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="heading-xl mb-6">
            Stories of Hope & Growth
          </h1>
          <p className="body-lg mb-4">
            Hear from those we've had the privilege to support on their journey toward healing and growth.
          </p>
          <p className="text-sm text-gray-600">
            All testimonials are shared anonymously to protect our clients' privacy and confidentiality.
          </p>
        </div>
      </section>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-gilt-gold border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {clientTestimonials.length > 0 && (
            <section className="section-container">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12">
                {clientTestimonials.map((testimonial) => (
                  <TestimonialCard
                    key={testimonial._id}
                    quote={testimonial.quote || ''}
                    firstName={testimonial.name || ''}
                    service={testimonial.service}
                    date={testimonial.date}
                  />
                ))}
              </div>
            </section>
          )}

          {schoolTestimonials.length > 0 && (
            <section className="section-container bg-warm-cream">
              <SectionHeading
                title="School Outreach Testimonies"
                subtitle="Feedback from our Emotional Intelligence sessions with students, counsellors, and principals across schools."
                centered
              />
              <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                {schoolTestimonials.map((entry) => (
                  <div key={entry._id} className="bg-white rounded-xl p-6 sm:p-8 shadow-calm">
                    <h3 className="heading-sm mb-4">{entry.school}</h3>
                    <div className="space-y-4">
                      {(entry.quotes || []).map((quote, quoteIndex) => (
                        <div key={quoteIndex} className="border-t border-soft-beige pt-4 first:border-t-0 first:pt-0">
                          <p className="text-gray-700 leading-relaxed italic mb-1">"{quote.text}"</p>
                          <p className="text-sm text-soft-gold font-semibold">{quote.role}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {communityTestimonials.length > 0 && (
            <section className="section-container bg-off-white">
              <SectionHeading
                title="Community Outreach"
                subtitle="Making a difference beyond our counselling rooms — bringing support and awareness to communities."
                centered
              />
              <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
                {communityTestimonials.map((entry) => (
                  <EventTestimonialCard
                    key={entry._id}
                    badge="Community"
                    title={entry.title || ''}
                    organization={entry.organization}
                    date={entry.date}
                    description={entry.description || ''}
                    images={entry.images}
                    videoUrl={entry.videoUrl}
                  />
                ))}
              </div>
            </section>
          )}

          {mediaTestimonials.length > 0 && (
            <section className="section-container bg-off-white">
              <SectionHeading
                title="Media & Press Features"
                subtitle="Sharing our expertise on mental health and wellness with the wider public through radio."
                centered
              />
              <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
                {mediaTestimonials.map((entry) => (
                  <EventTestimonialCard
                    key={entry._id}
                    badge="Media"
                    title={entry.title || ''}
                    organization={entry.organization}
                    date={entry.date}
                    description={entry.description || ''}
                    images={entry.images}
                    videoUrl={entry.videoUrl}
                  />
                ))}
              </div>
            </section>
          )}
        </>
      )}

      <section className="section-container bg-warm-cream">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-white rounded-xl p-8 shadow-calm">
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
