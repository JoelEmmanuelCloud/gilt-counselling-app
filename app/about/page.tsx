'use client';

import React from 'react';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import TeamSection from '@/components/team/TeamSection';
import Button from '@/components/ui/Button';

export default function About() {
  const coreValues = [
    {
      name: 'Joy',
      description: 'We believe in fostering happiness and positive growth in every interaction.',
      color: 'bg-soft-gold',
    },
    {
      name: 'Optimism',
      description: 'Every challenge is an opportunity for positive change and growth.',
      color: 'bg-muted-teal',
    },
    {
      name: 'Confidentiality',
      description: 'Your privacy is sacred and always protected in everything we do.',
      color: 'bg-olive-green',
    },
    {
      name: 'Integrity',
      description: 'We uphold the highest ethical standards in our practice and relationships.',
      color: 'bg-muted-coral',
    },
    {
      name: 'Inclusion',
      description: 'Everyone deserves compassionate care, without exception or judgment.',
      color: 'bg-gentle-blue-grey',
    },
  ];

  const whyChooseUs = [
    {
      title: 'Professional Excellence',
      description: 'Our licensed counsellors bring years of specialized training in adolescent psychology, family therapy, and mental health support.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
    },
    {
      title: 'Personalized Care',
      description: 'Every person\'s journey is unique. We tailor our approach to meet your specific needs, goals, and circumstances.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      title: 'Safe & Confidential',
      description: 'We provide a judgment-free space where you can explore your thoughts and feelings with complete privacy and trust.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
    },
    {
      title: 'Accessible Support',
      description: 'With offices in Nigeria and Canada, we offer in-person, phone, WhatsApp, and secure video consultations.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-off-white">

      <PageHeader
        eyebrow="About us"
        title="About Gilt Counselling Consult"
        description="Empowering teens and youths for optimal development through professional, compassionate counselling and support."
        image={{ src: '/images/DSC_9730.jpg', alt: 'Gilt counsellors and young people holding hands around a table in the counselling office' }}
      />

      <section className="section-container">
        <div className="max-w-4xl mx-auto">
          <Card variant="warm" className="text-center">
            <h2 className="heading-md mb-6">Our Mission</h2>
            <div className="space-y-4 text-gray-700">
              <p className="body-lg text-left">
                Empowering teens and youths for optimal development through professional,
                compassionate counselling and comprehensive support services.
              </p>
              <p className="body-md text-left">
                At Gilt Counselling Consult, we are dedicated to providing high-quality mental health services,
                educational consulting, and youth development programs. With offices in Nigeria and Canada, we serve
                individuals, families, schools, and organizations with a commitment to excellence and care.
              </p>
              <p className="body-md text-left">
                Whether you need mental health support, academic guidance, career counselling, or organizational training,
                we create a safe, confidential space where transformation and growth can happen.
              </p>
            </div>
          </Card>
        </div>
      </section>

      <TeamSection />

      <section className="section-container bg-warm-cream">
        <SectionHeading
          title="Our Core Values"
          subtitle="These principles guide everything we do and shape the care we provide."
          centered
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
          {coreValues.map((value, index) => (
            <div key={index} className="text-center">
              <div className={`${value.color} text-white rounded-lg p-4 sm:p-6 lg:p-8 xl:p-10 mb-3 sm:mb-4 min-h-[130px] sm:min-h-[160px] lg:min-h-[200px] xl:min-h-[240px] flex flex-col justify-center`}>
                <h3 className="font-heading font-bold text-base sm:text-xl lg:text-2xl mb-2 sm:mb-3">{value.name}</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed px-2 xl:px-4 text-left">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-container bg-off-white">
        <SectionHeading
          title="Why Choose Gilt Counselling?"
          subtitle="We combine professional excellence with genuine compassion for every person we serve."
          centered
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
          {whyChooseUs.map((item, index) => (
            <Card key={index}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 text-soft-gold">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-left">{item.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="section-container bg-warm-cream">
        <SectionHeading
          title="See Our Work in Action"
          subtitle="Our impact reaches beyond the counselling room into schools, communities, and the media."
          centered
        />
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {[
            {
              href: '/outreach',
              eyebrow: 'Outreach',
              title: 'Schools & Community Outreach',
              text: 'Emotional Intelligence sessions in secondary schools across Port Harcourt, plus workshops and donations in our community.',
            },
            {
              href: '/news',
              eyebrow: 'News & Media',
              title: 'Media, Events & Milestones',
              text: 'Radio and television features, conferences, awards, and the programmes that mark our journey.',
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group card flex flex-col justify-between transition-colors duration-150 hover:border-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
            >
              <div>
                <p className="eyebrow mb-3 text-gray-600">{item.eyebrow}</p>
                <h3 className="heading-sm mb-2">{item.title}</h3>
                <p className="text-gray-700 leading-relaxed">{item.text}</p>
              </div>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-gray-900 underline decoration-soft-terracotta decoration-2 underline-offset-4 group-hover:decoration-gray-900">
                Explore {item.eyebrow}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="panel-gold py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow mb-4">Your journey starts here</p>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-semibold tracking-tight mb-4 sm:mb-5 lg:mb-6 leading-tight">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-gray-900/85">
            We're here to support you every step of the way. Let's talk about how we can help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/book-appointment">
              <Button className="bg-white text-gray-900 hover:bg-gray-100 shadow-sm w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg text-sm font-semibold transition-colors duration-150">
                Book an Appointment
              </Button>
            </Link>
            <Link href="/services">
              <Button className="bg-transparent border border-gray-900 text-gray-900 hover:bg-gray-900/5 w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg text-sm font-semibold transition-colors duration-150">
                Explore Our Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}