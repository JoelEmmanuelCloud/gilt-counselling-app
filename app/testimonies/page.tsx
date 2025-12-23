'use client';

import React from 'react';
import Link from 'next/link';
import SectionHeading from '@/components/ui/SectionHeading';
import TestimonialCard from '@/components/ui/TestimonialCard';
import Button from '@/components/ui/Button';

export default function TestimoniesPage() {
  const testimonials = [
    {
      quote: 'The counselling sessions helped me understand myself better and gave me tools to manage my emotions. I feel more confident and hopeful about the future.',
      firstName: 'Sarah',
      service: 'Individual Counselling',
      date: 'November 2024',
    },
    {
      quote: 'Our family is communicating better than we have in years. The sessions provided a safe space for all of us to express ourselves and heal together.',
      firstName: 'Michael',
      service: 'Family Counselling',
      date: 'October 2024',
    },
    {
      quote: 'I was struggling with school stress and anxiety. The counselor listened without judgment and helped me find healthy coping strategies that actually work.',
      firstName: 'David',
      service: 'Teen Support',
      date: 'December 2024',
    },
    {
      quote: 'After years of feeling lost, I finally found someone who understood what I was going through. The support has been life-changing.',
      firstName: 'Grace',
      service: 'Mental Health Support',
      date: 'September 2024',
    },
    {
      quote: 'The parenting sessions gave us practical tools and helped us understand our child better. We feel equipped to support them through their challenges.',
      firstName: 'Emmanuel',
      service: 'Parenting Support',
      date: 'November 2024',
    },
    {
      quote: 'I learned so much about myself through these sessions. The counselor created such a warm, accepting environment that made it easy to open up.',
      firstName: 'Joy',
      service: 'Individual Counselling',
      date: 'October 2024',
    },
    {
      quote: 'Our teen was going through a difficult time, and the counselor helped her navigate it with compassion and wisdom. We're so grateful.',
      firstName: 'Patricia',
      service: 'Teen & Youth Support',
      date: 'December 2024',
    },
    {
      quote: 'The sessions helped me process trauma I had been carrying for years. I feel lighter and more at peace than I have in a long time.',
      firstName: 'Daniel',
      service: 'Mental Health Support',
      date: 'August 2024',
    },
    {
      quote: 'Coming to counselling was the best decision I made this year. I have learned to set boundaries and prioritize my mental wellbeing.',
      firstName: 'Ruth',
      service: 'Individual Counselling',
      date: 'September 2024',
    },
  ];

  return (
    <div className="min-h-screen bg-off-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-warm-cream via-off-white to-warm-sand py-16 md:py-20">
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

      {/* Testimonials Grid */}
      <section className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              firstName={testimonial.firstName}
              service={testimonial.service}
              date={testimonial.date}
            />
          ))}
        </div>
      </section>

      {/* Privacy Note */}
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

      {/* Share Your Story CTA */}
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
