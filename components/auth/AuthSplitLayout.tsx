'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link, { useLinkStatus } from 'next/link';

export function SiteLinkLabel({ children }: { children: React.ReactNode }) {
  const { pending } = useLinkStatus();
  return (
    <>
      {pending && (
        <span className="mr-2 inline-block h-4 w-4 rounded-full border-2 border-gray-900 border-t-transparent align-[-3px] motion-safe:animate-spin" aria-hidden="true" />
      )}
      {pending ? 'Opening site...' : children}
    </>
  );
}

interface AuthSplitLayoutProps {
  children: React.ReactNode;
  eyebrow: string;
  headline: string;
  description: string;
}

const whiteButtonClass =
  'inline-flex h-11 items-center gap-2 rounded-md bg-white px-5 text-[15px] font-medium text-gray-900 shadow-sm transition-colors duration-150 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 focus-visible:ring-offset-soft-terracotta';

export default function AuthSplitLayout({
  children,
  eyebrow,
  headline,
  description,
}: AuthSplitLayoutProps) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[60] flex overflow-y-auto bg-white font-body">
      <section className="flex min-h-full w-full flex-col lg:w-1/2">
        <header className="flex items-center justify-between px-6 pt-6 sm:px-8">
          <Link
            href="/"
            className="relative block h-14 w-32 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
            aria-label="Gilt Counselling Consult home"
          >
            <Image
              src="/Gilt Counselling Consult Profile.svg"
              alt=""
              fill
              priority
              sizes="128px"
              className="object-contain object-left"
            />
          </Link>
          <Link
            href="/"
            className="inline-flex h-11 items-center rounded-md border border-gray-300 px-4 text-sm font-medium text-gray-800 shadow-sm transition-colors duration-150 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 lg:hidden"
          >
            <SiteLinkLabel>Back to site</SiteLinkLabel>
          </Link>
        </header>

        <div className="flex flex-1 items-center justify-center px-6 py-12 sm:px-8">
          <div className="w-full max-w-[400px]">{children}</div>
        </div>
      </section>

      <aside className="panel-gold hidden min-h-full w-1/2 lg:flex lg:flex-col">
        <div className="flex flex-1 items-center px-12 py-24 xl:px-16">
          <div className="max-w-lg">
            <p className="eyebrow text-gray-900">{eyebrow}</p>
            <p className="mt-4 text-4xl font-semibold leading-[1.1] tracking-tight text-gray-900 xl:text-5xl">
              {headline}
            </p>
            <p className="mt-6 text-lg leading-relaxed text-gray-900/85">{description}</p>
            <Link href="/" className={`mt-8 ${whiteButtonClass}`}>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              <SiteLinkLabel>Back to site</SiteLinkLabel>
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}
