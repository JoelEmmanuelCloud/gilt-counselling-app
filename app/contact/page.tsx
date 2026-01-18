'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission (this would connect to an API in production)
    alert('Thank you for reaching out. We will get back to you soon!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-off-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-warm-cream via-off-white to-warm-sand py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="heading-xl mb-6">Get in Touch</h1>
          <p className="body-lg">
            We're here to answer your questions and support you on your journey.
            Reach out however feels most comfortable for you.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Nigeria Office */}
          <Card variant="warm">
            <div className="flex items-start gap-3 mb-4">
              <svg className="w-6 h-6 text-soft-gold flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <h3 className="font-heading font-semibold text-xl text-gray-900 mb-2">Nigeria Office</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  88 Woji Road, Vineyard Building<br />
                  GRA Phase 2, Port Harcourt<br />
                  Rivers State, Nigeria
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 mb-4">
              <svg className="w-6 h-6 text-soft-gold flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                <p className="text-gray-700">
                  <a href="tel:+2348033094050" className="hover:text-soft-gold transition-colors">+234 803 309 4050</a><br />
                  <a href="tel:+2347065734165" className="hover:text-soft-gold transition-colors">+234 706 573 4165</a><br />
                  <a href="tel:+2348062115372" className="hover:text-soft-gold transition-colors">+234 806 211 5372</a>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-soft-gold flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">WhatsApp</h4>
                <p className="text-gray-700">Available for consultations and inquiries</p>
              </div>
            </div>
          </Card>

          {/* Canada Office */}
          <Card variant="warm">
            <div className="flex items-start gap-3 mb-4">
              <svg className="w-6 h-6 text-soft-gold flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <h3 className="font-heading font-semibold text-xl text-gray-900 mb-2">Canada Office</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  470 Front St W<br />
                  Toronto, Ontario M5V 0V6<br />
                  Canada
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-soft-gold flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Online Consultations</h4>
                <p className="text-gray-700">Secure video sessions available worldwide</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Office Hours */}
        <div className="max-w-2xl mx-auto mt-12">
          <Card className="text-center">
            <h3 className="font-heading font-semibold text-xl text-gray-900 mb-4">Office Hours</h3>
            <div className="space-y-2 text-gray-700">
              <p><span className="font-medium">Monday - Friday:</span> 9:00 AM - 5:00 PM</p>
              <p><span className="font-medium">Saturday:</span> 10:00 AM - 2:00 PM</p>
              <p><span className="font-medium">Sunday:</span> Closed</p>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Emergency consultations may be arranged outside regular hours. Please contact us to discuss.
            </p>
          </Card>
        </div>
      </section>

      {/* Office Photos */}
      <section className="section-container bg-warm-cream">
        <SectionHeading
          title="Our Space"
          subtitle="We've created a welcoming, comfortable environment where you can feel safe and at ease."
          centered
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=400&fit=crop"
              alt="Waiting Area - Nigeria Office"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=400&fit=crop"
              alt="Counselling Room - Nigeria Office"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&h=400&fit=crop"
              alt="Waiting Area - Canada Office"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1497215842964-222b430dc094?w=400&h=400&fit=crop"
              alt="Counselling Room - Canada Office"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-container bg-off-white">
        <div className="max-w-2xl mx-auto">
          <SectionHeading
            title="Send Us a Message"
            subtitle="Have a question or ready to book? Fill out the form below and we'll get back to you within 24 hours."
            centered
          />
          <Card>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="label">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="label">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="label">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input"
                  placeholder="+234 xxx xxx xxxx"
                />
              </div>

              <div>
                <label htmlFor="message" className="label">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="input"
                  placeholder="How can we support you?"
                  required
                />
              </div>

              <Button type="submit" variant="primary" className="w-full">
                Send Message
              </Button>

              <p className="text-sm text-gray-600 text-center mt-4">
                Your privacy is important to us. We will never share your information.
              </p>
            </form>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-4xl sm:text-5xl lg:text-6xl text-soft-terracotta mb-4 sm:mb-5 lg:mb-6">"</div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading italic mb-4 sm:mb-5 lg:mb-6 leading-relaxed">
            Prefer to Book Directly?
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-gray-300">
            Skip the form and schedule your appointment right away.
          </p>
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            <div className="h-0.5 w-8 sm:w-10 lg:w-12 bg-soft-terracotta"></div>
            <p className="text-xs sm:text-sm text-gray-400">We're here to help</p>
            <div className="h-0.5 w-8 sm:w-10 lg:w-12 bg-soft-terracotta"></div>
          </div>
          <Link href="/book-appointment">
            <Button className="bg-soft-terracotta text-white hover:bg-soft-terracotta/90 px-6 sm:px-8 py-2.5 sm:py-3 uppercase text-xs tracking-wide rounded-lg transition-all duration-300 hover:shadow-lg">
              Book an Appointment
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
