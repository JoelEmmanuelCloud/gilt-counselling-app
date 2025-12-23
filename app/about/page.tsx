'use client';

import React from 'react';
import Link from 'next/link';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
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
      name: 'Dr. Sarah Johnson',
      title: 'Lead Counsellor & Clinical Psychologist',
      credentials: 'Ph.D. in Clinical Psychology, Licensed Family Therapist',
      bio: 'Dr. Johnson has over 15 years of experience working with teens, youths, and families. She specializes in adolescent psychology, anxiety disorders, and family systems therapy. Her warm, empathetic approach helps clients feel safe and supported throughout their healing journey.',
    },
    {
      name: 'Dr. Michael Chen',
      title: 'Consulting Psychologist',
      credentials: 'Ph.D. in Counseling Psychology, Certified Career Counselor',
      bio: 'Dr. Chen brings a decade of experience in career counseling and youth development. He is passionate about helping young people discover their strengths and navigate academic and career decisions with confidence. His approach combines evidence-based practices with genuine care for each individual.',
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
              <p className="body-lg">
                We are dedicated to providing professional, compassionate counselling that empowers
                teens, youths, and families to navigate life's challenges with confidence and hope.
              </p>
              <p className="body-md">
                Our team of licensed counsellors brings years of specialized experience in adolescent
                psychology, family therapy, and mental health support. We understand the unique pressures
                facing young people today, and we're here to provide the guidance and support needed to thrive.
              </p>
              <p className="body-md">
                Whether you're dealing with anxiety, family dynamics, academic stress, or simply seeking
                personal growth, we create a safe, non-judgmental space where healing and transformation can happen.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-container bg-warm-cream">
        <SectionHeading
          title="Meet Our Counsellors"
          subtitle="Experienced professionals dedicated to your wellbeing and growth."
          centered
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {team.map((member, index) => (
            <Card key={index} className="text-center md:text-left">
              <div className="mb-6">
                <ImagePlaceholder
                  description={`Professional Headshot: ${member.name}`}
                  dimensions="300px"
                  usageNotes="Neutral background, soft lighting, calm expression, professional attire. Square or portrait orientation."
                  className="mx-auto md:mx-0"
                />
              </div>
              <h3 className="heading-sm mb-2">{member.name}</h3>
              <p className="text-soft-gold font-semibold mb-2">{member.title}</p>
              <p className="text-sm text-gray-600 mb-4">{member.credentials}</p>
              <p className="text-gray-700 leading-relaxed">{member.bio}</p>
            </Card>
          ))}
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
              <p className="text-sm text-gray-600 leading-relaxed px-2">
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
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-container bg-gradient-to-br from-soft-gold to-muted-coral text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="heading-lg text-white mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            We're here to support you every step of the way. Let's talk about how we can help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book-appointment">
              <Button className="bg-white text-soft-gold hover:bg-off-white w-full sm:w-auto">
                Book an Appointment
              </Button>
            </Link>
            <Link href="/services">
              <Button className="bg-transparent border-2 border-white text-white hover:bg-white/10 w-full sm:w-auto">
                Explore Our Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
