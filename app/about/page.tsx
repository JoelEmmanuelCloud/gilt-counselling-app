'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
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

  const team = [
    {
      name: 'Prof (Mrs) Betty-Ruth Ngozi Iruloh',
      title: 'Consultant - Marital Counselling',
      image: '/images/PROF( MRS) BETTY-RUTH NGOZI IRULOR.jpeg',
    },
    {
      name: 'Dr Faith I. Barilera',
      title: 'Strategic Planner & Counselling Psychologist',
      image: '/images/Dr Faith I. Barilera.jpeg',
    },
    {
      name: 'Dr. Gideon Isukwem',
      title: 'Adolescent & Youth Psychologist',
      image: '/uploads/Dr. Gideon Isukwem.jpeg',
    },
    {
      name: 'Esther Ebifimoere Peters',
      title: 'Counsellor & Admin Officer',
      image: '/uploads/Esther Ebifimoere Peters.jpeg',
    },
    {
      name: 'Success Donald',
      title: 'Secretary',
      image: '/uploads/Success Donald.jpeg',
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
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-warm-cream via-off-white to-warm-sand py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="heading-xl mb-6">About Gilt Counselling Consult</h1>
          <p className="body-lg">
            Empowering teens and youths for optimal development through professional,
            compassionate counselling and support.
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="section-container">
        <div className="max-w-4xl mx-auto">
          <Card variant="warm" className="text-center">
            <h2 className="heading-md mb-6">Our Mission</h2>
            <div className="space-y-4 text-gray-700">
              <p className="body-lg text-justify">
                Empowering teens and youths for optimal development through professional,
                compassionate counselling and comprehensive support services.
              </p>
              <p className="body-md text-justify">
                At Gilt Counselling Consult, we are dedicated to providing high-quality mental health services,
                educational consulting, and youth development programs. With offices in Nigeria and Canada, we serve
                individuals, families, schools, and organizations with a commitment to excellence and care.
              </p>
              <p className="body-md text-justify">
                Whether you need mental health support, academic guidance, career counselling, or organizational training,
                we create a safe, confidential space where transformation and growth can happen.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Founder Section */}
      <section className="section-container bg-warm-cream">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative h-[350px] md:h-[400px] w-full max-w-[350px] mx-auto rounded-lg overflow-hidden">
              <Image
                src="/images/Dame Prof Chinelo Joy Ugwu.jpeg"
                alt="Dame Prof Chinelo Joy Ugwu - Founder & CEO"
                fill
                className="object-cover object-top"
              />
            </div>
            <div>
              <div className="inline-block bg-soft-terracotta/10 text-soft-terracotta px-3 py-1.5 rounded-full text-xs uppercase tracking-wider mb-3">
                Founder & CEO
              </div>
              <h2 className="heading-md mb-2">Dame Prof Chinelo Joy Ugwu</h2>
              <p className="text-soft-gold font-semibold mb-1">CEO, GILT COUNSELLING CONSULT</p>
              <p className="text-sm text-gray-600 mb-4">FCASSON, CPCN, MNAE, KSM</p>
              <p className="text-gray-700 leading-relaxed text-justify">
                Dame Prof Chinelo Joy Ugwu is the visionary founder and CEO of Gilt Counselling Consult. With extensive experience in counselling and youth development, she leads the organization with dedication to empowering teens and youths for optimal development through professional, compassionate support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-container bg-off-white">
        <SectionHeading
          title="Our Core Values"
          subtitle="These principles guide everything we do and shape the care we provide."
          centered
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {coreValues.map((value, index) => (
            <div key={index} className="text-center">
              <div className={`${value.color} text-white rounded-xl p-8 mb-4 min-h-[200px] flex flex-col justify-center`}>
                <h3 className="font-heading font-bold text-2xl mb-3">{value.name}</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed px-2 text-justify">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-container bg-warm-sand">
        <SectionHeading
          title="Why Choose Gilt Counselling?"
          subtitle="We combine professional excellence with genuine compassion for every person we serve."
          centered
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {whyChooseUs.map((item, index) => (
            <Card key={index}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 text-soft-gold">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-justify">{item.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-4xl sm:text-5xl lg:text-6xl text-soft-terracotta mb-4 sm:mb-5 lg:mb-6">"</div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading italic mb-4 sm:mb-5 lg:mb-6 leading-relaxed">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-gray-300">
            We're here to support you every step of the way. Let's talk about how we can help.
          </p>
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            <div className="h-0.5 w-8 sm:w-10 lg:w-12 bg-soft-terracotta"></div>
            <p className="text-xs sm:text-sm text-gray-400">Your journey starts here</p>
            <div className="h-0.5 w-8 sm:w-10 lg:w-12 bg-soft-terracotta"></div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book-appointment">
              <Button className="bg-soft-terracotta text-white hover:bg-soft-terracotta/90 w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 uppercase text-xs tracking-wide rounded-lg transition-all duration-300 hover:shadow-lg">
                Book an Appointment
              </Button>
            </Link>
            <Link href="/services">
              <Button className="bg-transparent border-2 border-soft-terracotta text-soft-terracotta hover:bg-soft-terracotta/10 w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 uppercase text-xs tracking-wide rounded-lg transition-all duration-300">
                Explore Our Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-container bg-warm-cream">
        <SectionHeading
          title="Our Dedicated Consultants and Professional Counsellors"
          subtitle="Experienced professionals dedicated to your wellbeing and growth."
          centered
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {team.map((member, index) => (
            <Card key={index} className="text-center">
              <div className="mb-6 relative h-[280px] w-[280px] mx-auto rounded-lg overflow-hidden">
                <Image
                  src={member.image}
                  alt={`${member.name} - Professional Headshot`}
                  fill
                  className="object-cover object-top"
                />
              </div>
              <h3 className="heading-sm mb-2">{member.name}</h3>
              <p className="text-soft-gold font-semibold">{member.title}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
