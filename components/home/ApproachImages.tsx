'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useReducedMotion } from 'framer-motion';

const ROTATE_MS = 5000;

const BLUR_DATA_URL =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAIAAoDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJgA//9k=';

const images = [
  { src: '/images/DSC_9730.jpg', alt: 'Counsellor in a therapy session with a client' },
  { src: '/images/tagline.jpg', alt: 'Counsellor teaching young people at a whiteboard session' },
];

export default function ApproachImages() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (paused || reduceMotion) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % images.length), ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [paused, reduceMotion]);

  return (
    <div
      className="relative h-full w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {images.map((image, index) => (
        <Image
          key={image.src}
          src={image.src}
          alt={image.alt}
          fill
          aria-hidden={index !== active}
          className={`object-cover transition-opacity duration-1000 ${index === active ? 'opacity-100' : 'opacity-0'}`}
          sizes="(max-width: 1024px) 100vw, 50vw"
          quality={60}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          loading="lazy"
        />
      ))}
      <div className="absolute inset-x-0 bottom-3 flex justify-center">
        <div className="flex rounded-full bg-black/40 px-1.5 backdrop-blur-sm">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Show photo ${index + 1} of ${images.length}`}
              aria-current={index === active}
              className="flex h-11 min-w-[32px] items-center justify-center rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-gilt-gold"
            >
              <span
                className={`block h-2 rounded-full shadow transition-all duration-300 ${index === active ? 'w-6 bg-gilt-gold' : 'w-2 bg-white/80'}`}
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
