'use client';

import React from 'react';
import Link from 'next/link';

export default function Home() {
  const services = [
    'Mental Health & Emotional Wellness',
    'Educational Consulting',
    'School Counselling Consult',
    'Academic and Career Counselling',
    'Youth Counselling, Life Skills & Mentoring',
    'Parenting & Special Needs Support',
    'Organizational Staff Training',
    'Group Therapy, Outreach & Advocacy',
    'Online Counselling',
    'Partnerships and More'
  ];

  const values = [
    { name: 'Joy', color: 'bg-gilt-blue' },
    { name: 'Optimism', color: 'bg-gilt-green' },
    { name: 'Confidentiality', color: 'bg-gilt-orange' },
    { name: 'Integrity', color: 'bg-gilt-gold' },
    { name: 'Inclusion', color: 'bg-blue-900' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gilt-blue to-gilt-green text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">
                Empowering teens & youths for optimal development
              </h1>
              <p className="text-xl mb-8 text-white/90">
                Professional counselling and consulting services to help you achieve your full potential.
              </p>
              <div className="flex space-x-4">
                <Link
                  href="/book-appointment"
                  className="bg-gilt-gold text-white px-8 py-3 rounded-lg font-semibold hover:bg-gilt-orange transition"
                >
                  Book Appointment
                </Link>
                <Link
                  href="/services"
                  className="bg-white text-gilt-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  Our Services
                </Link>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 h-80 flex items-center justify-center">
              <p className="text-center text-white/70">[Hero Image Placeholder]</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Core Values</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {values.map((value, index) => (
              <div
                key={index}
                className={`${value.color} text-white px-6 py-3 rounded-lg font-semibold text-lg shadow-md`}
              >
                {value.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">Our Focus Areas</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            We provide comprehensive counselling and consulting services tailored to your needs.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition border-l-4 border-gilt-gold"
              >
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-gilt-blue flex-shrink-0 mt-1 mr-3"></div>
                  <h3 className="text-lg font-semibold text-gray-800">{service}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gilt-gold py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-white/90 mb-8 text-lg">
            Book your appointment today and take the first step towards optimal development.
          </p>
          <Link
            href="/book-appointment"
            className="inline-block bg-white text-gilt-gold px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Book an Appointment Now
          </Link>
        </div>
      </section>
    </div>
  );
}
