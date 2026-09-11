import React from 'react';
import Image from 'next/image';

interface EventTestimonialCardProps {
  badge: string;
  title: string;
  organization?: string;
  date?: string;
  description: string;
  images?: string[];
  videoUrl?: string;
}

const BLUR_PLACEHOLDER =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAIAAoDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJgA//9k=';

export default function EventTestimonialCard({
  badge,
  title,
  organization,
  date,
  description,
  images = [],
  videoUrl,
}: EventTestimonialCardProps) {
  const gridCols = images.length > 4 ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-2';
  const imageHeight = images.length > 4
    ? 'h-[150px] sm:h-[190px] md:h-[220px]'
    : 'h-[180px] sm:h-[220px] md:h-[260px]';

  return (
    <div className="bg-white rounded-xl p-6 sm:p-8 shadow-calm">
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="inline-block bg-soft-terracotta/10 text-soft-terracotta px-3 py-1.5 rounded-full text-xs uppercase tracking-wider font-medium">
          {badge}
        </span>
        {date && <span className="text-sm text-gray-500">{date}</span>}
      </div>
      <h3 className="heading-sm mb-2">{title}</h3>
      {organization && (
        <p className="text-soft-gold font-semibold mb-2">{organization}</p>
      )}
      <p className="text-gray-700 leading-relaxed mb-6 text-justify">{description}</p>
      {images.length > 0 && (
        <div className={`grid ${gridCols} gap-3 sm:gap-4 ${videoUrl ? 'mb-6' : ''}`}>
          {images.map((url, index) => (
            <div key={url} className={`relative ${imageHeight} rounded-lg overflow-hidden`}>
              <Image
                src={url}
                alt={`${title} - Event photo ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
                quality={60}
                placeholder="blur"
                blurDataURL={BLUR_PLACEHOLDER}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      )}
      {videoUrl && (
        <video controls preload="none" poster={images[0]} className="w-full rounded-lg">
          <source src={videoUrl} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
