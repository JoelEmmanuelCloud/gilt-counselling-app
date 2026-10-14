'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import SectionHeading from '@/components/ui/SectionHeading';
import Skeleton from '@/components/ui/Skeleton';
import { DEFAULT_STAFF_TIER, STAFF_TIERS, type StaffTier } from '@/lib/staffInput';

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

const TIER_CARD_SIZE: Record<StaffTier, CardSize> = {
  leadership: 'lg',
  consultant: 'lg',
  administration: 'md',
  volunteer: 'sm',
};

function MemberPhoto({ member, sizes }: { member: TeamMember; sizes: string }) {
  return member.photo ? (
    <Image
      src={member.photo}
      alt={`${member.name} - Professional Headshot`}
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

function MemberCard({ member, size }: { member: TeamMember; size: CardSize }) {
  if (size === 'sm') {
    return (
      <li className="w-36 text-center sm:w-40">
        <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full bg-warm-cream shadow-sm ring-4 ring-white sm:h-28 sm:w-28">
          <MemberPhoto member={member} sizes="112px" />
        </div>
        <h4 className="mt-3 font-heading text-base font-semibold tracking-tight text-gray-900">{member.name}</h4>
        <p className="mt-0.5 text-sm text-gray-600">{member.role}</p>
      </li>
    );
  }

  return (
    <li className={`w-full ${size === 'lg' ? 'max-w-[280px]' : 'max-w-[240px]'}`}>
      <article className="h-full overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-gray-200/70 transition-shadow duration-300 hover:shadow-md">
        <div className="relative aspect-[4/5] w-full bg-warm-cream">
          <MemberPhoto member={member} sizes={size === 'lg' ? '280px' : '240px'} />
        </div>
        <div className="p-4 text-center sm:p-5">
          <h4 className={`font-heading font-semibold tracking-tight text-gray-900 ${size === 'lg' ? 'text-lg' : 'text-base'}`}>{member.name}</h4>
          <p className="mt-1 text-sm font-medium text-gray-700">{member.role}</p>
          {member.credentials && <p className="eyebrow mt-2 text-xs text-gray-500">{member.credentials}</p>}
        </div>
      </article>
    </li>
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
    members: members.filter((member) => !member.featured && (member.tier || DEFAULT_STAFF_TIER) === tier.value),
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
        <section className="section-container bg-off-white">
          <SectionHeading
            title="Our Dedicated Consultants and Professional Counsellors"
            subtitle="Experienced professionals dedicated to your wellbeing and growth."
            centered
          />
          <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16">
            {groups.map((group) => (
              <div key={group.value} role="group" aria-labelledby={`team-tier-${group.value}`}>
                <div className="mb-6 flex items-center gap-4 sm:mb-8">
                  <span className="h-px flex-1 bg-gray-300" aria-hidden="true" />
                  <h3 id={`team-tier-${group.value}`} className="eyebrow text-center uppercase text-gray-700">
                    {group.label}
                  </h3>
                  <span className="h-px flex-1 bg-gray-300" aria-hidden="true" />
                </div>
                <ul className={`flex flex-wrap justify-center ${TIER_CARD_SIZE[group.value] === 'sm' ? 'gap-x-6 gap-y-8 sm:gap-x-10' : 'gap-6 md:gap-8'}`}>
                  {group.members.map((member) => (
                    <MemberCard key={member._id} member={member} size={TIER_CARD_SIZE[group.value]} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
