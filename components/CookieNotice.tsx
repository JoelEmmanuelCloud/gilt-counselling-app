'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const STORAGE_KEY = 'cookie-notice-dismissed';

export default function CookieNotice() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      setVisible(localStorage.getItem(STORAGE_KEY) !== 'true');
    } catch {
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch (error) {
      console.error('Failed to remember the cookie notice dismissal', error);
    }
    setVisible(false);
  };

  if (!visible || pathname?.startsWith('/admin')) return null;

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="fixed bottom-4 left-4 right-24 z-50 rounded-lg border-t-4 border-gilt-gold bg-gray-900 p-4 text-white shadow-xl sm:right-auto sm:max-w-sm sm:p-5"
    >
      <p className="text-sm leading-relaxed text-gray-200">
        We only use essential browser storage to keep this website working. We don&apos;t use tracking or advertising
        cookies.{' '}
        <Link href="/cookies" className="font-semibold text-gilt-gold underline underline-offset-2 hover:text-gilt-orange">
          Cookie Policy
        </Link>
      </p>
      <button
        type="button"
        onClick={dismiss}
        className="mt-3 inline-flex min-h-[44px] items-center rounded-md bg-gilt-gold px-5 text-sm font-semibold text-gray-900 transition-colors duration-150 hover:bg-gilt-gold/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
      >
        Got it
      </button>
    </div>
  );
}
