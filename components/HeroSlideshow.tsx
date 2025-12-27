'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const heroImages = [
  {
    src: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1920&h=700&fit=crop',
    alt: 'Professional counseling session - person in consultation',
  },
  {
    src: 'https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=1920&h=700&fit=crop',
    alt: 'Professional counseling environment - supportive atmosphere',
  },
];

export default function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change slide every 5 seconds

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
            priority={index === 0}
          />
        </div>
      ))}
    </div>
  );
}
