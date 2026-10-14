import React from 'react';

interface SectionHeadingProps {
  title: string;
  highlight?: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

function renderTitle(title: string, highlight?: string) {
  const start = highlight ? title.indexOf(highlight) : -1;
  if (!highlight || start === -1) return title;
  return (
    <>
      {title.slice(0, start)}
      <span className="text-accent">{highlight}</span>
      {title.slice(start + highlight.length)}
    </>
  );
}

export default function SectionHeading({
  title,
  highlight,
  subtitle,
  centered = false,
  className = ''
}: SectionHeadingProps) {
  return (
    <div className={`mb-6 sm:mb-8 md:mb-12 ${centered ? 'text-center' : ''} ${className}`}>
      <span className={`accent-bar mb-4 sm:mb-5 ${centered ? 'mx-auto' : ''}`} aria-hidden="true" />
      <h2 className="heading-lg mb-4">{renderTitle(title, highlight)}</h2>
      {subtitle && (
        <p className="body-lg text-gray-600 max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
