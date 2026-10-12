export const TESTIMONIAL_CATEGORIES = ['client', 'school', 'community', 'media', 'event'] as const;
export const STORY_CATEGORIES = ['community', 'media', 'event'] as const;

export type TestimonialCategory = (typeof TESTIMONIAL_CATEGORIES)[number];
export type StoryCategory = (typeof STORY_CATEGORIES)[number];

export const CATEGORY_LABELS: Record<TestimonialCategory, string> = {
  client: 'Client Testimonials',
  school: 'School Outreach Quotes',
  community: 'Community Outreach',
  media: 'In the Media',
  event: 'News & Events',
};

export const CATEGORY_PAGES: Record<TestimonialCategory, { label: string; href: string }> = {
  client: { label: 'Testimonies', href: '/testimonies' },
  school: { label: 'Outreach', href: '/outreach' },
  community: { label: 'Outreach', href: '/outreach' },
  media: { label: 'News & Media', href: '/news' },
  event: { label: 'News & Media', href: '/news' },
};

export function isTestimonialCategory(value: unknown): value is TestimonialCategory {
  return typeof value === 'string' && (TESTIMONIAL_CATEGORIES as readonly string[]).includes(value);
}

export function isStoryCategory(value: unknown): value is StoryCategory {
  return typeof value === 'string' && (STORY_CATEGORIES as readonly string[]).includes(value);
}
