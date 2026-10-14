'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  OPEN_COOKIE_SETTINGS_EVENT,
  readCookieConsent,
  saveCookieConsent,
  type OptionalCookieCategory,
} from '@/lib/cookieConsent';

const CATEGORIES: { id: OptionalCookieCategory; title: string; description: string }[] = [
  {
    id: 'analytics',
    title: 'Analytics',
    description:
      'Would help us understand how visitors use the website so we can improve it. We do not currently use analytics cookies, and will only set them if you allow it.',
  },
  {
    id: 'marketing',
    title: 'Marketing',
    description:
      'Would be used to show relevant content on other platforms. We do not currently use marketing cookies, and will only set them if you allow it.',
  },
];

function Toggle({
  id,
  checked,
  disabled = false,
  onChange,
  label,
}: {
  id: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  label: string;
}) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className="inline-flex flex-shrink-0 items-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed"
    >
      <span
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
          checked ? (disabled ? 'bg-gilt-green-strong/60' : 'bg-gilt-green-strong') : 'bg-gray-300'
        }`}
        aria-hidden="true"
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-200 ${
            checked ? 'translate-x-[22px]' : 'translate-x-0.5'
          }`}
        />
      </span>
    </button>
  );
}

export default function CookieConsent() {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [bannerVisible, setBannerVisible] = useState(false);
  const [managing, setManaging] = useState(false);
  const [choice, setChoice] = useState<Record<OptionalCookieCategory, boolean>>({ analytics: false, marketing: false });

  useEffect(() => {
    const saved = readCookieConsent();
    if (saved) {
      setChoice({ analytics: saved.analytics, marketing: saved.marketing });
    } else {
      setBannerVisible(true);
    }

    const openSettings = () => {
      const current = readCookieConsent();
      if (current) setChoice({ analytics: current.analytics, marketing: current.marketing });
      setManaging(true);
    };
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (managing && !dialog.open) dialog.showModal();
    if (!managing && dialog.open) dialog.close();
  }, [managing]);

  const commit = (next: Record<OptionalCookieCategory, boolean>) => {
    saveCookieConsent(next);
    setChoice(next);
    setBannerVisible(false);
    setManaging(false);
  };

  const acceptAll = () => commit({ analytics: true, marketing: true });
  const rejectOptional = () => commit({ analytics: false, marketing: false });

  const handleCancel = (event: React.SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault();
    setManaging(false);
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) setManaging(false);
  };

  const onAdminPage = pathname?.startsWith('/admin');

  return (
    <>
      {bannerVisible && !managing && !onAdminPage && (
        <div
          role="region"
          aria-label="Cookie consent"
          className="fixed inset-x-0 bottom-0 z-[60] border-t-4 border-gilt-gold bg-gray-900 text-white shadow-2xl"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 sm:py-5 lg:flex-row lg:items-center lg:gap-8 lg:px-8">
            <div className="min-w-0 flex-1">
              <p className="font-heading text-base font-semibold sm:text-lg">We value your privacy</p>
              <p className="mt-1 text-sm leading-relaxed text-gray-300">
                We use essential cookies to make this website work. With your permission, we may also use optional
                cookies in future to improve it. You can accept them, reject them, or choose which to allow.{' '}
                <Link href="/cookies" className="font-semibold text-gilt-gold underline underline-offset-2 hover:text-gilt-orange">
                  Read our Cookie Policy
                </Link>
              </p>
            </div>
            <div className="grid flex-shrink-0 grid-cols-1 gap-2 xs:grid-cols-3 lg:flex lg:gap-3">
              <button
                type="button"
                onClick={() => setManaging(true)}
                className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-white/40 px-5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Manage cookies
              </button>
              <button
                type="button"
                onClick={rejectOptional}
                className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-white/40 px-5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Reject optional
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-gilt-gold px-6 text-sm font-semibold text-gray-900 transition-colors duration-150 hover:bg-gilt-gold/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
              >
                Accept all
              </button>
            </div>
          </div>
        </div>
      )}

      <dialog
        ref={dialogRef}
        onCancel={handleCancel}
        onClick={handleBackdropClick}
        aria-labelledby="cookie-settings-title"
        className="m-auto w-[calc(100%-2rem)] max-w-lg max-h-[90dvh] overflow-hidden rounded-lg bg-white p-0 shadow-lg backdrop:bg-gray-900/60"
      >
        <div className="flex max-h-[90dvh] flex-col">
          <div className="flex items-start justify-between gap-4 border-b border-gray-200 px-5 py-4 sm:px-6">
            <div>
              <p className="eyebrow mb-1 text-gilt-gold-strong">Privacy</p>
              <h2 id="cookie-settings-title" className="text-xl font-semibold tracking-tight text-gray-900">
                Cookie preferences
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setManaging(false)}
              aria-label="Close cookie preferences"
              className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4 overflow-y-auto px-5 py-5 sm:px-6">
            <p className="text-sm leading-relaxed text-gray-600">
              Choose which cookies you allow. You can change your choice at any time from the Cookie settings link at the
              bottom of every page.
            </p>

            <div className="rounded-lg border border-gray-200 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-gray-900">Strictly necessary</p>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">
                    Needed for the website to work, such as remembering your cookie choice. These are always on.
                  </p>
                </div>
                <Toggle id="cookie-necessary" checked disabled label="Strictly necessary cookies, always on" />
              </div>
            </div>

            {CATEGORIES.map((category) => (
              <div key={category.id} className="rounded-lg border border-gray-200 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-gray-900">{category.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">{category.description}</p>
                  </div>
                  <Toggle
                    id={`cookie-${category.id}`}
                    checked={choice[category.id]}
                    onChange={(checked) => setChoice((current) => ({ ...current, [category.id]: checked }))}
                    label={`${category.title} cookies`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col-reverse gap-2 border-t border-gray-200 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
            <button
              type="button"
              onClick={rejectOptional}
              className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-gray-300 px-4 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
            >
              Reject optional
            </button>
            <button
              type="button"
              onClick={() => commit(choice)}
              className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-gray-900 px-4 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
            >
              Save my choices
            </button>
            <button
              type="button"
              onClick={acceptAll}
              className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-gilt-gold px-4 text-sm font-semibold text-gray-900 hover:bg-gilt-gold/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
            >
              Accept all
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
