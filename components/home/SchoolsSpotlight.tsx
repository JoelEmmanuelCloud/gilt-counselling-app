import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Marquee from '@/components/ui/Marquee';
import { outreachStats, schools } from '@/components/OutreachShowcase';
import { brandTone } from '@/lib/brandTones';

export default function SchoolsSpotlight() {
  return (
    <section className="overflow-hidden bg-off-white py-10 sm:py-14 md:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-2 lg:gap-12">
          <div>
            <span className="accent-bar mb-4 sm:mb-5" aria-hidden="true" />
            <p className="eyebrow mb-3 text-gilt-gold-strong">Schools Outreach Programme</p>
            <h2 className="heading-lg mb-4">
              Emotional Intelligence in <span className="text-accent">{schools.length} schools</span> across Port Harcourt
            </h2>
            <p className="body-md text-left">
              Our team takes emotional intelligence education into secondary school assembly halls and classrooms, helping
              students understand, express and manage their emotions.
            </p>
          </div>
          <dl className="grid grid-cols-3 gap-3 sm:gap-4">
            {outreachStats.map((stat, index) => (
              <div key={stat.label} className={`rounded-lg border-t-4 bg-white p-3 text-center shadow-sm sm:p-4 ${brandTone(index).border}`}>
                <dt className="text-xs uppercase tracking-wider text-gray-600">{stat.label}</dt>
                <dd className={`mt-1 font-heading text-lg font-bold sm:text-2xl ${brandTone(index).text}`}>{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-[1600px] sm:mt-10">
        <Marquee label="Schools we have visited" durationSeconds={schools.length * 7}>
          {schools.map((school, index) => (
            <li key={school.id} className="w-60 flex-shrink-0 sm:w-72">
              <Link
                href="/outreach#schools"
                className="group block h-full overflow-hidden rounded-lg bg-gray-900 shadow-md focus:outline-none focus-visible:ring-4 focus-visible:ring-gilt-gold"
              >
                <span className="relative block aspect-[4/3]">
                  <Image
                    src={school.hero.src}
                    alt={school.hero.alt}
                    fill
                    sizes="288px"
                    quality={60}
                    className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" aria-hidden="true" />
                  <span className={`absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-xs font-bold text-white ${brandTone(index).solid}`}>
                    {school.number}
                  </span>
                  <span className="absolute inset-x-0 bottom-0 block p-4">
                    <span className="block font-heading text-base font-bold leading-snug text-white">{school.name}</span>
                    <span className="block text-sm text-white/80">{school.location}</span>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </Marquee>
      </div>

      <div className="mt-8 flex justify-center px-4 sm:mt-10">
        <Link href="/outreach#schools" className="btn-primary w-full sm:w-auto">
          Explore the Schools Programme
        </Link>
      </div>
    </section>
  );
}
