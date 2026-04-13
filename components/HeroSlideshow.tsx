'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const heroImages = [
  {
    src: '/images/header1.jpg',
    alt: 'Professional counseling session - person in consultation',
  },
  {
    src: '/images/header2.jpg',
    alt: 'Professional counseling environment - supportive atmosphere',
  },
  {
    src: '/images/workshops/all-saints/all-saints-workshop-14.jpeg',
    alt: 'CEO Gilt Counselling Consult in a counseling session with a client',
  },
];

export default function HeroSlideshow({ onSlideChange }: { onSlideChange?: (index: number) => void }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    onSlideChange?.(currentSlide);
  }, [currentSlide, onSlideChange]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0">
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1920px"
            quality={80}
            priority={index === 0}
            loading={index === 0 ? 'eager' : 'lazy'}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAIAAoDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJgA//9k="
          />
        </div>
      ))}
    </div>
  );
}

export { heroImages };
