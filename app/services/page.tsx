'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SectionHeading from '@/components/ui/SectionHeading';
import ServiceCard from '@/components/ui/ServiceCard';
import Button from '@/components/ui/Button';

export default function Services() {
  const services = [
    {
      title: 'Mental Health & Emotional Wellness',
      description: 'Professional support for anxiety, depression, stress management, and emotional wellbeing. We create a safe space to process your feelings and develop healthy coping strategies.',
      details: {
        whoItsFor: 'Teens, youths, and adults experiencing emotional challenges',
        whatToExpect: '1-on-1 sessions focused on understanding and managing emotions',
        duration: '50-minute sessions, frequency based on individual needs',
      },
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      title: 'Educational Consulting',
      description: 'Expert guidance on educational planning, school selection, academic success strategies, and navigating educational systems effectively.',
      details: {
        whoItsFor: 'Students, parents, and families planning educational pathways',
        whatToExpect: 'Comprehensive assessment and personalized educational roadmap',
        duration: 'Ongoing consultation as needed throughout academic journey',
      },
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      title: 'School Counselling Consultation',
      description: 'Specialized counselling services for schools and educational institutions, including staff training, student support programs, and crisis intervention.',
      details: {
        whoItsFor: 'Schools, educational institutions, and administrators',
        whatToExpect: 'Comprehensive school counselling program development and implementation',
        duration: 'Customized based on institutional needs',
      },
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      title: 'Academic & Career Counselling',
      description: 'Navigate your academic journey and plan your career path with confidence. We help you discover your strengths, explore options, and make informed decisions.',
      details: {
        whoItsFor: 'Students and young professionals planning their future',
        whatToExpect: 'Career assessment, goal setting, and strategic planning',
        duration: 'Series of sessions tailored to your timeline',
      },
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
    },
    {
      title: 'Youth Counselling, Life Skills & Mentoring',
      description: 'Empower young people with essential life skills, resilience building, decision-making abilities, and mentorship for personal development.',
      details: {
        whoItsFor: 'Teens and youths seeking personal growth and life skills',
        whatToExpect: 'Interactive sessions focusing on practical skills and confidence building',
        duration: 'Flexible scheduling, individual or group formats available',
      },
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      title: 'Parenting & Special Needs Support',
      description: 'Comprehensive support for parents navigating the challenges of parenting, including specialized guidance for families with special needs children.',
      details: {
        whoItsFor: 'Parents, guardians, and families',
        whatToExpect: 'Practical strategies, emotional support, and resource connections',
        duration: 'Ongoing support tailored to family needs',
      },
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: 'Organizational Staff Training',
      description: 'Professional development and training programs for organizations, including mental health awareness, communication skills, and team building.',
      details: {
        whoItsFor: 'Organizations, businesses, and institutions',
        whatToExpect: 'Customized training programs and workshops',
        duration: 'Half-day, full-day, or multi-session programs',
      },
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'Group Therapy, Outreach & Advocacy',
      description: 'Community-based therapy sessions, outreach programs, mental health advocacy, and educational initiatives to support broader community wellbeing.',
      details: {
        whoItsFor: 'Community groups, schools, and organizations',
        whatToExpect: 'Facilitated group sessions and community programs',
        duration: 'Ongoing programs and one-time events',
      },
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: 'Online Counselling',
      description: 'Convenient and confidential counselling sessions from anywhere via secure video, phone, or WhatsApp. All the support you need, wherever you are.',
      details: {
        whoItsFor: 'Anyone preferring remote counselling or unable to attend in-person',
        whatToExpect: 'Same quality care as in-person sessions via secure platforms',
        duration: 'Flexible scheduling across time zones',
      },
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'Partnerships & More',
      description: 'We collaborate with schools, organizations, and community partners to expand mental health services and create meaningful impact in communities.',
      details: {
        whoItsFor: 'Organizations, schools, and institutions seeking partnerships',
        whatToExpect: 'Collaborative programs tailored to community needs',
        duration: 'Customized partnership arrangements',
      },
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-off-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-warm-cream via-off-white to-warm-sand py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="heading-xl mb-6">Our Services</h1>
          <p className="body-lg">
            Comprehensive counselling and consulting services designed to empower
            and support your journey toward growth and wellbeing.
          </p>
        </div>
      </section>

      {/* Optional Banner */}
      <section className="section-container">
        <div className="relative h-[300px] max-w-5xl mx-auto rounded-lg overflow-hidden">
          <Image
            src="/images/ourservice.jpg"
            alt="Counsellor holding client's hand during a session"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
            quality={60}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAIAAoDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJgA//9k="
            priority
          />
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-container bg-off-white">
        <SectionHeading
          title="How We Can Support You"
          subtitle="Each service is designed with care to address specific needs and provide meaningful support."
          centered
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      </section>

      {/* Service Details Section */}
      <section className="section-container bg-warm-cream">
        <SectionHeading
          title="What to Expect"
          subtitle="Every service is tailored to meet your unique needs and circumstances."
          centered
        />
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-calm">
            <h3 className="font-heading font-semibold text-lg text-soft-gold mb-3">First Session</h3>
            <p className="text-gray-700 leading-relaxed">
              Your first session is an opportunity to get to know each other. We'll discuss what brings you to counselling,
              your goals, and how we can best support you. There's no pressure—just a safe, welcoming conversation.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-calm">
            <h3 className="font-heading font-semibold text-lg text-soft-gold mb-3">Ongoing Support</h3>
            <p className="text-gray-700 leading-relaxed">
              Counselling is a journey, not a destination. We work at your pace, celebrating progress and navigating
              challenges together. The frequency and duration of sessions are flexible based on your needs.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-calm">
            <h3 className="font-heading font-semibold text-lg text-soft-gold mb-3">Complete Confidentiality</h3>
            <p className="text-gray-700 leading-relaxed">
              Everything you share is held in strict confidence. Your privacy is protected, and you can trust that
              this is a safe space to be open and honest.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-4xl sm:text-5xl lg:text-6xl text-soft-terracotta mb-4 sm:mb-5 lg:mb-6">"</div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading italic mb-4 sm:mb-5 lg:mb-6 leading-relaxed">
            Ready to Take the Next Step?
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-gray-300">
            Book a consultation to discuss which service would be the best fit for your needs.
          </p>
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            <div className="h-0.5 w-8 sm:w-10 lg:w-12 bg-soft-terracotta"></div>
            <p className="text-xs sm:text-sm text-gray-400">Not sure? We'll help you find the best fit</p>
            <div className="h-0.5 w-8 sm:w-10 lg:w-12 bg-soft-terracotta"></div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book-appointment">
              <Button className="bg-soft-terracotta text-white hover:bg-soft-terracotta/90 w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 uppercase text-xs tracking-wide rounded-lg transition-all duration-300 hover:shadow-lg">
                Book an Appointment
              </Button>
            </Link>
            <Link href="/contact">
              <Button className="bg-transparent border-2 border-soft-terracotta text-soft-terracotta hover:bg-soft-terracotta/10 w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 uppercase text-xs tracking-wide rounded-lg transition-all duration-300">
                Ask a Question
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
