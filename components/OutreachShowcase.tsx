'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface Quote { text: string; author: string; }
interface Photo { src: string; alt: string; }

interface School {
  id: string;
  number: string;
  name: string;
  short: string;
  location: string;
  hero: Photo;
  narrative: [string, string];
  quotes: Quote[];
  authority?: { text: string; role: string };
  photos: [Photo, Photo, Photo];
}

const schools: School[] = [
  {
    id: 'ndss',
    number: '01',
    name: 'Niger Delta Science School',
    short: 'NDSS',
    location: 'Rumuola',
    hero: {
      src: '/images/outreach/ndss/ndss-session-hall.jpeg',
      alt: 'Hundreds of Niger Delta Science School students gathered in the assembly hall',
    },
    narrative: [
      'Our team visited Niger Delta Science School, Rumuola, for a school-wide session on emotional intelligence and self-awareness. The assembly hall filled with hundreds of students who gave the session their complete attention.',
      'Following the session, students came forward to share how the teaching had already begun to shift their perspective on managing emotions and understanding others.',
    ],
    quotes: [
      { text: 'I have been struggling with anger issues. Thank God, the teaching on Emotional Intelligence has taught me how I can control anger.', author: 'Student' },
      { text: 'I did not know how to understand people\'s emotions, but with this teaching, I will do better.', author: 'Student' },
    ],
    authority: {
      text: 'This teaching has enlightened me to have a successful relationship.',
      role: 'Counsellor, Niger Delta Science School',
    },
    photos: [
      { src: '/images/outreach/ndss/ndss-school-gate.jpeg', alt: 'Students at Niger Delta Science School gate' },
      { src: '/images/outreach/ndss/ndss-students-attentive.jpeg', alt: 'Students listening attentively' },
      { src: '/images/outreach/ndss/ndss-counsellor-students.jpeg', alt: 'Counsellor with NDSS students' },
    ],
  },
  {
    id: 'gbhs',
    number: '02',
    name: 'Great Beulah Heritage School',
    short: 'GBHS',
    location: 'Rumuigbo',
    hero: {
      src: '/images/outreach/gbhs/gbhs-counsellor-students.jpeg',
      alt: 'Gilt Counselling Consult facilitator with Great Beulah Heritage School students in front of the branded banner',
    },
    narrative: [
      'Gilt Counselling Consult brought their Emotional Intelligence programme to Great Beulah Heritage School, Rumuigbo — and the impact was felt even before the session ended. One student arrived that morning feeling low and withdrawn.',
      'The session equipped students with practical tools for recognising their emotional states, understanding their triggers, and managing their responses — skills that matter every single day.',
    ],
    quotes: [
      { text: 'I was feeling depressed earlier before the team\'s arrival, but after the event, I feel better.', author: 'Student' },
      { text: 'The teaching on Emotional Intelligence has given me clues on how to manage anger issues.', author: 'Student' },
    ],
    photos: [
      { src: '/images/outreach/gbhs/gbhs-session-active.jpeg', alt: 'Facilitator engaging GBHS students' },
      { src: '/images/outreach/gbhs/gbhs-students-engaged.jpeg', alt: 'Great Beulah Heritage School students listening' },
      { src: '/images/outreach/gbhs/gbhs-students-classroom.jpeg', alt: 'Students engaged in classroom session' },
    ],
  },
  {
    id: 'ohis',
    number: '03',
    name: 'Olivet Height International School',
    short: 'OHIS',
    location: 'GRA Phase 2',
    hero: {
      src: '/images/outreach/ohis/ohis-group-photo.jpeg',
      alt: 'Gilt Counselling Consult team with the full student body of Olivet Height International School',
    },
    narrative: [
      'At Olivet Height International School, GRA Phase 2, the team delivered their Emotional Intelligence programme to an engaged student body — covering how to identify, understand, and express emotions in healthy and constructive ways.',
      'Students left equipped not just with knowledge, but with renewed self-awareness and confidence. The school\'s principal was equally moved by the session\'s impact on student mindset.',
    ],
    quotes: [
      { text: 'I am very happy for the opportunity to learn about Emotional Intelligence.', author: 'Student' },
      { text: 'Through the teaching I got to understand my emotions and how to express them in both positive and negative situations.', author: 'Student' },
    ],
    authority: {
      text: 'This has helped in shaping the students\' minds on how to have a productive life.',
      role: 'The Principal, Olivet Height International School',
    },
    photos: [
      { src: '/images/outreach/ohis/ohis-session-classroom.jpeg', alt: 'Students at desks during OHIS session' },
      { src: '/images/outreach/ohis/ohis-team-staff.jpeg', alt: 'Gilt team with OHIS school staff' },
      { src: '/images/outreach/ohis/ohis-group-photo.jpeg', alt: 'Full group at Olivet Height International School' },
    ],
  },
  {
    id: 'grove',
    number: '04',
    name: 'The Grove School Secondary',
    short: 'Grove',
    location: 'GRA Phase 2',
    hero: {
      src: '/images/outreach/grove/grove-team-sign.jpeg',
      alt: 'Gilt Counselling Consult team in branded shirts standing in front of The Grove School Secondary sign',
    },
    narrative: [
      'The Gilt Counselling Consult team brought a full, structured session to The Grove School Secondary — complete with a projector presentation, visual aids, and interactive delivery. Students in their red and white uniforms filled the hall.',
      'The session covered self-awareness, emotional regulation, and the critical skill of responding rather than reacting — and it clearly landed deeply with both students and staff.',
    ],
    quotes: [
      { text: 'I am happy because I have learnt how to regulate my emotions.', author: 'Student' },
      { text: 'I have learnt and seen the need to manage my emotions.', author: 'Student' },
    ],
    authority: {
      text: 'The teaching has enlightened the students on the need for self-regulation.',
      role: 'School Counsellor, The Grove School Secondary',
    },
    photos: [
      { src: '/images/outreach/grove/grove-session-presentation.jpeg', alt: 'Live EI presentation with projector at Grove School' },
      { src: '/images/outreach/grove/grove-session-wide.jpeg', alt: 'Wide view of Grove School session' },
      { src: '/images/outreach/grove/grove-students-seated.jpeg', alt: 'Grove School students seated attentively' },
    ],
  },
  {
    id: 'priqueen',
    number: '05',
    name: 'Priqueen International Academy',
    short: 'Priqueen',
    location: 'Rumuigbo',
    hero: {
      src: '/images/outreach/priqueen/priqueen-hands-raised.jpeg',
      alt: 'Priqueen International Academy students raising their hands to participate in the session',
    },
    narrative: [
      'At Priqueen International Academy, the team encountered something rare — students who didn\'t just receive the session, but truly processed it. Hands went up, questions were asked, and the reflections were among the most thoughtful of the entire outreach.',
      'Three students articulated what they had learned with remarkable clarity. The principal\'s endorsement tied it together with a statement that speaks to the heart of why this work matters.',
    ],
    quotes: [
      { text: 'The teaching has made me understand the right way to approach people.', author: 'Student 1' },
      { text: 'I have seen the need for Emotional Intelligence so as not to get overwhelmed by emotions in any given situation.', author: 'Student 2' },
      { text: 'I have learnt that Emotional Intelligence starts with me, and not just knowing my emotions, but also knowing and understanding the emotions of others around me.', author: 'Student 3' },
    ],
    photos: [
      { src: '/images/outreach/priqueen/priqueen-student-focused.jpeg', alt: 'Priqueen student focused and taking notes' },
      { src: '/images/outreach/priqueen/priqueen-hands-raised.jpeg', alt: 'Students raising hands in participation' },
      { src: '/images/outreach/priqueen/priqueen-group-photo.jpeg', alt: 'Group photo at Priqueen International Academy' },
    ],
  },
  {
    id: 'christ',
    number: '06',
    name: 'Christ International School',
    short: 'Christ Intl',
    location: 'Port Harcourt',
    hero: {
      src: '/images/outreach/christ/christ-group-photo.jpeg',
      alt: 'Gilt Counselling Consult team and Christ International School staff group photo with event banner',
    },
    narrative: [
      'Gilt Counselling Consult brought the Emotional Intelligence programme to Christ International School, continuing the outreach\'s mission of equipping students with practical tools for self-awareness and emotional regulation.',
      'Students engaged with the session\'s message on managing emotions, and the school\'s leadership affirmed the lasting value of the teaching beyond the classroom.',
    ],
    quotes: [
      { text: 'There is need to control our emotions.', author: 'Student' },
      { text: 'I learnt how to balance and regulate my emotions and also relate with others.', author: 'Student' },
    ],
    authority: {
      text: 'We need emotional intelligence in order to build a life of success beyond the classroom.',
      role: 'The Principal, Christ International School',
    },
    photos: [
      { src: '/images/outreach/christ/christ-session-presentation.jpeg', alt: 'Facilitator presenting to Christ International School students' },
      { src: '/images/outreach/christ/christ-students-engaged.jpeg', alt: 'Christ International School student raising her hand in participation' },
      { src: '/images/outreach/christ/christ-student-speaking.jpeg', alt: 'Christ International School student speaking on the microphone' },
    ],
  },
  {
    id: 'als',
    number: '07',
    name: 'Abundant Life School',
    short: 'Abundant Life',
    location: 'Port Harcourt',
    hero: {
      src: '/images/outreach/als/als-hero-group.jpeg',
      alt: 'Abundant Life School students filling the hall for the Emotional Intelligence session',
    },
    narrative: [
      'Gilt Counselling Consult brought their Emotional Intelligence programme to Abundant Life School, where students filled the hall for a session centred on self-worth, self-belief, and esteeming one\'s own value.',
      'Several students stepped forward to share what the teaching meant to them, and the school\'s principal, moved by the session\'s impact, asked that it become a termly fixture at the school.',
    ],
    quotes: [
      { text: 'I learnt that I should never stop believing in myself, I should have a high regard for myself.', author: 'Student' },
      { text: 'My highlight from today\'s teaching is that we should always esteem ourselves by saying words like "I am beautiful, smart, intelligent," etc. To other students like me, I want to tell you that you should believe in yourself.', author: 'Student' },
      { text: 'I learnt that I am valuable and I am important. To other students out there, don\'t let people define you, you are valuable, so just believe in yourself.', author: 'Student' },
      { text: 'I have learnt that no matter the matter, I matter.', author: 'Student' },
    ],
    authority: {
      text: 'The teaching was a timely one, and I as a person have learned a lot. I have asked the team to make it a termly thing.',
      role: 'The Principal, Abundant Life School',
    },
    photos: [
      { src: '/images/outreach/als/als-session-standing.jpeg', alt: 'Abundant Life School student standing to speak into the microphone during the session' },
      { src: '/images/outreach/als/als-counsellor-student-mic.jpeg', alt: 'School counsellor standing beside a student sharing her reflection on the microphone' },
      { src: '/images/outreach/als/als-students-attentive.jpeg', alt: 'Abundant Life School students listening attentively in their uniforms' },
    ],
  },
];

const panelVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0, transition: { duration: 0.25, ease: 'easeIn' as const } }),
};

const quoteVariants = {
  enter: { opacity: 0, y: 14 },
  center: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25 } },
};

const photoVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.1, ease: 'easeOut' as const },
  }),
};

export default function OutreachShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [activeQuote, setActiveQuote] = useState(0);
  const [photosKey, setPhotosKey] = useState(0);

  const school = schools[activeIndex];

  const navigate = useCallback((newIndex: number) => {
    if (newIndex === activeIndex) return;
    setDirection(newIndex > activeIndex ? 1 : -1);
    setActiveIndex(newIndex);
    setActiveQuote(0);
    setPhotosKey(k => k + 1);
  }, [activeIndex]);

  const prev = () => navigate(activeIndex > 0 ? activeIndex - 1 : schools.length - 1);
  const next = () => navigate(activeIndex < schools.length - 1 ? activeIndex + 1 : 0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveQuote(q => (q + 1) % school.quotes.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [activeIndex, school.quotes.length]);

  return (
    <div className="w-full">

      {/* Stats bar */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mb-8 sm:mb-10">
        {[
          { value: '7', label: 'Schools Visited' },
          { value: '1,000+', label: 'Students Reached' },
          { value: 'May 2026', label: 'Port Harcourt' },
        ].map(stat => (
          <div key={stat.label} className="text-center">
            <p className="text-xl sm:text-2xl font-heading font-bold text-soft-terracotta">{stat.value}</p>
            <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Tab navigation */}
      <div className="flex overflow-x-auto scrollbar-hide gap-2 pb-3 mb-6 sm:mb-8 justify-start sm:justify-center">
        {schools.map((s, i) => (
          <button
            key={s.id}
            onClick={() => navigate(i)}
            className={`flex-shrink-0 flex flex-col items-center px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide uppercase transition-all duration-300 border ${
              i === activeIndex
                ? 'bg-soft-terracotta text-white border-soft-terracotta shadow-md scale-105'
                : 'bg-white text-gray-500 border-soft-beige hover:border-soft-terracotta hover:text-soft-terracotta'
            }`}
          >
            <span className={`text-xs mb-0.5 ${i === activeIndex ? 'text-white/70' : 'text-gray-400'}`}>{s.number}</span>
            <span>{s.short}</span>
          </button>
        ))}
      </div>

      {/* Main animated panel */}
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg border border-soft-beige">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={school.id}
            custom={direction}
            variants={panelVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            {/* Top: hero + content */}
            <div className="grid grid-cols-1 md:grid-cols-5">

              {/* Hero image */}
              <div className="md:col-span-2 relative h-[260px] sm:h-[300px] md:h-full md:min-h-[400px] lg:min-h-[450px] xl:min-h-[500px] overflow-hidden rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">
                <Image
                  src={school.hero.src}
                  alt={school.hero.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  quality={60}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-black/20" />
                <div className="absolute bottom-4 left-4 md:hidden">
                  <span className="text-white/70 text-xs font-semibold uppercase tracking-widest">{school.number}</span>
                  <p className="text-white font-heading font-bold text-lg leading-tight">{school.name}</p>
                  <p className="text-white/80 text-sm">{school.location}</p>
                </div>
              </div>

              {/* Content */}
              <div className="md:col-span-3 p-5 sm:p-7 lg:p-8 flex flex-col gap-5">

                {/* School name — desktop only */}
                <div className="hidden md:block">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-soft-terracotta text-xs font-bold uppercase tracking-widest">{school.number}</span>
                    <div className="h-px flex-1 bg-soft-beige" />
                    <span className="text-gray-400 text-xs uppercase tracking-wider">{school.location}</span>
                  </div>
                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-gray-900">{school.name}</h3>
                </div>

                {/* Narrative */}
                <div className="space-y-2">
                  {school.narrative.map((p, i) => (
                    <p key={i} className="text-gray-600 text-sm sm:text-base leading-relaxed text-justify">{p}</p>
                  ))}
                </div>

                {/* Quote carousel */}
                <div className="bg-warm-cream rounded-xl p-4 sm:p-5 relative overflow-hidden">
                  <div className="text-2xl text-soft-terracotta font-serif leading-none mb-2">&ldquo;</div>
                  <div className="min-h-[72px] flex items-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeQuote}
                        variants={quoteVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="w-full"
                      >
                        <p className="text-gray-700 italic text-sm sm:text-base leading-relaxed mb-2">
                          {school.quotes[activeQuote].text}
                        </p>
                        <p className="text-xs font-semibold text-soft-terracotta uppercase tracking-wider">
                          — {school.quotes[activeQuote].author}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  {/* Quote dots */}
                  <div className="flex gap-1.5 mt-3">
                    {school.quotes.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveQuote(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i === activeQuote ? 'w-5 bg-soft-terracotta' : 'w-1.5 bg-soft-beige'
                        }`}
                        aria-label={`Quote ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Authority quote */}
                {school.authority && (
                  <div className="border-l-3 border-soft-gold pl-4 py-1" style={{ borderLeftWidth: '3px', borderLeftColor: '#D9A85D' }}>
                    <p className="text-gray-600 italic text-sm leading-relaxed mb-1.5">
                      &ldquo;{school.authority.text}&rdquo;
                    </p>
                    <p className="text-xs font-semibold text-gray-500">{school.authority.role}</p>
                  </div>
                )}

              </div>
            </div>

            {/* Photo strip */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 p-3 sm:p-4 pt-0 border-t border-soft-beige mt-2">
              {school.photos.map((photo, i) => (
                <motion.div
                  key={`${school.id}-photo-${i}-${photosKey}`}
                  custom={i}
                  variants={photoVariants}
                  initial="hidden"
                  animate="visible"
                  className="relative h-[110px] sm:h-[130px] md:h-[150px] rounded-lg overflow-hidden"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 33vw, 20vw"
                    quality={60}
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Prev / Next navigation */}
      <div className="flex items-center justify-between mt-4 sm:mt-5">
        <button
          onClick={prev}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-soft-terracotta transition-colors duration-200 group"
        >
          <span className="w-8 h-8 rounded-full border border-soft-beige flex items-center justify-center group-hover:border-soft-terracotta transition-colors duration-200">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </span>
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Progress dots */}
        <div className="flex gap-2 items-center">
          {schools.map((_, i) => (
            <button
              key={i}
              onClick={() => navigate(i)}
              className={`rounded-full transition-all duration-300 ${
                i === activeIndex ? 'w-6 h-2 bg-soft-terracotta' : 'w-2 h-2 bg-soft-beige hover:bg-soft-terracotta/50'
              }`}
              aria-label={`Go to school ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-soft-terracotta transition-colors duration-200 group"
        >
          <span className="hidden sm:inline">Next</span>
          <span className="w-8 h-8 rounded-full border border-soft-beige flex items-center justify-center group-hover:border-soft-terracotta transition-colors duration-200">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </button>
      </div>

    </div>
  );
}
