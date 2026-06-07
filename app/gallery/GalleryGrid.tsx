'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';

export interface GalleryItem {
  _id: string;
  title: string;
  description?: string;
  imageUrl: string;
  category: string;
}

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(items.map((i) => i.category).filter(Boolean)));
    return ['All', ...unique];
  }, [items]);

  const filtered =
    selectedCategory === 'All'
      ? items
      : items.filter((i) => i.category === selectedCategory);

  if (items.length === 0) {
    return (
      <div className="text-center py-16 bg-warm-cream rounded-xl">
        <p className="body-md text-gray-600">Our gallery is coming soon. Please check back later.</p>
      </div>
    );
  }

  return (
    <>
      {categories.length > 1 && (
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-soft-gold text-white shadow-calm'
                  : 'bg-white text-gray-700 hover:bg-warm-cream'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filtered.map((item) => (
          <button
            key={item._id}
            onClick={() => setLightbox(item)}
            className="group block text-left rounded-xl overflow-hidden bg-white shadow-calm hover:shadow-calm-lg transition-all duration-300"
          >
            <div className="relative aspect-square bg-gray-100">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                quality={60}
                loading="lazy"
              />
            </div>
            <div className="p-3">
              <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
              {item.category && (
                <span className="inline-block mt-1 px-2 py-0.5 bg-warm-sand rounded-full text-xs">
                  {item.category}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] bg-white rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 text-gray-800 hover:bg-white"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative w-full h-[60vh] bg-gray-100">
              <Image
                src={lightbox.imageUrl}
                alt={lightbox.title}
                fill
                className="object-contain"
                sizes="100vw"
                quality={80}
              />
            </div>
            <div className="p-5">
              <h3 className="font-heading font-semibold text-lg">{lightbox.title}</h3>
              {lightbox.description && (
                <p className="text-gray-600 mt-2">{lightbox.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
