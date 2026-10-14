import React from 'react';

interface MarqueeProps {
  children: React.ReactNode;
  label: string;
  durationSeconds: number;
  gapClassName?: string;
}

const EDGE_FADE = 'linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)';

export default function Marquee({ children, label, durationSeconds, gapClassName = 'gap-4 pr-4 sm:gap-6 sm:pr-6' }: MarqueeProps) {
  return (
    <div
      role="region"
      aria-label={label}
      className="group overflow-hidden py-2 motion-reduce:overflow-x-auto"
      style={{ maskImage: EDGE_FADE, WebkitMaskImage: EDGE_FADE }}
    >
      <div
        className="flex w-max animate-marquee-right group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] motion-reduce:animate-none"
        style={{ animationDuration: `${durationSeconds}s` }}
      >
        <ul className={`flex flex-shrink-0 items-stretch ${gapClassName}`}>{children}</ul>
        <ul className={`flex flex-shrink-0 items-stretch motion-reduce:hidden ${gapClassName}`} aria-hidden="true" inert>
          {children}
        </ul>
      </div>
    </div>
  );
}
