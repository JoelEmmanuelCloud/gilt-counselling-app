'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import BookSessionButton from '@/components/BookSessionButton';
import HeroSlideshow, { heroImages } from '@/components/HeroSlideshow';
import FadeUp from '@/components/FadeUp';
import LatestActivity from '@/components/home/LatestActivity';
import SchoolsSpotlight from '@/components/home/SchoolsSpotlight';
import TestimonialHighlights from '@/components/home/TestimonialHighlights';
import MomentsStrip from '@/components/home/MomentsStrip';
import ApproachImages from '@/components/home/ApproachImages';
import { buildActivity } from '@/components/home/activity';
import { usePublishedEntries } from '@/components/stories/usePublishedEntries';

type HeadingLine = string | { before?: string; italic: string; after?: string };

interface SlideContent {
  badge: string;
  lines: HeadingLine[];
  sub: string;
}

const heroContent: SlideContent[] = [
  {
    badge: 'Best Counselling Service in Port Harcourt',
    lines: [
      'Empowering Teens & Youths',
      { before: 'for ', italic: 'Optimal' },
      'Development.',
    ],
    sub: "Professional counselling and support services designed to help young people navigate life's challenges with confidence and hope.",
  },
  {
    badge: 'Safe · Confidential · Compassionate',
    lines: [
      'A Safe Space',
      { before: 'to ', italic: 'Heal' },
      'and Grow.',
    ],
    sub: 'We offer a warm, non-judgmental environment where you can be truly heard and begin your journey to lasting emotional wellness.',
  },
  {
    badge: 'Community Outreach · Education',
    lines: [
      'Reaching Communities',
      { italic: 'Across' },
      'Nigeria.',
    ],
    sub: 'From schools to churches, we bring professional counselling and mental health awareness to every corner of our community.',
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { entries, loading: entriesLoading } = usePublishedEntries();
  const activity = useMemo(() => buildActivity(entries), [entries]);
  const clientTestimonials = useMemo(
    () => entries.filter((entry) => entry.category === 'client' && entry.quote).slice(0, 6),
    [entries]
  );

  return (
    <div className="min-h-screen">

      
      <section className="relative min-h-[100svh] lg:min-h-screen overflow-hidden">
        
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/10 z-10" />
        <HeroSlideshow onSlideChange={setCurrentSlide} />

        <div className="relative z-20 min-h-[100svh] lg:min-h-screen flex items-center py-20 sm:py-28 md:py-32 lg:py-36 xl:py-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 w-full">
            <div className="max-w-xl sm:max-w-2xl lg:max-w-3xl xl:max-w-4xl">

              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  exit={{ opacity: 0, y: -18, filter: 'blur(4px)', transition: { duration: 0.28, ease: 'easeIn' } }}
                >
                  
                  <motion.div
                    initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="eyebrow inline-block text-soft-terracotta mb-3 sm:mb-4 md:mb-5 lg:mb-6"
                  >
                    {heroContent[currentSlide].badge}
                  </motion.div>

                  
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-heading font-bold text-white mb-3 sm:mb-4 md:mb-5 lg:mb-6 xl:mb-8 leading-tight">
                    {heroContent[currentSlide].lines.map((line, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 0.65, delay: 0.18 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}
                        className="block"
                      >
                        {typeof line === 'string' ? line : (
                          <>
                            {line.before}
                            <span className="text-soft-terracotta">{line.italic}</span>
                            {line.after}
                          </>
                        )}
                      </motion.span>
                    ))}
                  </h1>

                  
                  <motion.p
                    initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.6, delay: 0.62, ease: [0.22, 1, 0.36, 1] }}
                    className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/90 mb-5 sm:mb-6 md:mb-7 lg:mb-8 xl:mb-10 leading-relaxed max-w-lg lg:max-w-xl xl:max-w-2xl"
                  >
                    {heroContent[currentSlide].sub}
                  </motion.p>
                </motion.div>
              </AnimatePresence>

              
              <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 lg:gap-5">
                <BookSessionButton className="w-full xs:w-auto btn-cta px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-3 lg:py-3.5 xl:py-4 uppercase text-xs md:text-sm lg:text-base tracking-wide rounded-lg lg:rounded-lg">
                  Book Session
                </BookSessionButton>
                <Link href="/services">
                  <Button className="w-full xs:w-auto bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white/25 px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-3 lg:py-3.5 xl:py-4 uppercase text-xs md:text-sm lg:text-base tracking-wide rounded-lg lg:rounded-lg transition-all duration-300">
                    Explore Our Services
                  </Button>
                </Link>
              </div>

              
              <div className="flex gap-2 lg:gap-3 mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-14">
                {heroImages.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 lg:h-2 rounded-full transition-all duration-500 ${
                      i === currentSlide ? 'bg-white w-6 lg:w-8' : 'bg-white/40 w-2 lg:w-3'
                    }`}
                  />
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      <LatestActivity items={activity} loading={entriesLoading} />

      <section className="bg-gray-900 text-white py-10 sm:py-14 md:py-16 lg:py-20 xl:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-center">
            <FadeUp className="order-2 lg:order-1">
              <div className="eyebrow text-gilt-gold mb-3 sm:mb-4 lg:mb-5">
                Our Approach
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-heading font-bold mb-4 sm:mb-5 lg:mb-6 xl:mb-8 leading-tight">
                Benefits of psychological<br />therapy <span className="text-accent-light">by an expert.</span>
              </h2>
              <p className="text-gray-300 mb-6 sm:mb-7 lg:mb-8 xl:mb-10 leading-relaxed text-sm sm:text-base lg:text-lg xl:text-xl text-left">
                Our experienced counsellors provide a safe, non-judgmental space to help you navigate life's challenges. Through evidence-based therapeutic approaches, we empower individuals, couples, and families to build resilience, strengthen relationships, and achieve lasting wellbeing. From your first consultation to ongoing support, every step is tailored to you so that you feel heard, understood, and empowered to make meaningful changes.
              </p>
              <div className="space-y-3 sm:space-y-4 lg:space-y-5">
                {['Family', 'Marriage & Love', 'Life Style'].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.12, ease: 'easeOut' }}
                    className="flex items-center gap-3 border-b border-gray-700 pb-2 sm:pb-3 lg:pb-4"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-soft-terracotta flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-300 text-sm sm:text-base lg:text-lg">{item}</span>
                  </motion.div>
                ))}
              </div>
            </FadeUp>
            <FadeUp delay={0.15} className="order-1 lg:order-2 relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[500px] rounded-lg lg:rounded-lg xl:rounded-lg overflow-hidden shadow-md">
              <ApproachImages />
            </FadeUp>
          </div>
        </div>
      </section>

      

      

      
      <section className="py-10 sm:py-14 md:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 lg:px-8 xl:px-12 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-center max-w-6xl xl:max-w-7xl mx-auto">
          <FadeUp delay={0.1} className="order-2 lg:order-1 relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] xl:h-[600px] rounded-lg lg:rounded-lg xl:rounded-lg overflow-hidden shadow-md">
            <Image
              src="/images/teens.jpg"
              alt="Mother with two teenage sons sitting together on a swing"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={60}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAIAAoDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJgA//9k="
              loading="lazy"
            />
          </FadeUp>
          <FadeUp className="order-1 lg:order-2">
            <div className="eyebrow text-gilt-gold-strong mb-3 sm:mb-4 lg:mb-5">
              We Care
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-heading font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-5 xl:mb-6 leading-tight">
              Gilt Counselling Consult –<br className="hidden sm:block" />
              <span className="text-accent">Empowering Teens & Youths</span><br className="hidden sm:block" />
              {' '}for Optimal Development
            </h2>
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 leading-relaxed mb-4 sm:mb-5 lg:mb-6 text-left">
              We provide professional, compassionate counselling services designed to help young people, families, and communities thrive. With offices in Nigeria and Canada, we offer comprehensive support across mental health, education, career development, and more.
            </p>
            <p className="text-xs sm:text-sm lg:text-base xl:text-lg text-gray-600 leading-relaxed mb-5 sm:mb-6 lg:mb-8 xl:mb-10 text-left">
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
                    <p className="text-xs lg:text-sm text-gray-600">Professional Counselling Services</p>
                  </div>
                </div>
              </div>
            </div>
            <Link href="/about">
              <Button className="btn-cta uppercase text-xs lg:text-sm tracking-wide py-3 lg:py-3.5 px-5 sm:px-6 lg:px-8 rounded-lg lg:rounded-lg">
                Learn More About Us
              </Button>
            </Link>
          </FadeUp>
        </div>
      </section>

      
      <SchoolsSpotlight />

      <TestimonialHighlights testimonials={clientTestimonials} />

      <MomentsStrip items={activity} />

      <section className="panel-gold py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28">
        <FadeUp distance={30}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="eyebrow mb-4">All consultations are completely confidential</p>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-heading font-semibold tracking-tight mb-4 sm:mb-5 lg:mb-6 xl:mb-8 leading-tight">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-xl mb-6 sm:mb-7 lg:mb-8 xl:mb-10 text-gray-900/85">
              Take the first step towards a healthier, happier life. Book your consultation today.
            </p>
            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 lg:gap-5">
              <Link href="/book-appointment">
                <Button className="bg-white text-gray-900 hover:bg-gray-100 shadow-sm w-full xs:w-auto px-6 sm:px-8 lg:px-10 xl:px-12 py-3 lg:py-3.5 xl:py-4 rounded-lg lg:rounded-lg text-sm font-semibold transition-colors duration-150">
                  Book Session
                </Button>
              </Link>
              <Link href="/contact">
                <Button className="bg-transparent border border-gray-900 text-gray-900 hover:bg-gray-900/5 w-full xs:w-auto px-6 sm:px-8 lg:px-10 xl:px-12 py-3 lg:py-3.5 xl:py-4 rounded-lg lg:rounded-lg text-sm font-semibold transition-colors duration-150">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </FadeUp>
      </section>

    </div>
  );
}
