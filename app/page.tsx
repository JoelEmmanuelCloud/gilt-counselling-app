'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';

export default function Home() {
  const helpOptions = [
    'Family Problems',
    'Breakups',
    'Business Failure',
    'Stress Issues',
    'Online Sessions',
  ];

  const pricingPlans = [
    {
      name: 'Individual',
      price: '$250',
      description: 'For individual therapy sessions',
      features: [
        'Personalized treatment plan',
        'Equitable rate up to two hours',
        'All sessions include materials',
      ],
    },
    {
      name: 'Couples',
      price: '$300',
      period: 'Per session',
      description: 'For couples counseling',
      features: [
        'Relationship focused sessions',
        'Equitable rate up to two hours',
        'Offers Session and Counseling',
      ],
      highlighted: true,
    },
    {
      name: 'Business',
      price: '$400',
      period: 'Per session',
      description: 'For business coaching',
      features: [
        'Professional consultation',
        'Equitable rate up to two hours',
        'Helps business owners discover key',
      ],
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
      quote: 'I was struggling with anxiety and depression. Dr. Lopez helped me find hope and develop coping strategies that actually work.',
      firstName: 'David',
      service: 'Mental Health Support',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Full Width */}
      <section className="relative h-[600px] md:h-[700px] overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40 z-10"></div>
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1920&h=700&fit=crop"
            alt="Professional counseling session - person in consultation"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              <div className="inline-block bg-soft-terracotta/20 border border-soft-terracotta/50 text-white px-4 py-2 rounded mb-6 text-sm uppercase tracking-wider">
                Gilt Counselling Consult
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
                Empowering Teens & Youths<br />
                for <span className="italic font-serif">Optimal</span><br />
                Development.
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-xl">
                Professional counselling and support services designed to help young people navigate life's challenges with confidence and hope.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/book-appointment">
                  <Button className="w-full sm:w-auto bg-soft-terracotta hover:bg-soft-terracotta/90 text-white px-8 py-3 uppercase text-sm tracking-wide">
                    Book Session
                  </Button>
                </Link>
                <Link href="/about">
                  <Button className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white/20 px-8 py-3 uppercase text-sm tracking-wide">
                    About US
                  </Button>
                </Link>
              </div>
              {/* Slider Dots */}
              <div className="flex gap-2 mt-12">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <div className="w-2 h-2 bg-white/40 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - Dark Background */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-soft-terracotta/20 border border-soft-terracotta/50 text-soft-terracotta px-3 py-1 rounded text-xs uppercase tracking-wider mb-4">
                Discover a Process
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                Benefits of psychological<br />therapy by an expert.
              </h2>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris.
              </p>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-gray-700 pb-3">
                  <span className="text-gray-300">Family</span>
                  <span className="text-soft-terracotta font-semibold">90%</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-700 pb-3">
                  <span className="text-gray-300">Marriage & Love</span>
                  <span className="text-soft-terracotta font-semibold">80%</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-700 pb-3">
                  <span className="text-gray-300">Life Style</span>
                  <span className="text-soft-terracotta font-semibold">85%</span>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&h=400&fit=crop"
                alt="Professional therapist consultation session"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="section-container bg-warm-cream">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <div className="inline-block bg-soft-terracotta/10 text-soft-terracotta px-4 py-2 rounded-full text-sm uppercase tracking-wider mb-4">
            Consultation Prices
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
            Simple prices, flexible options,<br />
            & nothing hidden.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-lg p-8 ${
                plan.highlighted
                  ? 'bg-soft-terracotta text-gray-900 shadow-xl'
                  : 'bg-white shadow-lg'
              } transition-all duration-300 hover:shadow-2xl`}
            >
              <h3 className={`text-xl font-heading font-bold mb-2 ${plan.highlighted ? 'text-gray-900' : 'text-gray-900'}`}>
                {plan.name}
              </h3>
              <div className="mb-6">
                <span className={`text-4xl md:text-5xl font-bold ${plan.highlighted ? 'text-gray-900' : 'text-soft-terracotta'}`}>
                  {plan.price}
                </span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg
                      className={`w-5 h-5 mt-0.5 flex-shrink-0 ${plan.highlighted ? 'text-gray-900' : 'text-soft-terracotta'}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={`text-sm ${plan.highlighted ? 'text-gray-700' : 'text-gray-600'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <Link href="/book-appointment">
                <Button
                  className={`w-full uppercase text-sm tracking-wide ${
                    plan.highlighted
                      ? 'bg-white text-soft-terracotta hover:bg-gray-100 hover:text-soft-terracotta'
                      : ''
                  }`}
                >
                  Get Started
                </Button>
              </Link>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-600 mt-8 text-sm">
          *Hourly pricing for sessions on an equitable basis
        </p>
      </section>

      {/* How Can I Help You & Call for Consultation Section */}
      <section className="section-container bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* How can I help you */}
          <div className="bg-warm-cream rounded-lg p-8">
            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">
              How can I help you?
            </h2>
            <p className="text-gray-600 mb-6">
              If you're experiencing any kind of mental illness or problem in relations.
            </p>
            <ul className="space-y-3 mb-6">
              {helpOptions.map((option, index) => (
                <li key={index} className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-soft-terracotta flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">{option}</span>
                </li>
              ))}
            </ul>
            <Link href="/services">
              <Button className="uppercase text-sm tracking-wide">
                Explore Programs
              </Button>
            </Link>
          </div>

          {/* Call for Consultation */}
          <div className="bg-soft-terracotta text-gray-900 rounded-lg p-8">
            <h2 className="text-2xl font-heading font-bold mb-4">
              Call for Consultation
            </h2>
            <p className="text-lg mb-6 text-gray-800">
              30 minutes free for first session. <Link href="/terms" className="underline font-semibold">T&C Apply</Link>
            </p>
            <div className="bg-gray-900/10 backdrop-blur-sm rounded-lg p-6 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-900/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-gray-700 uppercase tracking-wide font-semibold">Dial Now</div>
                  <a href="tel:+2348033094050" className="text-2xl font-bold hover:opacity-80 transition-opacity">
                    +234 803 309 4050
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Gilt Counselling Consult */}
      <section className="section-container bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="order-2 lg:order-1 relative h-[500px] rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=500&fit=crop"
              alt="Gilt Counselling Consult - Professional counselling environment"
              fill
              className="object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <div className="inline-block bg-soft-terracotta/10 text-soft-terracotta px-4 py-2 rounded-full text-xs uppercase tracking-wider mb-4">
              About Us
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              Gilt Counselling Consult –<br />
              Empowering <span className="italic font-serif">Teens & Youths</span><br />
              for Optimal Development
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              We provide professional, compassionate counselling services designed to help young people, families, and communities thrive. With offices in Nigeria and Canada, we offer comprehensive support across mental health, education, career development, and more.
            </p>
            <p className="text-base text-gray-600 leading-relaxed mb-8">
              Our core values of Joy, Optimism, Confidentiality, Integrity, and Inclusion guide everything we do. Whether you're seeking individual counselling, family support, educational consulting, or organizational training, we're here to help you navigate life's challenges with confidence.
            </p>
            <div className="flex items-start gap-4 mb-8">
              <div className="text-6xl text-soft-terracotta font-serif">"</div>
              <div>
                <p className="text-lg text-gray-700 italic mb-2">
                  Empowering young people to discover their potential and thrive in all aspects of life.
                </p>
                <div className="flex items-center gap-2">
                  <div className="h-0.5 w-12 bg-soft-terracotta"></div>
                  <div>
                    <p className="font-semibold text-gray-900">Gilt Counselling Consult</p>
                    <p className="text-sm text-gray-600">Professional Counselling Services</p>
                  </div>
                </div>
              </div>
            </div>
            <Link href="/about">
              <Button className="uppercase text-sm tracking-wide">
                Learn More About Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials - Dark Background */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl text-soft-terracotta mb-6">"</div>
          <blockquote className="text-2xl md:text-3xl font-heading italic mb-6">
            Gilt Counselling Consult transformed how I understand myself and gave me the confidence to pursue my dreams.
          </blockquote>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-0.5 w-12 bg-soft-terracotta"></div>
            <div>
              <p className="font-semibold">Client Testimonial</p>
              <p className="text-sm text-gray-400">Youth Counselling Program</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-container bg-warm-cream">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=600&h=400&fit=crop"
                alt="Professional counseling session"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="inline-block bg-soft-terracotta/10 text-soft-terracotta px-4 py-2 rounded-full text-xs uppercase tracking-wider mb-4">
                The Process
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
                An amazing tagline for your process...
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris sed ut perspiciatis unde omnis iste natus error sit.
              </p>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-soft-terracotta rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-gray-900 mb-2">Personalized therapies</h3>
                    <p className="text-gray-600 text-sm">
                      When you are in distressed or stressful period in life you need a supportive therapist. What can you accomplish with support and understanding.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-soft-terracotta to-muted-coral text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Take the first step towards a healthier, happier life. Book your consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book-appointment">
              <Button className="bg-white text-soft-terracotta hover:bg-gray-100 hover:text-soft-terracotta w-full sm:w-auto px-8 py-3 uppercase text-sm tracking-wide">
                Book Session
              </Button>
            </Link>
            <Link href="/contact">
              <Button className="bg-transparent border-2 border-white text-white hover:bg-white/10 w-full sm:w-auto px-8 py-3 uppercase text-sm tracking-wide">
                Contact Us
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
