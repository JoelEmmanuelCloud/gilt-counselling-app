'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SectionHeading from '@/components/ui/SectionHeading';
import TestimonialCard from '@/components/ui/TestimonialCard';
import Button from '@/components/ui/Button';

export default function TestimoniesPage() {
  const testimonials = [
    {
      quote: 'The counselling sessions helped me understand myself better and gave me tools to manage my emotions. I feel more confident and hopeful about the future.',
      firstName: 'Sarah',
      service: 'Individual Counselling',
      date: 'November 2025',
    },
    {
      quote: 'Our family is communicating better than we have in years. The sessions provided a safe space for all of us to express ourselves and heal together.',
      firstName: 'Michael',
      service: 'Family Counselling',
      date: 'October 2025',
    },
    {
      quote: 'I was struggling with school stress and anxiety. The counselor listened without judgment and helped me find healthy coping strategies that actually work.',
      firstName: 'David',
      service: 'Teen Support',
      date: 'December 2025',
    },
    {
      quote: 'After years of feeling lost, I finally found someone who understood what I was going through. The support has been life-changing.',
      firstName: 'Grace',
      service: 'Mental Health Support',
      date: 'September 2025',
    },
    {
      quote: 'The parenting sessions gave us practical tools and helped us understand our child better. We feel equipped to support them through their challenges.',
      firstName: 'Emmanuel',
      service: 'Parenting Support',
      date: 'November 2025',
    },
    {
      quote: 'I learned so much about myself through these sessions. The counselor created such a warm, accepting environment that made it easy to open up.',
      firstName: 'Joy',
      service: 'Individual Counselling',
      date: 'October 2025',
    },
    {
      quote: 'Our teen was going through a difficult time, and the counselor helped her navigate it with compassion and wisdom. We\'re so grateful.',
      firstName: 'Patricia',
      service: 'Teen & Youth Support',
      date: 'December 2025',
    },
    {
      quote: 'The sessions helped me process trauma I had been carrying for years. I feel lighter and more at peace than I have in a long time.',
      firstName: 'Daniel',
      service: 'Mental Health Support',
      date: 'August 2025',
    },
    {
      quote: 'Coming to counselling was the best decision I made this year. I have learned to set boundaries and prioritize my mental wellbeing.',
      firstName: 'Ruth',
      service: 'Individual Counselling',
      date: 'September 2025',
    },
    {
      quote: 'I would like to express my heartfelt gratitude to Gilt Counselling Services for the incredible work they are doing. One day, a female therapist from your organization reached out to me after my 13-year-old niece had searched online for a female therapist and contacted your team for help. During their conversation, the therapist realized that my niece was living in an abusive environment and urgently needed protection. The therapist acted with compassion, professionalism, and wisdom by ensuring the situation was brought to my attention. As soon as I learned what was happening, I immediately contacted the appropriate authorities, and swift action was taken to remove her from the abusive environment. Today, my niece is safe, receiving the care and support she needs, and we are deeply grateful for the role Gilt Counselling Services played in changing the course of her life. Your commitment to listening, believing, and responding to vulnerable children has made an immeasurable difference to our family. Thank you for your dedication, courage, and genuine concern for those in need. May your organization continue to be a source of hope, healing, and protection for many more people.',
      firstName: 'Dr. Mensah',
      service: 'Child Safeguarding & Protection',
      date: 'July 2026',
    },
  ];

  const schoolTestimonials = [
    {
      school: "Great Beulah Heritage School",
      quotes: [
        { text: "I was feeling depressed earlier before the team's arrival, but after the event, I feel better.", role: "Student" },
        { text: "The teaching on Emotional Intelligence has given me clues on how to manage anger issues.", role: "Student" },
      ],
    },
    {
      school: "Niger Delta Science School",
      quotes: [
        { text: "I have been struggling with anger issues. Thank God, the teaching on Emotional Intelligence has taught me how I can control anger.", role: "Student" },
        { text: "I did not know how to understand people's emotions, but with this teaching, I will do better.", role: "Student" },
        { text: "This teaching has enlightened me to have a successful relationship.", role: "Counsellor" },
      ],
    },
    {
      school: "Oliveth Height International School",
      quotes: [
        { text: "I am very happy for the opportunity to learn about Emotional Intelligence.", role: "Student" },
        { text: "Through the teaching I got to understand my emotions and how to express them in both positive and negative situation.", role: "Student" },
        { text: "This has helped in shaping the students' minds on how to have a productive life.", role: "Principal" },
      ],
    },
    {
      school: "Christ International School",
      quotes: [
        { text: "There is need to control our emotions.", role: "Student" },
        { text: "I learnt how to balance and regulate my emotions and also relate with others.", role: "Student" },
        { text: "We need emotional intelligence in order to build a life of success beyond the classroom.", role: "Principal" },
      ],
    },
    {
      school: "The Groove School",
      quotes: [
        { text: "I am happy because I have learnt how to regulate my emotions.", role: "Student" },
        { text: "I have learnt and seen the need to manage my emotions.", role: "Student" },
        { text: "The teaching has enlightened the students on the need for self-regulation.", role: "School Counsellor" },
      ],
    },
    {
      school: "Priqueen International School",
      quotes: [
        { text: "The teaching has made me understand the right way to approach people.", role: "Student" },
        { text: "I have seen the need for Emotional Intelligence so as not to get overwhelmed by emotions in any given situation.", role: "Student" },
        { text: "I have learnt that Emotional Intelligence starts with me, and not just knowing my emotions, but also knowing and understanding the emotions of others around me.", role: "Student" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-off-white">

      <section className="bg-gradient-to-br from-warm-cream via-off-white to-warm-sand py-10 sm:py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="heading-xl mb-6">
            Stories of Hope & Growth
          </h1>
          <p className="body-lg mb-4">
            Hear from those we've had the privilege to support on their journey toward healing and growth.
          </p>
          <p className="text-sm text-gray-600">
            All testimonials are shared anonymously to protect our clients' privacy and confidentiality.
          </p>
        </div>
      </section>

      <section className="section-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              firstName={testimonial.firstName}
              service={testimonial.service}
              date={testimonial.date}
            />
          ))}
        </div>
      </section>

      <section className="section-container bg-warm-cream">
        <SectionHeading
          title="School Outreach Testimonies"
          subtitle="Feedback from our Emotional Intelligence sessions with students, counsellors, and principals across schools."
          centered
        />
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {schoolTestimonials.map((entry, index) => (
            <div key={index} className="bg-white rounded-xl p-6 sm:p-8 shadow-calm">
              <h3 className="heading-sm mb-4">{entry.school}</h3>
              <div className="space-y-4">
                {entry.quotes.map((quote, quoteIndex) => (
                  <div key={quoteIndex} className="border-t border-soft-beige pt-4 first:border-t-0 first:pt-0">
                    <p className="text-gray-700 leading-relaxed italic mb-1">"{quote.text}"</p>
                    <p className="text-sm text-soft-gold font-semibold">{quote.role}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-container bg-off-white">
        <SectionHeading
          title="Community Outreach"
          subtitle="Making a difference beyond our counselling rooms — bringing support and awareness to communities."
          centered
        />
        <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-calm">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-block bg-soft-terracotta/10 text-soft-terracotta px-3 py-1.5 rounded-full text-xs uppercase tracking-wider font-medium">
                Community
              </span>
              <span className="text-sm text-gray-500">2026</span>
            </div>
            <h3 className="heading-sm mb-2">
              CASSON Rivers State Chapter 6th Biennial Conference &amp; Induction Ceremony
            </h3>
            <p className="text-soft-gold font-semibold mb-2">IGNATIUS AJURU UNIVERSITY OF EDUCATION</p>
            <p className="text-gray-700 leading-relaxed mb-6 text-justify">
              Gilt Counselling Consult was represented at the Counselling Association of Nigeria (CASSON)
              Rivers State Chapter&apos;s 6th Biennial Conference, Induction Ceremony, and Fund Raise, themed
              &ldquo;Counselling for Transformation: Accelerating Mental Health for Sustainable Development in
              Nigeria.&rdquo; Our team presented at the podium and received a Certificate of Participation,
              joining fellow counselling professionals across Rivers State.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="relative h-[150px] sm:h-[190px] md:h-[220px] rounded-lg overflow-hidden">
                <Image
                  src="/images/events/casson-conference-2026-1.jpeg"
                  alt="Gilt Counselling Consult representative speaking at the CASSON Rivers State Chapter 6th Biennial Conference - Event photo 1"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 20vw"
                  quality={60}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAIAAoDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJgA//9k="
                  loading="lazy"
                />
              </div>
              <div className="relative h-[150px] sm:h-[190px] md:h-[220px] rounded-lg overflow-hidden">
                <Image
                  src="/images/events/casson-conference-2026-2.jpeg"
                  alt="Esther Ebifimoere Peters receiving the Certificate of Participation at the CASSON 6th Biennial Conference - Event photo 2"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 20vw"
                  quality={60}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAIAAoDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJgA//9k="
                  loading="lazy"
                />
              </div>
              <div className="relative h-[150px] sm:h-[190px] md:h-[220px] rounded-lg overflow-hidden">
                <Image
                  src="/images/events/casson-conference-2026-3.jpeg"
                  alt="Gilt Counselling Consult team at Ignatius Ajuru University of Education for the CASSON 6th Biennial Conference - Event photo 3"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 20vw"
                  quality={60}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAIAAoDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJgA//9k="
                  loading="lazy"
                />
              </div>
              <div className="relative h-[150px] sm:h-[190px] md:h-[220px] rounded-lg overflow-hidden">
                <Image
                  src="/images/events/casson-conference-2026-4.jpeg"
                  alt="Gilt Counselling Consult team with CASSON Rivers State Chapter officials - Event photo 4"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 20vw"
                  quality={60}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAIAAoDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJgA//9k="
                  loading="lazy"
                />
              </div>
              <div className="relative h-[150px] sm:h-[190px] md:h-[220px] rounded-lg overflow-hidden">
                <Image
                  src="/images/events/casson-conference-2026-5.jpeg"
                  alt="Conference theme screen at the CASSON Rivers State Chapter 6th Biennial Conference - Event photo 5"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 20vw"
                  quality={60}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAIAAoDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJgA//9k="
                  loading="lazy"
                />
              </div>
              <div className="relative h-[150px] sm:h-[190px] md:h-[220px] rounded-lg overflow-hidden">
                <Image
                  src="/images/events/casson-conference-2026-6.jpeg"
                  alt="Gilt Counselling Consult representative presenting at the CASSON Rivers State Chapter 6th Biennial Conference - Event photo 6"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 20vw"
                  quality={60}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAIAAoDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJgA//9k="
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-calm">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-block bg-soft-terracotta/10 text-soft-terracotta px-3 py-1.5 rounded-full text-xs uppercase tracking-wider font-medium">
                Community
              </span>
              <span className="text-sm text-gray-500">June 2026</span>
            </div>
            <h3 className="heading-sm mb-2">
              Gilt Counselling Consult, in Partnership with CASSON Rivers State, Honours International Guest Lecturer Tracy Heath in Canada
            </h3>
            <p className="text-soft-gold font-semibold mb-2">CANADA</p>
            <p className="text-gray-700 leading-relaxed mb-6 text-justify">
              Gilt Counselling Consult, in partnership with the Counselling Association of Nigeria (CASSON)
              Rivers State Chapter, honoured international guest lecturer Tracy Heath in Canada in appreciation
              of her contributions and partnership. The visit was marked with a warm exchange of gifts,
              including a token from Nigeria and a copy of &ldquo;Before Goodbye,&rdquo; celebrating the
              relationship between both parties.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
              <div className="relative h-[150px] sm:h-[190px] md:h-[220px] rounded-lg overflow-hidden">
                <Image
                  src="/images/events/tracy-heath-canada-1.jpeg"
                  alt="Gilt Counselling Consult representative presenting a gift to Tracy Heath in Canada - Event photo 1"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 20vw"
                  quality={60}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAIAAoDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJgA//9k="
                  loading="lazy"
                />
              </div>
              <div className="relative h-[150px] sm:h-[190px] md:h-[220px] rounded-lg overflow-hidden">
                <Image
                  src="/images/events/tracy-heath-canada-2.jpeg"
                  alt="Tracy Heath holding a Nigerian gift plaque presented by Gilt Counselling Consult - Event photo 2"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 20vw"
                  quality={60}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAIAAoDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJgA//9k="
                  loading="lazy"
                />
              </div>
              <div className="relative h-[150px] sm:h-[190px] md:h-[220px] rounded-lg overflow-hidden">
                <Image
                  src="/images/events/tracy-heath-canada-3.jpeg"
                  alt="Gilt Counselling Consult team with Tracy Heath in Canada - Event photo 3"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 20vw"
                  quality={60}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAIAAoDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJgA//9k="
                  loading="lazy"
                />
              </div>
              <div className="relative h-[150px] sm:h-[190px] md:h-[220px] rounded-lg overflow-hidden">
                <Image
                  src="/images/events/tracy-heath-canada-4.jpeg"
                  alt="Gilt Counselling Consult representative and Tracy Heath sharing a warm embrace in Canada - Event photo 4"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 20vw"
                  quality={60}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAIAAoDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJgA//9k="
                  loading="lazy"
                />
              </div>
              <div className="relative h-[150px] sm:h-[190px] md:h-[220px] rounded-lg overflow-hidden">
                <Image
                  src="/images/events/tracy-heath-canada-5.jpeg"
                  alt="Tracy Heath holding the book Before Goodbye, gifted by Gilt Counselling Consult - Event photo 5"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 20vw"
                  quality={60}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAIAAoDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJgA//9k="
                  loading="lazy"
                />
              </div>
            </div>
            <video
              controls
              preload="none"
              poster="/images/events/tracy-heath-canada-1.jpeg"
              className="w-full rounded-lg"
            >
              <source src="/videos/tracy-heath-canada.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-calm">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-block bg-soft-terracotta/10 text-soft-terracotta px-3 py-1.5 rounded-full text-xs uppercase tracking-wider font-medium">
                Community
              </span>
              <span className="text-sm text-gray-500">May 2026</span>
            </div>
            <h3 className="heading-sm mb-2">
              2026 Children&apos;s Day Celebration
            </h3>
            <p className="text-soft-gold font-semibold mb-2">VINEYARD</p>
            <p className="text-gray-700 leading-relaxed mb-6 text-justify">
              Gilt Counselling Consult joined the 2026 Children&apos;s Day celebration at Vineyard,
              bringing colour, joy, and our message of mental wellness to families across the city. Our team
              engaged children and parents at our branded stand, sharing information on our services while
              celebrating the day dedicated to <strong>every child&apos;s wellbeing and growth</strong>.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="relative h-[180px] sm:h-[220px] md:h-[260px] rounded-lg overflow-hidden">
                <Image
                  src="/images/events/childrens-day-2026-1.jpeg"
                  alt="Gilt Counselling Consult team and families at the 2026 Children's Day celebration - Event photo 1"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  quality={60}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAIAAoDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJgA//9k="
                  loading="lazy"
                />
              </div>
              <div className="relative h-[180px] sm:h-[220px] md:h-[260px] rounded-lg overflow-hidden">
                <Image
                  src="/images/events/childrens-day-2026-2.jpeg"
                  alt="Gilt Counselling Consult registration table at the 2026 Children's Day celebration - Event photo 2"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  quality={60}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAIAAoDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJgA//9k="
                  loading="lazy"
                />
              </div>
              <div className="relative h-[180px] sm:h-[220px] md:h-[260px] rounded-lg overflow-hidden">
                <Image
                  src="/images/events/childrens-day-2026-3.jpeg"
                  alt="Children celebrating with cake at the 2026 Children's Day celebration - Event photo 3"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  quality={60}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAIAAoDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJgA//9k="
                  loading="lazy"
                />
              </div>
              <div className="relative h-[180px] sm:h-[220px] md:h-[260px] rounded-lg overflow-hidden">
                <Image
                  src="/images/events/childrens-day-2026-4.jpeg"
                  alt="Gilt Counselling Consult team member engaging with children at the 2026 Children's Day celebration - Event photo 4"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  quality={60}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAIAAoDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJgA//9k="
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-calm">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-block bg-soft-terracotta/10 text-soft-terracotta px-3 py-1.5 rounded-full text-xs uppercase tracking-wider font-medium">
                Community
              </span>
              <span className="text-sm text-gray-500">June 2026</span>
            </div>
            <h3 className="heading-sm mb-2">
              The Destructive Effect of Substance Abuse and Internet Fraud on Youth
            </h3>
            <p className="text-soft-gold font-semibold mb-2">2026 DIOCESAN WOMEN CONFERENCE, DIOCESE OF IDEATO</p>
            <p className="text-gray-700 leading-relaxed mb-6 text-justify">
              Gilt Counselling Consult was invited to speak at the 2026 Diocesan Women Conference, Arondizuogu
              Archdeaconry, Diocese of Ideato (Anglican Communion), held at the Cathedral of St. Peter, Ndiawa
              Arondizuogu. The session addressed the destructive effect of substance abuse and internet fraud
              on youth, equipping the hundreds of women in attendance with insight to guide the young people
              in their care.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="relative h-[180px] sm:h-[220px] md:h-[260px] rounded-lg overflow-hidden">
                <Image
                  src="/images/events/ideato-women-conference-1.jpeg"
                  alt="Gilt Counselling Consult speaker addressing the 2026 Diocesan Women Conference - Event photo 1"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  quality={60}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAIAAoDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJgA//9k="
                  loading="lazy"
                />
              </div>
              <div className="relative h-[180px] sm:h-[220px] md:h-[260px] rounded-lg overflow-hidden">
                <Image
                  src="/images/events/ideato-women-conference-2.jpeg"
                  alt="Gilt Counselling Consult speaker at the podium with the conference banner - Event photo 2"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  quality={60}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAIAAoDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJgA//9k="
                  loading="lazy"
                />
              </div>
              <div className="relative h-[180px] sm:h-[220px] md:h-[260px] rounded-lg overflow-hidden">
                <Image
                  src="/images/events/ideato-women-conference-3.jpeg"
                  alt="Gilt Counselling Consult team with Diocese of Ideato Women's Guild leaders - Event photo 3"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  quality={60}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAIAAoDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJgA//9k="
                  loading="lazy"
                />
              </div>
              <div className="relative h-[180px] sm:h-[220px] md:h-[260px] rounded-lg overflow-hidden">
                <Image
                  src="/images/events/ideato-women-conference-4.jpeg"
                  alt="Hundreds of women in attendance at the 2026 Diocesan Women Conference - Event photo 4"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  quality={60}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAIAAoDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJgA//9k="
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-calm">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-block bg-soft-terracotta/10 text-soft-terracotta px-3 py-1.5 rounded-full text-xs uppercase tracking-wider font-medium">
                Community
              </span>
              <span className="text-sm text-gray-500">June 2026</span>
            </div>
            <h3 className="heading-sm mb-2">
              2026 Teachers Training: Championing Dyslexia, Dyscalculia, and Dysgraphia Awareness
            </h3>
            <p className="text-soft-gold font-semibold mb-2">LIGHTVIEW INITIATIVE FOR EMPOWERMENT &times; AFRICA DYSLEXIA ORGANISATION</p>
            <p className="text-gray-700 leading-relaxed mb-6 text-justify">
              Gilt Counselling Consult took part in the 2026 teachers training championing Dyslexia, Dyscalculia,
              and Dysgraphia awareness, organised by the Lightview Initiative for Empowerment in partnership
              with the Africa Dyslexia Organisation. The training equipped teachers with the knowledge to
              identify and support students with learning differences in the classroom.
            </p>
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              <div className="relative h-[150px] sm:h-[190px] md:h-[220px] rounded-lg overflow-hidden">
                <Image
                  src="/images/events/dyslexia-training-2026-1.jpeg"
                  alt="Gilt Counselling Consult representative at the 2026 teachers training on Dyslexia, Dyscalculia, and Dysgraphia awareness - Event photo 1"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 20vw"
                  quality={60}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAIAAoDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJgA//9k="
                  loading="lazy"
                />
              </div>
              <div className="relative h-[150px] sm:h-[190px] md:h-[220px] rounded-lg overflow-hidden">
                <Image
                  src="/images/events/dyslexia-training-2026-2.jpeg"
                  alt="Gilt Counselling Consult facilitating a session at the 2026 teachers training on Dyslexia, Dyscalculia, and Dysgraphia awareness - Event photo 2"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 20vw"
                  quality={60}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAIAAoDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJgA//9k="
                  loading="lazy"
                />
              </div>
              <div className="relative h-[150px] sm:h-[190px] md:h-[220px] rounded-lg overflow-hidden">
                <Image
                  src="/images/events/dyslexia-training-2026-3.jpeg"
                  alt="Gilt Counselling Consult representative with fellow facilitators at the 2026 teachers training on Dyslexia, Dyscalculia, and Dysgraphia awareness - Event photo 3"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 20vw"
                  quality={60}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAIAAoDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJgA//9k="
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-calm">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-block bg-soft-terracotta/10 text-soft-terracotta px-3 py-1.5 rounded-full text-xs uppercase tracking-wider font-medium">
                Community
              </span>
              <span className="text-sm text-gray-500">December 2025</span>
            </div>
            <h3 className="heading-sm mb-2">
              International World Day for Persons with Disabilities 2025
            </h3>
            <p className="text-soft-gold font-semibold mb-2">OTANA INCLUSIVE CENTRE</p>
            <p className="text-gray-700 leading-relaxed mb-6 text-justify">
              Gilt Counselling Consult celebrated the 2025 International World Day for Persons with Disabilities
              at Otana Inclusive Centre, championing the message that <strong>no child should be left behind</strong>.
              The event brought together families, caregivers, and advocates to raise awareness about inclusion
              and support for persons with disabilities.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="relative h-[180px] sm:h-[220px] md:h-[260px] rounded-lg overflow-hidden">
                <Image
                  src="/images/events/disability-day-1.jpeg"
                  alt="Gilt Counselling at International World Day for Persons with Disabilities - Event photo 1"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  quality={60}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAIAAoDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJgA//9k="
                  loading="lazy"
                />
              </div>
              <div className="relative h-[180px] sm:h-[220px] md:h-[260px] rounded-lg overflow-hidden">
                <Image
                  src="/images/events/disability-day-2.jpeg"
                  alt="Gilt Counselling at International World Day for Persons with Disabilities - Event photo 2"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  quality={60}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAIAAoDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJgA//9k="
                  loading="lazy"
                />
              </div>
              <div className="relative h-[180px] sm:h-[220px] md:h-[260px] rounded-lg overflow-hidden">
                <Image
                  src="/images/events/disability-day-3.jpeg"
                  alt="Gilt Counselling at International World Day for Persons with Disabilities - Event photo 3"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  quality={60}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAIAAoDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJgA//9k="
                  loading="lazy"
                />
              </div>
              <div className="relative h-[180px] sm:h-[220px] md:h-[260px] rounded-lg overflow-hidden">
                <Image
                  src="/images/events/disability-day-4.jpeg"
                  alt="Gilt Counselling at International World Day for Persons with Disabilities - Event photo 4"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  quality={60}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAIAAoDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJgA//9k="
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-container bg-off-white">
        <SectionHeading
          title="Media & Press Features"
          subtitle="Sharing our expertise on mental health and wellness with the wider public through radio."
          centered
        />
        <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-calm">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-block bg-soft-terracotta/10 text-soft-terracotta px-3 py-1.5 rounded-full text-xs uppercase tracking-wider font-medium">
                Media
              </span>
              <span className="text-sm text-gray-500">June 2026</span>
            </div>
            <h3 className="heading-sm mb-2">
              92.3 Nigeria Info PH Interview on Navigating Men&apos;s Mental Health
            </h3>
            <p className="text-soft-gold font-semibold mb-2">IN CELEBRATION OF MEN&apos;S MENTAL WELLNESS MONTH</p>
            <p className="text-gray-700 leading-relaxed mb-6 text-justify">
              Gilt Counselling Consult joined 92.3 Nigeria Info Port Harcourt for a studio conversation on
              navigating men&apos;s mental health, part of the station&apos;s programming in celebration of
              Men&apos;s Mental Wellness Month. The discussion explored the unique pressures men face and
              practical ways to build emotional resilience and seek support.
            </p>
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              <div className="relative h-[150px] sm:h-[190px] md:h-[220px] rounded-lg overflow-hidden">
                <Image
                  src="/images/media/nigeria-info-studio.jpeg"
                  alt="Gilt Counselling Consult team in the 92.3 Nigeria Info Port Harcourt studio - Event photo 1"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 20vw"
                  quality={60}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAIAAoDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJgA//9k="
                  loading="lazy"
                />
              </div>
              <div className="relative h-[150px] sm:h-[190px] md:h-[220px] rounded-lg overflow-hidden">
                <Image
                  src="/images/media/nigeria-info-group.jpeg"
                  alt="Gilt Counselling Consult team with 92.3 Nigeria Info Port Harcourt host - Event photo 2"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 20vw"
                  quality={60}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAIAAoDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJgA//9k="
                  loading="lazy"
                />
              </div>
              <div className="relative h-[150px] sm:h-[190px] md:h-[220px] rounded-lg overflow-hidden">
                <Image
                  src="/images/media/nigeria-info-onair.jpeg"
                  alt="Gilt Counselling Consult representative on-air at 92.3 Nigeria Info Port Harcourt - Event photo 3"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 20vw"
                  quality={60}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAIAAoDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJgA//9k="
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-calm">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-block bg-soft-terracotta/10 text-soft-terracotta px-3 py-1.5 rounded-full text-xs uppercase tracking-wider font-medium">
                Media
              </span>
              <span className="text-sm text-gray-500">June 2026</span>
            </div>
            <h3 className="heading-sm mb-2">
              Kids FM PH 101.7 Radio Talk on Men&apos;s Mental Health
            </h3>
            <p className="text-soft-gold font-semibold mb-2">KIDS FM PORT HARCOURT, 101.7FM</p>
            <p className="text-gray-700 leading-relaxed mb-6 text-justify">
              Gilt Counselling Consult sat down with Kids FM Port Harcourt, 101.7FM, for a radio talk on
              men&apos;s mental health, continuing the conversation on emotional wellbeing and the importance
              of men feeling safe to speak openly about what they carry.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="relative h-[220px] sm:h-[280px] md:h-[320px] rounded-lg overflow-hidden">
                <Image
                  src="/images/media/kidsfm-interview-1.jpeg"
                  alt="Gilt Counselling Consult representative on-air at Kids FM Port Harcourt 101.7FM - Event photo 1"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  quality={60}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAIAAoDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJgA//9k="
                  loading="lazy"
                />
              </div>
              <div className="relative h-[220px] sm:h-[280px] md:h-[320px] rounded-lg overflow-hidden">
                <Image
                  src="/images/media/kidsfm-interview-2.jpeg"
                  alt="Gilt Counselling Consult representative on-air at Kids FM Port Harcourt 101.7FM - Event photo 2"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  quality={60}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAIAAoDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJgA//9k="
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-container bg-warm-cream">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-white rounded-xl p-8 shadow-calm">
            <svg className="w-12 h-12 text-soft-gold mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <h3 className="heading-sm mb-4">Your Privacy is Sacred</h3>
            <p className="body-md text-gray-700 mb-4">
              All testimonials shared here have been anonymized to protect the identity and privacy of our clients.
              We use first names only and obtain explicit consent before sharing any feedback.
            </p>
            <p className="text-sm text-gray-600">
              Confidentiality is one of our core values, and we take it seriously in everything we do.
            </p>
          </div>
        </div>
      </section>

      <section className="section-container bg-off-white">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeading
            title="Your Story Could Inspire Someone"
            subtitle="If our counselling services have helped you, consider sharing your experience to give hope to others who may be struggling."
            centered
          />
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link href="/contact">
              <Button variant="ghost">
                Share Your Story
              </Button>
            </Link>
            <Link href="/book-appointment">
              <Button variant="primary">
                Begin Your Journey
              </Button>
            </Link>
          </div>
          <p className="text-sm text-gray-600 mt-6">
            We'll work with you to ensure your privacy is protected while sharing your message of hope.
          </p>
        </div>
      </section>
    </div>
  );
}
