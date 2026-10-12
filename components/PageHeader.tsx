import React from 'react';
import Image from 'next/image';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  children?: React.ReactNode;
}

export default function PageHeader({ eyebrow, title, description, image, children }: PageHeaderProps) {
  return (
    <section className="panel-gold stripes-left">
      <div className="relative aspect-[16/10] w-full sm:aspect-[2/1] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-1/2">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:flex lg:min-h-[480px] lg:items-center lg:px-8 lg:py-24">
        <div className="lg:w-1/2 lg:pr-12">
          <p className="eyebrow mb-4">{eyebrow}</p>
          <h1 className="heading-xl max-w-3xl mb-4 sm:mb-6">{title}</h1>
          <p className="body-lg max-w-2xl text-gray-900/85">{description}</p>
          {children}
        </div>
      </div>
    </section>
  );
}
