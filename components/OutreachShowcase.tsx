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
      { text: 'I have struggled with anger for a long time. This session showed me practical ways to manage my reactions — to pause, reflect, and respond rather than explode.', author: 'Male Student' },
      { text: 'I had never truly understood how to read what others were feeling. What I learned today opened my eyes — I know I can do better at understanding the people around me.', author: 'Female Student' },
    ],
    authority: {
      text: 'This session has enriched my own understanding of emotional intelligence. It gave me fresh insight into how to build and sustain healthy, meaningful relationships — personally and professionally.',
      role: 'School Counsellor, Niger Delta Science School',
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
      { text: 'I arrived this morning feeling depressed and heavy inside. But after this session, I genuinely feel better — lighter. Something shifted in me today.', author: 'Male Student' },
      { text: 'This presentation on Emotional Intelligence gave me real clues on how to handle my anger. I have always struggled with it, but now I have a clearer picture of what to do.', author: 'Female Student' },
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
      { text: 'I am so grateful to have been given the opportunity to learn about emotional intelligence. This is knowledge I did not know I needed — but now I feel truly empowered.', author: 'Female Student' },
      { text: 'Through this teaching, I now understand my own emotions more deeply — and I have learned how to express them well, whether in good times or difficult ones.', author: 'Female Student' },
    ],
    authority: {
      text: 'This programme has genuinely helped shape our students\' minds. They now understand how to handle emotions, relate better with others, and make decisions that serve their future.',
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
      { text: 'I am happy because I have finally learned how to regulate my emotions. I understand now that I have the power to choose how I respond — and that makes a real difference.', author: 'Male Student' },
      { text: 'I have learned something I truly needed to hear — that managing my emotions is not just possible, it is necessary. I see its importance in a way I never did before.', author: 'Female Student' },
    ],
    authority: {
      text: 'This teaching has truly enlightened our students on the importance of self-regulation. They now understand that managing emotions well is foundational to everything — relationships, learning, and their future.',
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
      { text: 'This teaching has shown me the right way to approach people. How I carry myself emotionally shapes every interaction I have.', author: 'Student 1' },
      { text: 'I now understand why Emotional Intelligence matters — so that I am never overwhelmed by my feelings, but can face any situation with a clear and steady mind.', author: 'Student 2' },
      { text: 'Emotional Intelligence begins with me — not just knowing my own emotions, but also recognising and understanding the emotions of the people around me.', author: 'Student 3' },
    ],
    authority: {
      text: 'Every student needs emotional intelligence. It is what guides them in how to respond to the world — to challenges, to people, to pressure. This programme gave our students that foundation.',
      role: 'The Principal, Priqueen International Academy',
    },
    photos: [
      { src: '/images/outreach/priqueen/priqueen-student-focused.jpeg', alt: 'Priqueen student focused and taking notes' },
      { src: '/images/outreach/priqueen/priqueen-hands-raised.jpeg', alt: 'Students raising hands in participation' },
      { src: '/images/outreach/priqueen/priqueen-group-photo.jpeg', alt: 'Group photo at Priqueen International Academy' },
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
          { value: '5', label: 'Schools Visited' },
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
            <span className={`text-[10px] mb-0.5 ${i === activeIndex ? 'text-white/70' : 'text-gray-400'}`}>{s.number}</span>
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
              <div className="md:col-span-2 relative h-[260px] sm:h-[300px] md:h-full md:min-h-[400px] overflow-hidden rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">
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
