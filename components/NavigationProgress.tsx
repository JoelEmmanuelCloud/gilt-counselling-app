'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

type ProgressState = 'idle' | 'loading' | 'done';

const SAFETY_TIMEOUT_MS = 15000;
const FADE_OUT_MS = 400;

export default function NavigationProgress() {
  const pathname = usePathname();
  const [state, setState] = useState<ProgressState>('idle');
  const stateRef = useRef<ProgressState>('idle');
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };

  const update = (next: ProgressState) => {
    stateRef.current = next;
    setState(next);
  };

  const finish = () => {
    if (stateRef.current !== 'loading') return;
    clearTimers();
    update('done');
    timers.current.push(window.setTimeout(() => update('idle'), FADE_OUT_MS));
  };

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target as Element | null;
      const anchor = target?.closest?.('a');
      if (!anchor || !anchor.href) return;
      if (anchor.target && anchor.target !== '_self') return;
      if (anchor.hasAttribute('download')) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return;

      clearTimers();
      update('loading');
      timers.current.push(window.setTimeout(finish, SAFETY_TIMEOUT_MS));
    };

    document.addEventListener('click', handleClick, true);
    return () => {
      document.removeEventListener('click', handleClick, true);
      clearTimers();
    };
  }, []);

  useEffect(() => {
    finish();
  }, [pathname]);

  const barClass = {
    idle: 'scale-x-0 opacity-0 transition-none',
    loading: 'scale-x-[0.85] opacity-100 transition-transform duration-[8000ms] ease-out motion-reduce:transition-none',
    done: 'scale-x-100 opacity-0 transition-[transform,opacity] duration-[400ms] ease-out',
  }[state];

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[3px]" aria-hidden="true">
      <div className={`h-full w-full origin-left bg-gray-900 ${barClass}`} />
    </div>
  );
}
