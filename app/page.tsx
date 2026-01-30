'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import BookSessionButton from '@/components/BookSessionButton';
import HeroSlideshow from '@/components/HeroSlideshow';

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
      price: '₦375,000',
      description: 'For individual therapy sessions',
      features: [
        'Personalized treatment plan',
        'Equitable rate up to two hours',
        'All sessions include materials',
      ],
    },
    {
      name: 'Couples',
      price: '₦450,000',
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
      price: '₦600,000',
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
      <section className="relative min-h-[100svh] lg:min-h-screen overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/40 z-10"></div>
        <HeroSlideshow />

        {/* Hero Content */}
        <div className="relative z-20 min-h-[100svh] lg:min-h-screen flex items-center py-20 sm:py-28 md:py-32 lg:py-36 xl:py-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 w-full">
            <div className="max-w-xl sm:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
              <div className="inline-block bg-soft-terracotta/20 border border-soft-terracotta/50 text-white px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 lg:px-5 lg:py-2.5 rounded-md lg:rounded-lg mb-3 sm:mb-4 md:mb-5 lg:mb-6 text-[10px] sm:text-xs md:text-sm lg:text-base uppercase tracking-wider">
                Best counselling service in Port Harcourt
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-heading font-bold text-white mb-3 sm:mb-4 md:mb-5 lg:mb-6 xl:mb-8 leading-tight">
                Empowering Teens & Youths<br className="hidden xs:block" />
                for <span className="italic font-serif">Optimal</span><br className="hidden xs:block" />
                Development.
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/90 mb-5 sm:mb-6 md:mb-7 lg:mb-8 xl:mb-10 leading-relaxed max-w-lg lg:max-w-xl xl:max-w-2xl">
                Professional counselling and support services designed to help young people navigate life's challenges with confidence and hope.
              </p>
              <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 lg:gap-5">
                <BookSessionButton className="w-full xs:w-auto bg-soft-terracotta hover:bg-soft-terracotta/90 text-white px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-2.5 sm:py-3 lg:py-3.5 xl:py-4 uppercase text-[10px] sm:text-xs md:text-sm lg:text-base tracking-wide rounded-lg lg:rounded-xl transition-all duration-300 hover:shadow-lg">
                  Book Session
                </BookSessionButton>
                <Link href="/about">
                  <Button className="w-full xs:w-auto bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white/20 px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-2.5 sm:py-3 lg:py-3.5 xl:py-4 uppercase text-[10px] sm:text-xs md:text-sm lg:text-base tracking-wide rounded-lg lg:rounded-xl transition-all duration-300">
                    About US
                  </Button>
                </Link>
              </div>
              {/* Slider Dots */}
              <div className="flex gap-2 lg:gap-3 mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-14">
                <div className="w-2 h-2 lg:w-3 lg:h-3 bg-white rounded-full"></div>
                <div className="w-2 h-2 lg:w-3 lg:h-3 bg-white/40 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - Dark Background */}
      <section className="bg-gray-900 text-white py-10 sm:py-14 md:py-16 lg:py-20 xl:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-block bg-soft-terracotta/20 border border-soft-terracotta/50 text-soft-terracotta px-2.5 py-1 sm:px-3 sm:py-1.5 lg:px-4 lg:py-2 rounded-md lg:rounded-lg text-[10px] sm:text-xs lg:text-sm uppercase tracking-wider mb-3 sm:mb-4 lg:mb-5">
                Discover a Process
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-heading font-bold mb-4 sm:mb-5 lg:mb-6 xl:mb-8 leading-tight">
                Benefits of psychological<br className="hidden sm:block" />therapy by an expert.
              </h2>
              <p className="text-gray-300 mb-6 sm:mb-7 lg:mb-8 xl:mb-10 leading-relaxed text-sm sm:text-base lg:text-lg xl:text-xl">
                Our experienced counsellors provide a safe, non-judgmental space to help you navigate life's challenges. Through evidence-based therapeutic approaches, we empower individuals, couples, and families to build resilience, strengthen relationships, and achieve lasting wellbeing.
              </p>
              <div className="space-y-3 sm:space-y-4 lg:space-y-5">
                <div className="flex justify-between items-center border-b border-gray-700 pb-2 sm:pb-3 lg:pb-4">
                  <span className="text-gray-300 text-sm sm:text-base lg:text-lg">Family</span>
                  <span className="text-soft-terracotta font-semibold text-sm sm:text-base lg:text-lg">90%</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-700 pb-2 sm:pb-3 lg:pb-4">
                  <span className="text-gray-300 text-sm sm:text-base lg:text-lg">Marriage & Love</span>
                  <span className="text-soft-terracotta font-semibold text-sm sm:text-base lg:text-lg">80%</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-700 pb-2 sm:pb-3 lg:pb-4">
                  <span className="text-gray-300 text-sm sm:text-base lg:text-lg">Life Style</span>
                  <span className="text-soft-terracotta font-semibold text-sm sm:text-base lg:text-lg">85%</span>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[500px] rounded-lg lg:rounded-xl xl:rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/teaching.jpeg"
                alt="Counsellor in a therapy session with a client"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-10 sm:py-14 md:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 lg:px-8 xl:px-12 bg-warm-cream">
        <div className="max-w-6xl xl:max-w-7xl mx-auto text-center mb-8 sm:mb-10 lg:mb-12 xl:mb-16">
          <div className="inline-block bg-soft-terracotta/10 text-soft-terracotta px-3 py-1.5 sm:px-4 sm:py-2 lg:px-5 lg:py-2.5 rounded-full text-[10px] sm:text-xs lg:text-sm uppercase tracking-wider mb-3 sm:mb-4 lg:mb-5">
            Consultation Prices
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-heading font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
            Simple prices, flexible options,<br className="hidden sm:block" />
            & nothing hidden.
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 xl:gap-10 max-w-6xl xl:max-w-7xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-lg lg:rounded-xl xl:rounded-2xl p-5 sm:p-6 lg:p-8 xl:p-10 ${
                plan.highlighted
                  ? 'bg-soft-terracotta text-gray-900 shadow-xl sm:scale-105 lg:scale-110'
                  : 'bg-white shadow-lg'
              } transition-all duration-300 hover:shadow-2xl`}
            >
              <h3 className={`text-lg sm:text-xl lg:text-2xl font-heading font-bold mb-2 lg:mb-3 ${plan.highlighted ? 'text-gray-900' : 'text-gray-900'}`}>
                {plan.name}
              </h3>
              <div className="mb-4 sm:mb-5 lg:mb-6 xl:mb-8">
                <span className={`text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold ${plan.highlighted ? 'text-gray-900' : 'text-soft-terracotta'}`}>
                  {plan.price}
                </span>
              </div>
              <ul className="space-y-2 sm:space-y-3 lg:space-y-4 mb-6 sm:mb-7 lg:mb-8 xl:mb-10">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 sm:gap-3">
                    <svg
                      className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mt-0.5 flex-shrink-0 ${plan.highlighted ? 'text-gray-900' : 'text-soft-terracotta'}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={`text-xs sm:text-sm lg:text-base ${plan.highlighted ? 'text-gray-700' : 'text-gray-600'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <Link href="/book-appointment">
                <Button
                  className={`w-full uppercase text-[10px] sm:text-xs lg:text-sm tracking-wide py-2.5 sm:py-3 lg:py-3.5 rounded-lg lg:rounded-xl ${
                    plan.highlighted
                      ? 'bg-white text-soft-terracotta hover:bg-white hover:text-soft-terracotta'
                      : ''
                  }`}
                >
                  Get Started
                </Button>
              </Link>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-600 mt-6 sm:mt-8 lg:mt-10 text-[10px] sm:text-xs lg:text-sm">
          *Hourly pricing for sessions on an equitable basis
        </p>
      </section>

      {/* How Can I Help You & Call for Consultation Section */}
      <section className="py-10 sm:py-14 md:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 lg:px-8 xl:px-12 bg-white">
        <div className="max-w-6xl xl:max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 xl:gap-10">
          {/* How can I help you */}
          <div className="bg-warm-cream rounded-lg lg:rounded-xl xl:rounded-2xl p-5 sm:p-6 lg:p-8 xl:p-10">
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-heading font-bold text-gray-900 mb-4 sm:mb-5 lg:mb-6">
              How can I help you?
            </h2>
            <p className="text-gray-600 mb-4 sm:mb-5 lg:mb-6 text-sm sm:text-base lg:text-lg">
              If you're experiencing any kind of mental illness or problem in relations.
            </p>
            <ul className="space-y-2 sm:space-y-3 lg:space-y-4 mb-5 sm:mb-6 lg:mb-8">
              {helpOptions.map((option, index) => (
                <li key={index} className="flex items-center gap-2 sm:gap-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-soft-terracotta flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 text-sm sm:text-base lg:text-lg">{option}</span>
                </li>
              ))}
            </ul>
            <Link href="/services">
              <Button className="uppercase text-[10px] sm:text-xs lg:text-sm tracking-wide py-2.5 sm:py-3 lg:py-3.5 px-5 sm:px-6 lg:px-8 rounded-lg lg:rounded-xl">
                Explore Programs
              </Button>
            </Link>
          </div>

          {/* Call for Consultation */}
          <div className="bg-soft-terracotta text-gray-900 rounded-lg lg:rounded-xl xl:rounded-2xl p-5 sm:p-6 lg:p-8 xl:p-10">
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-heading font-bold mb-3 sm:mb-4 lg:mb-5">
              Call for Consultation
            </h2>
            <p className="text-base sm:text-lg lg:text-xl mb-4 sm:mb-5 lg:mb-6 text-gray-800">
              30 minutes free for first session. <Link href="/terms" className="underline font-semibold">T&C Apply</Link>
            </p>
            <div className="bg-gray-900/10 backdrop-blur-sm rounded-lg lg:rounded-xl p-4 sm:p-5 lg:p-6 xl:p-8 mb-4 sm:mb-5 lg:mb-6">
              <div className="flex items-center gap-3 sm:gap-4 lg:gap-5">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 bg-gray-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[10px] sm:text-xs lg:text-sm text-gray-700 uppercase tracking-wide font-semibold">Dial Now</div>
                  <a href="tel:+2348033094050" className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold hover:opacity-80 transition-opacity">
                    +234 803 309 4050
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Gilt Counselling Consult */}
      <section className="py-10 sm:py-14 md:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 lg:px-8 xl:px-12 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-center max-w-6xl xl:max-w-7xl mx-auto">
          <div className="order-2 lg:order-1 relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] xl:h-[600px] rounded-lg lg:rounded-xl xl:rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/images/teens.jpg"
              alt="Mother with two teenage sons sitting together on a swing"
              fill
              className="object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <div className="inline-block bg-soft-terracotta/10 text-soft-terracotta px-3 py-1.5 sm:px-4 sm:py-2 lg:px-5 lg:py-2.5 rounded-full text-[10px] sm:text-xs lg:text-sm uppercase tracking-wider mb-3 sm:mb-4 lg:mb-5">
              About Us
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-heading font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-5 xl:mb-6 leading-tight">
              Gilt Counselling Consult –<br className="hidden sm:block" />
              Empowering <span className="italic font-serif">Teens & Youths</span><br className="hidden sm:block" />
              for Optimal Development
            </h2>
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 leading-relaxed mb-4 sm:mb-5 lg:mb-6">
              We provide professional, compassionate counselling services designed to help young people, families, and communities thrive. With offices in Nigeria and Canada, we offer comprehensive support across mental health, education, career development, and more.
            </p>
            <p className="text-xs sm:text-sm lg:text-base xl:text-lg text-gray-600 leading-relaxed mb-5 sm:mb-6 lg:mb-8 xl:mb-10">
              Our core values of Joy, Optimism, Confidentiality, Integrity, and Inclusion guide everything we do. Whether you're seeking individual counselling, family support, educational consulting, or organizational training, we're here to help you navigate life's challenges with confidence.
            </p>
            <div className="flex items-start gap-3 sm:gap-4 lg:gap-5 mb-5 sm:mb-6 lg:mb-8 xl:mb-10">
              <div className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-soft-terracotta font-serif leading-none">"</div>
              <div>
                <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-700 italic mb-2 sm:mb-3">
                  Empowering young people to discover their potential and thrive in all aspects of life.
                </p>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="h-0.5 w-8 sm:w-10 lg:w-12 bg-soft-terracotta"></div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm sm:text-base lg:text-lg">Gilt Counselling Consult</p>
                    <p className="text-[10px] sm:text-xs lg:text-sm text-gray-600">Professional Counselling Services</p>
                  </div>
                </div>
              </div>
            </div>
            <Link href="/about">
              <Button className="uppercase text-[10px] sm:text-xs lg:text-sm tracking-wide py-2.5 sm:py-3 lg:py-3.5 px-5 sm:px-6 lg:px-8 rounded-lg lg:rounded-xl">
                Learn More About Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials - Dark Background */}
      <section className="bg-gray-900 text-white py-10 sm:py-14 md:py-16 lg:py-20 xl:py-24">
        <div className="max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center">
          <div className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-soft-terracotta mb-4 sm:mb-5 lg:mb-6">"</div>
          <blockquote className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-heading italic mb-4 sm:mb-5 lg:mb-6 xl:mb-8 leading-relaxed">
            Gilt Counselling Consult transformed how I understand myself and gave me the confidence to pursue my dreams.
          </blockquote>
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="h-0.5 w-8 sm:w-10 lg:w-12 bg-soft-terracotta"></div>
            <div>
              <p className="font-semibold text-sm sm:text-base lg:text-lg">Client Testimonial</p>
              <p className="text-[10px] sm:text-xs lg:text-sm text-gray-400">Youth Counselling Program</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-10 sm:py-14 md:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 lg:px-8 xl:px-12 bg-warm-cream">
        <div className="max-w-6xl xl:max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-center">
            <div className="relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[500px] rounded-lg lg:rounded-xl xl:rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/tagline.jpg"
                alt="Counsellor teaching young people at a whiteboard session"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="inline-block bg-soft-terracotta/10 text-soft-terracotta px-3 py-1.5 sm:px-4 sm:py-2 lg:px-5 lg:py-2.5 rounded-full text-[10px] sm:text-xs lg:text-sm uppercase tracking-wider mb-3 sm:mb-4 lg:mb-5">
                The Process
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-heading font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-5 leading-tight">
                How your journey with us begins.
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5 sm:mb-6 lg:mb-8 text-sm sm:text-base lg:text-lg">
                We follow a structured yet flexible approach tailored to your unique needs. From your first consultation to ongoing support, every step is designed to help you feel heard, understood, and empowered to make meaningful changes in your life.
              </p>
              <div className="bg-white rounded-lg lg:rounded-xl p-4 sm:p-5 lg:p-6 xl:p-8 shadow-sm">
                <div className="flex items-start gap-3 sm:gap-4 lg:gap-5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-soft-terracotta rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-gray-900 mb-1 sm:mb-2 text-base sm:text-lg lg:text-xl">Personalized therapies</h3>
                    <p className="text-gray-600 text-xs sm:text-sm lg:text-base">
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
      <section className="bg-gray-900 text-white py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28">
        <div className="max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center">
          <div className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-soft-terracotta mb-4 sm:mb-5 lg:mb-6">"</div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-heading italic mb-4 sm:mb-5 lg:mb-6 xl:mb-8 leading-relaxed">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-xl mb-6 sm:mb-7 lg:mb-8 xl:mb-10 text-gray-300">
            Take the first step towards a healthier, happier life. Book your consultation today.
          </p>
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            <div className="h-0.5 w-8 sm:w-10 lg:w-12 bg-soft-terracotta"></div>
            <p className="text-[10px] sm:text-xs lg:text-sm text-gray-400">All consultations are completely confidential</p>
            <div className="h-0.5 w-8 sm:w-10 lg:w-12 bg-soft-terracotta"></div>
          </div>
          <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 lg:gap-5 justify-center">
            <Link href="/book-appointment">
              <Button className="bg-soft-terracotta text-white hover:bg-soft-terracotta/90 w-full xs:w-auto px-6 sm:px-8 lg:px-10 xl:px-12 py-2.5 sm:py-3 lg:py-3.5 xl:py-4 uppercase text-[10px] sm:text-xs lg:text-sm tracking-wide rounded-lg lg:rounded-xl transition-all duration-300 hover:shadow-lg">
                Book Session
              </Button>
            </Link>
            <Link href="/contact">
              <Button className="bg-transparent border-2 border-soft-terracotta text-soft-terracotta hover:bg-soft-terracotta/10 w-full xs:w-auto px-6 sm:px-8 lg:px-10 xl:px-12 py-2.5 sm:py-3 lg:py-3.5 xl:py-4 uppercase text-[10px] sm:text-xs lg:text-sm tracking-wide rounded-lg lg:rounded-xl transition-all duration-300">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
