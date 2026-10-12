import React from 'react';

interface SkeletonProps {
  className?: string;
  tone?: 'default' | 'gold';
}

export default function Skeleton({ className = '', tone = 'default' }: SkeletonProps) {
  const toneClass = tone === 'gold' ? 'bg-gray-900/15' : 'bg-gray-900/10';
  return <div className={`rounded-md ${toneClass} motion-safe:animate-pulse ${className}`} aria-hidden="true" />;
}

export function TestimonialCardSkeleton() {
  return (
    <div className="card-warm" aria-hidden="true">
      <Skeleton className="mb-4 h-8 w-8 rounded-full" />
      <div className="mb-6 space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <div className="space-y-2 border-t border-soft-beige pt-4">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
}
