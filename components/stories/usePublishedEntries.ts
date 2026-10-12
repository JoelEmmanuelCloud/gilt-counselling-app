'use client';

import { useEffect, useState } from 'react';
import type { TestimonialCategory } from '@/lib/testimonialCategories';

export interface SchoolQuote {
  text: string;
  role: string;
}

export interface PublishedEntry {
  _id: string;
  category: TestimonialCategory;
  quote?: string;
  name?: string;
  service?: string;
  date?: string;
  school?: string;
  quotes?: SchoolQuote[];
  title?: string;
  organization?: string;
  description?: string;
  images?: string[];
  videoUrl?: string;
}

export function usePublishedEntries(category: TestimonialCategory) {
  const [entries, setEntries] = useState<PublishedEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`/api/testimonials?category=${category}`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
        return response.json();
      })
      .then((data) => setEntries(Array.isArray(data) ? data : []))
      .catch((error) => {
        if (error.name === 'AbortError') return;
        console.error(`Failed to load ${category} entries`, error);
        setFailed(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [category]);

  return { entries, loading, failed };
}
