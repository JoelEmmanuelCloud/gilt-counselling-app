'use client';

import React from 'react';
import Link from 'next/link';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import SectionHeading from '@/components/ui/SectionHeading';
import ServiceCard from '@/components/ui/ServiceCard';
import TestimonialCard from '@/components/ui/TestimonialCard';
import Button from '@/components/ui/Button';

export default function Home() {
  const services = [
    {
      title: 'Individual Counselling',
      description: 'One-on-one support tailored to your unique journey and needs.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      title: 'Family Counselling',
      description: 'Strengthen family bonds and navigate challenges together with compassion.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: 'Teen & Youth Support',
      description: 'Empowering young people to navigate life\'s complexities with confidence.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      title: 'Mental Health Support',
      description: 'Professional care for your emotional and psychological wellbeing.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
  ];

  const testimonials = [
    {
      quote: 'The counselling sessions helped me understand myself better and gave me tools to manage my emotions. I feel more confident now.',
      firstName: 'Sarah',
      service: 'Individual Counselling',
    },
    {
      quote: 'Our family is communicating better than we have in years. The sessions were a safe space for all of us.',
      firstName: 'Michael',
      service: 'Family Counselling',
    },
    {
      quote: 'I was struggling with school stress and anxiety. The counselor listened without judgment and helped me find my way.',
      firstName: 'David',
      service: 'Teen Support',
    },
  ];

  const coreValues = [
    { name: 'Joy', description: 'We believe in fostering happiness and positive growth.' },
    { name: 'Optimism', description: 'Every challenge is an opportunity for positive change.' },
    { name: 'Confidentiality', description: 'Your privacy is sacred and always protected.' },
    { name: 'Integrity', description: 'We uphold the highest ethical standards in our practice.' },
    { name: 'Inclusion', description: 'Everyone deserves compassionate care, without exception.' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-warm-cream via-off-white to-warm-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="heading-xl mb-6">
                You're Not Alone on This Journey
              </h1>
              <p className="body-lg mb-8">
                Professional, compassionate counselling for teens, youths, and families.
                We're here to support you every step of the way.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/book-appointment">
                  <Button variant="primary" className="w-full sm:w-auto">
                    Take the First Step
                  </Button>
                </Link>
                <Link href="/services">
                  <Button variant="ghost" className="w-full sm:w-auto">
                    Explore Our Services
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-gray-600 mt-6">
                Walk-in, phone, WhatsApp, and video consultations available.
              </p>
            </div>
            <div>
              <ImagePlaceholder
                description="Calm Counsellor Speaking with Teen/Parent"
                dimensions="400px"
                usageNotes="Use a soft-focused image showing a counsellor in gentle conversation with a teen or parent. Natural lighting, neutral background, emotionally safe atmosphere."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Service Highlights */}
      <section className="section-container bg-off-white">
        <SectionHeading
          title="We're Here to Support You"
          subtitle="Whether you're navigating teen challenges, family dynamics, or personal growth, we offer professional, compassionate care tailored to your needs."
          centered
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/services">
            <Button variant="secondary">View All Services</Button>
          </Link>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-container bg-warm-cream">
        <SectionHeading
          title="Our Core Values"
          subtitle="These principles guide everything we do."
          centered
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {coreValues.map((value, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 text-center shadow-calm hover:shadow-calm-lg transition-shadow duration-300"
            >
              <h3 className="font-heading font-semibold text-lg text-soft-gold mb-2">
                {value.name}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust & Professional Section */}
      <section className="section-container bg-off-white">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeading
            title="Professional Care You Can Trust"
            centered
          />
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p className="body-lg">
              Our licensed counsellors bring years of experience in adolescent psychology,
              family therapy, and mental health support. We understand the unique challenges
              facing teens and youths today.
            </p>
            <p className="body-md">
              With offices in Nigeria and Canada, we serve clients locally and internationally
              through secure, confidential online sessions. Your wellbeing and privacy are our highest priorities.
            </p>
          </div>
          <div className="mt-8">
            <Link href="/about">
              <Button variant="ghost">Learn More About Us</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="section-container bg-warm-sand">
        <SectionHeading
          title="Stories of Hope & Growth"
          subtitle="Hear from those we've had the privilege to support."
          centered
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              firstName={testimonial.firstName}
              service={testimonial.service}
            />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/testimonies">
            <Button variant="secondary">Read More Stories</Button>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-container bg-gradient-to-br from-soft-gold to-muted-coral text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="heading-lg text-white mb-6">
            Ready to Take the Next Step?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Booking an appointment is simple and confidential. Let's talk about how we can support you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book-appointment">
              <Button className="bg-white text-soft-gold hover:bg-off-white w-full sm:w-auto">
                Book an Appointment
              </Button>
            </Link>
            <Link href="/contact">
              <Button className="bg-transparent border-2 border-white text-white hover:bg-white/10 w-full sm:w-auto">
                Get in Touch
              </Button>
            </Link>
          </div>
          <p className="text-sm text-white/80 mt-6">
            All consultations are completely confidential.
          </p>
        </div>
      </section>
    </div>
  );
}
