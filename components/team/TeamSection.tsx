'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import SectionHeading from '@/components/ui/SectionHeading';
import Skeleton from '@/components/ui/Skeleton';
import { DEFAULT_STAFF_TIER, STAFF_TIERS, isStaffTier, type StaffTier } from '@/lib/staffInput';

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  title?: string;
  credentials?: string;
  bio?: string;
  photo?: string;
  tier?: StaffTier;
  featured: boolean;
}

type CardSize = 'lg' | 'md' | 'sm';

const TIER_DISPLAY: Record<StaffTier, { size: CardSize; subtitle: string }> = {
  board: { size: 'lg', subtitle: 'Distinguished leaders who guide our vision, governance and partnerships.' },
  team: { size: 'lg', subtitle: 'Experienced professionals dedicated to your wellbeing and growth.' },
  ambassador: { size: 'md', subtitle: 'Advocates who carry our mission into schools, families and communities.' },
  volunteer: { size: 'sm', subtitle: 'Generous people who give their time to support our work.' },
};

const MARQUEE_MIN_MEMBERS = 3;

const MARQUEE_SPEED = 40;

const EDGE_FADE = 'linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)';

function MemberPhoto({ member, sizes, decorative }: { member: TeamMember; sizes: string; decorative: boolean }) {
  return member.photo ? (
    <Image
      src={member.photo}
      alt={decorative ? '' : `${member.name} - Professional Headshot`}
      fill
      className="object-cover object-top"
      sizes={sizes}
      quality={60}
      loading="lazy"
    />
  ) : (
    <span className="flex h-full items-center justify-center text-4xl font-semibold text-gray-400" aria-hidden="true">
      {member.name.charAt(0)}
    </span>
  );
}

function MemberCard({ member, size, tier, decorative }: { member: TeamMember; size: CardSize; tier: StaffTier; decorative: boolean }) {
  if (size === 'sm') {
    return (
      <li className="w-36 flex-shrink-0 text-center sm:w-40">
        <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full bg-warm-cream shadow-sm ring-4 ring-white sm:h-28 sm:w-28">
          <MemberPhoto member={member} sizes="112px" decorative={decorative} />
        </div>
        <h3 className="mt-3 font-heading text-base font-semibold tracking-tight text-gray-900">{member.name}</h3>
        <p className="mt-0.5 text-sm text-gray-600">{member.role}</p>
      </li>
    );
  }

  return (
    <li className={`flex-shrink-0 ${size === 'lg' ? 'w-56 sm:w-64' : 'w-48 sm:w-52'}`}>
      <article className="h-full overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-gray-200/70 transition-shadow duration-300 hover:shadow-md">
        <div className="relative aspect-[4/5] w-full bg-warm-cream">
          <MemberPhoto member={member} sizes={size === 'lg' ? '256px' : '208px'} decorative={decorative} />
        </div>
        <div className="p-4 text-center sm:p-5">
          {tier === 'board' && <p className="eyebrow mb-1.5 text-xs uppercase text-gilt-gold-strong">{member.role}</p>}
          <h3 className={`font-heading font-semibold tracking-tight text-gray-900 ${size === 'lg' ? 'text-lg' : 'text-base'}`}>{member.name}</h3>
          {tier !== 'board' && <p className="mt-1 text-sm font-medium text-gray-700">{member.role}</p>}
          {member.credentials && <p className="eyebrow mt-2 text-xs text-gray-500">{member.credentials}</p>}
        </div>
      </article>
    </li>
  );
}

