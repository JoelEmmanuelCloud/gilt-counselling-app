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
      name: 'Jane Nnakpee',
      title: 'Secretary and Administrative Officer',
      image: '/uploads/Jane Nnakpee.jpeg',
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

      <section className="bg-gradient-to-br from-warm-cream via-off-white to-warm-sand py-10 sm:py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="heading-xl mb-4 sm:mb-6">About Gilt Counselling Consult</h1>
          <p className="body-lg">
            Empowering teens and youths for optimal development through professional,
            compassionate counselling and support.
          </p>
        </div>
      </section>

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

      <section className="section-container bg-warm-cream">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
            <div className="relative h-[280px] sm:h-[340px] md:h-[420px] w-full max-w-xs sm:max-w-sm md:max-w-[380px] mx-auto rounded-lg overflow-hidden">
              <Image
                src="/images/Dame Prof Chinelo Joy Ugwu.jpeg"
                alt="Dame Prof Chinelo Joy Ugwu - Founder & CEO"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 350px"
                quality={60}
                loading="lazy"
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

      <section className="section-container bg-off-white">
        <SectionHeading
          title="Committed to Evidence-Based Practice"
          subtitle="Our founder is always updating knowledge in evidence-based research."
          centered
        />
        <div className="max-w-5xl mx-auto">
          <p className="body-md text-center text-gray-700 mb-8">
            Prof Chinelo Ugwu, founder of Gilt Counselling Consult, at the 2025 Canadian Counselling
            and Psychotherapy Association (CCPA) conference in Calgary.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {[
              { src: '/images/ccpa-conference/ccpa-1.jpeg', alt: 'Prof Chinelo Ugwu at CCPA conference with fellow delegate' },
              { src: '/images/ccpa-conference/ccpa-2.jpeg', alt: 'Prof Chinelo Ugwu speaking at the CCPA conference podium' },
              { src: '/images/ccpa-conference/ccpa-3.jpeg', alt: 'Prof Chinelo Ugwu with colleagues at CCPA conference session' },
              { src: '/images/ccpa-conference/ccpa-4.jpeg', alt: 'Prof Chinelo Ugwu networking with author Patricia Morgan at CCPA conference' },
              { src: '/images/ccpa-conference/ccpa-5.jpeg', alt: 'Prof Chinelo Ugwu at the CCPA conference booth' },
              { src: '/images/ccpa-conference/ccpa-6.jpeg', alt: 'Prof Chinelo Ugwu with fellow counselling professional at CCPA conference' },
            ].map((photo, index) => (
              <div key={index} className="relative h-[200px] sm:h-[240px] md:h-[280px] rounded-lg overflow-hidden">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={60}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-container bg-warm-cream">
        <SectionHeading
          title="Community Outreach"
          subtitle="Giving back to our community — one act of love at a time."
          centered
        />
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-center">
            <div className="space-y-4 text-gray-700">
              <p className="body-lg font-semibold text-soft-terracotta">
                Chairs Donated to Otana Inclusive Centre
              </p>
              <p className="body-md text-justify">
                As part of our ongoing outreach programmes, Gilt Counselling Consult donated executive chairs
                to Otana Inclusive Centre — a gesture born from a deep commitment to the wellbeing of every child,
                regardless of ability.
              </p>
              <blockquote className="border-l-4 border-soft-gold pl-4 italic text-gray-600">
                "You have provided executive chairs for our special children to sit on. God will surely make them
                executive individuals in their life's endeavours. This heartfelt gift is proof of your love for
                humanity and Otana Inclusive Centre. God bless you and your team at Gilt Counselling Consult."
              </blockquote>
              <p className="body-md text-justify text-gray-600">
                We are honoured by the warm reception from the centre's leadership and remain committed to serving
                communities in need through compassionate action.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[
                { src: '/images/outreach/otana-outreach-1.jpeg', alt: 'Gilt Counselling Consult donating chairs to Otana Inclusive Centre' },
                { src: '/images/outreach/otana-outreach-2.jpeg', alt: 'Executive chairs donated to special needs children at Otana Inclusive Centre' },
              ].map((photo, index) => (
                <div key={index} className="relative h-[200px] sm:h-[230px] md:h-[260px] rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={60}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      
      <section className="section-container bg-off-white">
        <SectionHeading
          title="All Saints Cathedral Workshop"
          subtitle="CEO GILT coordinated a one-day workshop for the All Saints Cathedral Education and Empowerment Committee."
          centered
        />
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-center mb-6 sm:mb-8">
            <div className="space-y-4 text-gray-700">
              <p className="body-lg font-semibold text-soft-terracotta">
                Education &amp; Empowerment Committee Workshop
              </p>
              <p className="body-md text-justify">
                Dame Prof Chinelo Joy Ugwu, CEO of Gilt Counselling Consult, coordinated a one-day
                workshop for the All Saints Cathedral Education and Empowerment Committee. The workshop
                brought together members of the committee for a day of learning, empowerment, and
                professional development.
              </p>
              <p className="body-md text-justify text-gray-600">
                This initiative reflects Gilt Counselling Consult&apos;s dedication to extending
                professional support beyond the counselling room and into the wider community.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {[1, 2, 3, 6].map((i) => (
                <div key={i} className="relative h-[140px] sm:h-[170px] md:h-[200px] rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={`/images/workshops/all-saints/all-saints-workshop-${i}.jpeg`}
                    alt={`All Saints Cathedral Education and Empowerment Committee Workshop - Photo ${i}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    quality={60}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
            {[7, 9, 10, 14, 15].map((i) => (
              <div key={i} className="relative h-[120px] sm:h-[140px] md:h-[160px] rounded-lg overflow-hidden shadow-md">
                <Image
                  src={`/images/workshops/all-saints/all-saints-workshop-${i}.jpeg`}
                  alt={`All Saints Cathedral workshop activity - Photo ${i}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  quality={60}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="section-container bg-warm-cream">
        <SectionHeading
          title="Emotional Intelligence Workshop"
          subtitle="Niger Delta Science School, Rumuola — Bringing mental wellness education to the next generation."
          centered
        />
        <div className="max-w-5xl mx-auto space-y-8 sm:space-y-10">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
            <div className="space-y-4 text-gray-700">
              <p className="body-lg font-semibold text-soft-terracotta">
                Hundreds of Students. One Powerful Conversation.
              </p>
              <p className="body-md text-justify">
                Our team visited Niger Delta Science School, Rumuola, for a school-wide session on emotional
                intelligence and self-awareness. The assembly hall filled with hundreds of eager students —
                a vivid reminder of how deeply these conversations matter to young people navigating the
                pressures of adolescence.
              </p>
              <p className="body-md text-justify text-gray-600">
                The session explored practical tools for understanding and managing emotions — from
                recognising personal triggers to building empathy for others. Students engaged
                thoughtfully, and many stayed back afterwards to share how the teaching had already
                begun to shift their perspective.
              </p>
            </div>
            <div className="relative h-[260px] sm:h-[320px] md:h-[380px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/outreach/ndss/ndss-session-hall.jpeg"
                alt="Hundreds of Niger Delta Science School students gathered for the Gilt Counselling emotional intelligence session"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={60}
                loading="lazy"
              />
            </div>
          </div>

          <div className="relative h-[220px] sm:h-[300px] md:h-[360px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/images/outreach/ndss/ndss-school-gate.jpeg"
              alt="Students of Niger Delta Science School, Rumuola gathered at the school entrance"
              fill
              className="object-cover object-center"
              sizes="100vw"
              quality={60}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-5 sm:bottom-6 sm:left-8">
              <p className="text-white font-heading font-bold text-lg sm:text-2xl drop-shadow">Niger Delta Science School</p>
              <p className="text-white/85 text-sm sm:text-base drop-shadow">Rumuola, Port Harcourt</p>
            </div>
          </div>

          <div>
            <h3 className="font-heading font-bold text-lg sm:text-xl text-gray-900 mb-4 text-center">
              In Their Own Words
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-soft-beige">
                <div className="text-3xl text-soft-terracotta font-serif leading-none mb-3">&ldquo;</div>
                <p className="text-gray-700 leading-relaxed italic text-justify mb-4">
                  I have struggled with anger for a long time. This session on emotional intelligence
                  showed me practical ways to manage my reactions — to pause, reflect, and respond
                  rather than explode.
                </p>
                <div className="flex items-center gap-2">
                  <div className="h-0.5 w-6 bg-soft-terracotta rounded-full" />
                  <p className="text-sm font-semibold text-gray-600">Male Student</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-soft-beige">
                <div className="text-3xl text-soft-terracotta font-serif leading-none mb-3">&ldquo;</div>
                <p className="text-gray-700 leading-relaxed italic text-justify mb-4">
                  I had never truly understood how to read what others were feeling. What I learned
                  today opened my eyes — I now know I can do better at understanding the people
                  around me.
                </p>
                <div className="flex items-center gap-2">
                  <div className="h-0.5 w-6 bg-soft-terracotta rounded-full" />
                  <p className="text-sm font-semibold text-gray-600">Female Student</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {[
              { src: '/images/outreach/ndss/ndss-students-attentive.jpeg', alt: 'Niger Delta Science School students listening attentively during the emotional intelligence session' },
              { src: '/images/outreach/ndss/ndss-session-active.jpeg', alt: 'Gilt Counselling Consult facilitator engaging students during the workshop session' },
              { src: '/images/outreach/ndss/ndss-counsellor-students.jpeg', alt: 'Gilt Counselling Consult counsellor pictured with a group of Niger Delta Science School students' },
            ].map((photo, index) => (
              <div key={index} className="relative h-[180px] sm:h-[210px] rounded-xl overflow-hidden shadow-md">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 33vw"
                  quality={60}
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          <blockquote className="border-l-4 border-soft-gold pl-5 sm:pl-6 italic text-gray-600 bg-white rounded-r-xl py-4 sm:py-5 pr-5 sm:pr-6 shadow-sm">
            <p className="body-md text-justify">
              &ldquo;This session has enriched my own understanding of emotional intelligence in a profound way.
              It has given me fresh insight into how to build and sustain healthy, meaningful relationships —
              both personally and professionally.&rdquo;
            </p>
            <footer className="mt-3 flex items-center gap-2">
              <div className="h-0.5 w-6 bg-soft-gold rounded-full" />
              <p className="text-sm font-semibold text-gray-700">School Counsellor, Niger Delta Science School</p>
            </footer>
          </blockquote>

        </div>
      </section>

      <section className="section-container bg-off-white">
        <SectionHeading
          title="Emotional Intelligence Workshop"
          subtitle="Great Beulah Heritage School, Rumuigbo — When a session changes how you feel before it even ends."
          centered
        />
        <div className="max-w-5xl mx-auto space-y-8 sm:space-y-10">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
            <div className="space-y-4 text-gray-700">
              <p className="body-lg font-semibold text-soft-terracotta">
                A Visit That Left a Mark.
              </p>
              <p className="body-md text-justify">
                Gilt Counselling Consult brought their Emotional Intelligence programme to Great Beulah
                Heritage School, Rumuigbo — and the impact was felt even before the session was over.
                One student arrived that morning feeling low and withdrawn. By the time the team finished,
                something had shifted.
              </p>
              <p className="body-md text-justify text-gray-600">
                The session equipped students with practical tools for recognising their emotional states,
                understanding their triggers, and managing their responses — skills that matter every day,
                inside and outside the classroom.
              </p>
            </div>
            <div className="relative h-[280px] sm:h-[340px] md:h-[400px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/outreach/gbhs/gbhs-counsellor-students.jpeg"
                alt="Gilt Counselling Consult facilitator with Great Beulah Heritage School students in front of the branded Gilt Counselling Consult banner"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={60}
                loading="lazy"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {[
              { src: '/images/outreach/gbhs/gbhs-session-active.jpeg', alt: 'Gilt Counselling Consult facilitator actively engaging Great Beulah Heritage School students during the session' },
              { src: '/images/outreach/gbhs/gbhs-students-engaged.jpeg', alt: 'Great Beulah Heritage School students listening attentively during the Emotional Intelligence workshop' },
              { src: '/images/outreach/gbhs/gbhs-students-classroom.jpeg', alt: 'Students at Great Beulah Heritage School seated and engaged during the counselling outreach session' },
            ].map((photo, index) => (
              <div key={index} className="relative h-[180px] sm:h-[210px] rounded-xl overflow-hidden shadow-md">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 33vw"
                  quality={60}
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          <div>
            <h3 className="font-heading font-bold text-lg sm:text-xl text-gray-900 mb-4 text-center">
              In Their Own Words
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-soft-beige">
                <div className="text-3xl text-soft-terracotta font-serif leading-none mb-3">&ldquo;</div>
                <p className="text-gray-700 leading-relaxed italic text-justify mb-4">
                  I arrived this morning feeling depressed and heavy inside. I wasn&apos;t sure anything
                  could change that. But after this session, I genuinely feel better — lighter. Something
                  shifted in me today.
                </p>
                <div className="flex items-center gap-2">
                  <div className="h-0.5 w-6 bg-soft-terracotta rounded-full" />
                  <p className="text-sm font-semibold text-gray-600">Male Student</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-soft-beige">
                <div className="text-3xl text-soft-terracotta font-serif leading-none mb-3">&ldquo;</div>
                <p className="text-gray-700 leading-relaxed italic text-justify mb-4">
                  This presentation on Emotional Intelligence gave me real clues on how to handle my
                  anger. I have always struggled with it, but now I have a clearer picture of what to
                  do when I feel it rising.
                </p>
                <div className="flex items-center gap-2">
                  <div className="h-0.5 w-6 bg-soft-terracotta rounded-full" />
                  <p className="text-sm font-semibold text-gray-600">Female Student</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className="section-container bg-warm-cream">
        <SectionHeading
          title="Emotional Intelligence Workshop"
          subtitle="Olivet Height International School, GRA Phase 2 — Where the school leadership spoke up for their students."
          centered
        />
        <div className="max-w-5xl mx-auto space-y-8 sm:space-y-10">

          <div className="relative h-[240px] sm:h-[320px] md:h-[400px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/images/outreach/ohis/ohis-group-photo.jpeg"
              alt="Gilt Counselling Consult team with the full student body of Olivet Height International School, GRA Phase 2, in front of the school building"
              fill
              className="object-cover object-center"
              sizes="100vw"
              quality={60}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-5 sm:bottom-6 sm:left-8">
              <p className="text-white font-heading font-bold text-lg sm:text-2xl drop-shadow">Olivet Height International School</p>
              <p className="text-white/85 text-sm sm:text-base drop-shadow">GRA Phase 2, Port Harcourt</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
            <div className="space-y-4 text-gray-700">
              <p className="body-lg font-semibold text-soft-terracotta">
                Skills That Go Beyond the Classroom.
              </p>
              <p className="body-md text-justify">
                At Olivet Height International School, the Gilt Counselling Consult team delivered their
                Emotional Intelligence programme to an engaged student body, covering how to identify,
                understand, and express emotions — whether positive or challenging — in healthy and
                constructive ways.
              </p>
              <p className="body-md text-justify text-gray-600">
                The session resonated deeply, with students leaving equipped not just with knowledge,
                but with a renewed sense of self-awareness and confidence. The school&apos;s leadership
                was equally moved, recognising the session&apos;s direct impact on student mindset and
                future productivity.
              </p>
            </div>
            <div className="relative h-[260px] sm:h-[300px] md:h-[340px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/outreach/ohis/ohis-session-classroom.jpeg"
                alt="Olivet Height International School students engaged at their desks during the Gilt Counselling Consult emotional intelligence session"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={60}
                loading="lazy"
              />
            </div>
          </div>

          <div>
            <h3 className="font-heading font-bold text-lg sm:text-xl text-gray-900 mb-4 text-center">
              In Their Own Words
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-soft-beige">
                <div className="text-3xl text-soft-terracotta font-serif leading-none mb-3">&ldquo;</div>
                <p className="text-gray-700 leading-relaxed italic text-justify mb-4">
                  I am so grateful to have been given the opportunity to learn about emotional
                  intelligence. This is knowledge I did not know I needed — but now that I have it,
                  I feel truly empowered.
                </p>
                <div className="flex items-center gap-2">
                  <div className="h-0.5 w-6 bg-soft-terracotta rounded-full" />
                  <p className="text-sm font-semibold text-gray-600">Female Student</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-soft-beige">
                <div className="text-3xl text-soft-terracotta font-serif leading-none mb-3">&ldquo;</div>
                <p className="text-gray-700 leading-relaxed italic text-justify mb-4">
                  Through this teaching, I now understand my own emotions more deeply — and I have
                  learned how to express them well, whether I am going through something good
                  or something difficult.
                </p>
                <div className="flex items-center gap-2">
                  <div className="h-0.5 w-6 bg-soft-terracotta rounded-full" />
                  <p className="text-sm font-semibold text-gray-600">Female Student</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center">
            <div className="md:col-span-1 relative h-[220px] sm:h-[260px] rounded-xl overflow-hidden shadow-md">
              <Image
                src="/images/outreach/ohis/ohis-team-staff.jpeg"
                alt="The Gilt Counselling Consult team with school staff at Olivet Height International School following the emotional intelligence workshop"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 33vw"
                quality={60}
                loading="lazy"
              />
            </div>
            <div className="md:col-span-2">
              <blockquote className="border-l-4 border-soft-gold pl-5 sm:pl-6 italic text-gray-600 bg-white rounded-r-xl py-5 sm:py-6 pr-5 sm:pr-6 shadow-sm h-full flex flex-col justify-center">
                <p className="body-md text-justify leading-relaxed">
                  &ldquo;This programme has genuinely helped shape our students&apos; minds. They now have
                  a clearer understanding of how to approach life productively — how to handle their
                  emotions, relate better with others, and make decisions that serve their future.
                  We are grateful for this visit.&rdquo;
                </p>
                <footer className="mt-4 flex items-center gap-2">
                  <div className="h-0.5 w-6 bg-soft-gold rounded-full" />
                  <p className="text-sm font-semibold text-gray-700">The Principal, Olivet Height International School</p>
                </footer>
              </blockquote>
            </div>
          </div>

        </div>
      </section>

      <section className="section-container bg-off-white">
        <SectionHeading
          title="Emotional Intelligence Workshop"
          subtitle="The Grove School Secondary, GRA Phase 2 — A structured, curriculum-grade session that the school counsellor called transformative."
          centered
        />
        <div className="max-w-5xl mx-auto space-y-8 sm:space-y-10">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
            <div className="relative h-[300px] sm:h-[360px] md:h-[420px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/outreach/grove/grove-team-sign.jpeg"
                alt="Gilt Counselling Consult team of five in branded shirts standing in front of The Grove School Secondary sign"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={60}
                loading="lazy"
              />
            </div>
            <div className="space-y-4 text-gray-700">
              <p className="body-lg font-semibold text-soft-terracotta">
                Structure Meets Heart.
              </p>
              <p className="body-md text-justify">
                The Gilt Counselling Consult team brought a full, structured Emotional Intelligence
                session to The Grove School Secondary, GRA Phase 2 — complete with a projector
                presentation, visual aids, and interactive delivery. Students in their distinctive
                red and white uniforms filled the hall and gave the session their full attention.
              </p>
              <p className="body-md text-justify text-gray-600">
                The session covered the meaning of emotional intelligence, how to recognise personal
                emotional states, and — critically — how to regulate those emotions rather than be
                ruled by them. Students left with both language and tools they could apply immediately.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative h-[220px] sm:h-[260px] rounded-xl overflow-hidden shadow-md">
              <Image
                src="/images/outreach/grove/grove-session-presentation.jpeg"
                alt="Gilt Counselling Consult facilitators presenting Emotional Intelligence slides on a projector screen to Grove School Secondary students"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
                quality={60}
                loading="lazy"
              />
            </div>
            <div className="relative h-[220px] sm:h-[260px] rounded-xl overflow-hidden shadow-md">
              <Image
                src="/images/outreach/grove/grove-session-wide.jpeg"
                alt="Wide view of the Gilt Counselling Consult session at The Grove School Secondary showing facilitators, projector screen, and the full student audience"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
                quality={60}
                loading="lazy"
              />
            </div>
          </div>

          <div>
            <h3 className="font-heading font-bold text-lg sm:text-xl text-gray-900 mb-4 text-center">
              In Their Own Words
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-soft-beige">
                <div className="text-3xl text-soft-terracotta font-serif leading-none mb-3">&ldquo;</div>
                <p className="text-gray-700 leading-relaxed italic text-justify mb-4">
                  I am happy because I have finally learned how to regulate my emotions. I now
                  understand that I have the power to choose how I respond — and that makes
                  a real difference.
                </p>
                <div className="flex items-center gap-2">
                  <div className="h-0.5 w-6 bg-soft-terracotta rounded-full" />
                  <p className="text-sm font-semibold text-gray-600">Male Student</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-soft-beige">
                <div className="text-3xl text-soft-terracotta font-serif leading-none mb-3">&ldquo;</div>
                <p className="text-gray-700 leading-relaxed italic text-justify mb-4">
                  I have learned something I truly needed to hear — that managing my emotions is
                  not just possible, it is necessary. I now see the importance of it in a way
                  I never did before.
                </p>
                <div className="flex items-center gap-2">
                  <div className="h-0.5 w-6 bg-soft-terracotta rounded-full" />
                  <p className="text-sm font-semibold text-gray-600">Female Student</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center">
            <div className="md:col-span-1 relative h-[200px] sm:h-[240px] rounded-xl overflow-hidden shadow-md">
              <Image
                src="/images/outreach/grove/grove-students-seated.jpeg"
                alt="Grove School Secondary students seated attentively during the Gilt Counselling Consult emotional intelligence session"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                quality={60}
                loading="lazy"
              />
            </div>
            <div className="md:col-span-2">
              <blockquote className="border-l-4 border-soft-gold pl-5 sm:pl-6 italic text-gray-600 bg-white rounded-r-xl py-5 sm:py-6 pr-5 sm:pr-6 shadow-sm h-full flex flex-col justify-center">
                <p className="body-md text-justify leading-relaxed">
                  &ldquo;This teaching has truly enlightened our students on the importance of
                  self-regulation. They now have a much clearer understanding of their emotions
                  and how managing them well is foundational to everything — their relationships,
                  their learning, and their future.&rdquo;
                </p>
                <footer className="mt-4 flex items-center gap-2">
                  <div className="h-0.5 w-6 bg-soft-gold rounded-full" />
                  <p className="text-sm font-semibold text-gray-700">School Counsellor, The Grove School Secondary</p>
                </footer>
              </blockquote>
            </div>
          </div>

        </div>
      </section>

      <section className="section-container bg-warm-sand">
        <SectionHeading
          title="Our Core Values"
          subtitle="These principles guide everything we do and shape the care we provide."
          centered
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
          {coreValues.map((value, index) => (
            <div key={index} className="text-center">
              <div className={`${value.color} text-white rounded-xl p-4 sm:p-6 lg:p-8 mb-3 sm:mb-4 min-h-[130px] sm:min-h-[160px] lg:min-h-[200px] flex flex-col justify-center`}>
                <h3 className="font-heading font-bold text-base sm:text-xl lg:text-2xl mb-2 sm:mb-3">{value.name}</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed px-2 text-justify">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      
      <section className="section-container bg-warm-sand">
        <SectionHeading
          title="Why Choose Gilt Counselling?"
          subtitle="We combine professional excellence with genuine compassion for every person we serve."
          centered
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
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

      
      <section className="section-container bg-warm-cream">
        <SectionHeading
          title="Our Dedicated Consultants and Professional Counsellors"
          subtitle="Experienced professionals dedicated to your wellbeing and growth."
          centered
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
          {team.map((member, index) => (
            <Card key={index} className="text-center">
              <div className="mb-4 sm:mb-6 relative h-[200px] w-[200px] sm:h-[240px] sm:w-[240px] md:h-[260px] md:w-[260px] mx-auto rounded-lg overflow-hidden">
                <Image
                  src={member.image}
                  alt={`${member.name} - Professional Headshot`}
                  fill
                  className="object-cover object-top"
                  sizes="280px"
                  quality={60}
                  loading="lazy"
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