function MemberMarquee({ members, tier }: { members: TeamMember[]; tier: StaffTier }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [listWidth, setListWidth] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const { size } = TIER_DISPLAY[tier];

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    const list = listRef.current;
    if (!viewport || !list) return;
    const measure = () => {
      setListWidth(list.scrollWidth);
      setViewportWidth(viewport.clientWidth);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(list);
    return () => observer.disconnect();
  }, [members]);

  const overflowing = listWidth > viewportWidth;
  const animate = !reducedMotion && listWidth > 0 && (overflowing || members.length >= MARQUEE_MIN_MEMBERS);
  const copies = animate ? Math.max(2, Math.ceil(viewportWidth / listWidth) + 1) : 1;
  const gap = size === 'sm' ? 'gap-6 sm:gap-10' : 'gap-6 md:gap-8';
  const trailing = size === 'sm' ? 'pr-6 sm:pr-10' : 'pr-6 md:pr-8';

  const renderList = (copy: number) => (
    <ul
      key={copy}
      ref={copy === 0 ? listRef : undefined}
      aria-hidden={copy > 0 || undefined}
      className={`flex w-max flex-shrink-0 items-stretch ${gap} ${animate ? trailing : ''}`}
    >
      {members.map((member) => (
        <MemberCard key={member._id} member={member} size={size} tier={tier} decorative={copy > 0} />
      ))}
    </ul>
  );

  return (
    <div
      ref={viewportRef}
      className={`group py-2 ${animate ? 'overflow-hidden' : overflowing ? 'overflow-x-auto' : 'flex justify-center'}`}
      style={animate ? { maskImage: EDGE_FADE, WebkitMaskImage: EDGE_FADE } : undefined}
    >
      <div
        className={`flex w-max ${animate ? 'animate-marquee-right group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]' : ''}`}
        style={
          animate
            ? ({
                '--marquee-distance': `${listWidth}px`,
                animationDuration: `${Math.max(20, Math.round(listWidth / MARQUEE_SPEED))}s`,
              } as React.CSSProperties)
            : undefined
        }
      >
        {Array.from({ length: copies }, (_, copy) => renderList(copy))}
      </div>
    </div>
  );
}

export default function TeamSection() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/staff', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
        return response.json();
      })
      .then((data) => setMembers(Array.isArray(data) ? data : []))
      .catch((error) => {
        if (error.name === 'AbortError') return;
        console.error('Failed to load team members', error);
        setFailed(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, []);

  const featured = members.filter((member) => member.featured);
  const groups = STAFF_TIERS.map((tier) => ({
    ...tier,
    members: members.filter((member) => !member.featured && (isStaffTier(member.tier) ? member.tier : DEFAULT_STAFF_TIER) === tier.value),
  })).filter((group) => group.members.length > 0);

  if (loading) {
    return (
      <>
        <section className="section-container bg-warm-cream" role="status" aria-live="polite">
          <span className="sr-only">Loading our team</span>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center" aria-hidden="true">
            <Skeleton className="h-[280px] sm:h-[340px] md:h-[420px] w-full max-w-xs sm:max-w-sm md:max-w-[380px] mx-auto" />
            <div className="space-y-3">
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-7 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        </section>
        <section className="section-container bg-off-white" aria-hidden="true">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
            {[0, 1, 2].map((i) => (
              <div key={i} className="card text-center">
                <Skeleton className="mx-auto mb-4 h-[200px] w-[200px] sm:h-[240px] sm:w-[240px]" />
                <Skeleton className="mx-auto mb-2 h-5 w-2/3" />
                <Skeleton className="mx-auto h-4 w-1/2" />
              </div>
            ))}
          </div>
        </section>
      </>
    );
  }

  if (failed) {
    return (
      <section className="section-container bg-off-white">
        <p className="max-w-3xl mx-auto rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-800" role="alert">
          We couldn&apos;t load our team right now. Please refresh the page to try again.
        </p>
      </section>
    );
  }

  return (
    <>
      {featured.map((member) => (
        <section key={member._id} className="section-container bg-warm-cream">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
              {member.photo && (
                <div className="relative h-[280px] sm:h-[340px] md:h-[420px] w-full max-w-xs sm:max-w-sm md:max-w-[380px] mx-auto rounded-lg overflow-hidden">
                  <Image
                    src={member.photo}
                    alt={`${member.name} - ${member.role}`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 380px"
                    quality={60}
                  />
                </div>
              )}
              <div>
                <p className="eyebrow text-gray-600 mb-3">{member.role}</p>
                <h2 className="heading-md mb-2">{member.name}</h2>
                {member.title && <p className="font-semibold text-gray-800 mb-1">{member.title}</p>}
                {member.credentials && <p className="text-sm text-gray-600 mb-4">{member.credentials}</p>}
                {member.bio && <p className="text-gray-700 leading-relaxed text-left whitespace-pre-line">{member.bio}</p>}
              </div>
            </div>
          </div>
        </section>
      ))}

      {groups.length > 0 && (
        <section className="section-container bg-off-white space-y-14 sm:space-y-20" aria-label="Our people">
          {groups.map((group) => (
            <div key={group.value}>
              <SectionHeading title={group.label} subtitle={TIER_DISPLAY[group.value].subtitle} centered />
              <MemberMarquee members={group.members} tier={group.value} />
            </div>
          ))}
        </section>
      )}
    </>
  );
}
