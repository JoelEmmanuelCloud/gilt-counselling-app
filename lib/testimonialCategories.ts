export const TESTIMONIAL_CATEGORIES = ['client', 'school', 'community', 'media', 'event'] as const;
export const STORY_CATEGORIES = ['community', 'event', 'media'] as const;

export type TestimonialCategory = (typeof TESTIMONIAL_CATEGORIES)[number];
export type StoryCategory = (typeof STORY_CATEGORIES)[number];

export interface CategoryDetails {
  label: string;
  description: string;
  page: string;
  tab?: string;
  href: string;
}

export const CATEGORY_DETAILS: Record<TestimonialCategory, CategoryDetails> = {
  client: {
    label: 'Client Testimonials',
    description: 'Anonymous feedback from counselling clients.',
    page: 'Testimonies',
    href: '/testimonies',
  },
  school: {
    label: 'School Feedback',
    description: 'Quotes from students, counsellors, and principals, grouped by school.',
    page: 'Outreach',
    tab: 'Schools Programme',
    href: '/outreach#schools',
  },
  community: {
    label: 'Community Outreach',
    description: 'Workshops, donations, and awareness programmes in the community.',
    page: 'Outreach',
    tab: 'Community Outreach',
    href: '/outreach#community',
  },
  event: {
    label: 'Events & Milestones',
    description: 'Conferences, awards, programmes, and organisational milestones.',
    page: 'News & Media',
    tab: 'Events & Milestones',
    href: '/news#events',
  },
  media: {
    label: 'In the Media',
    description: 'Radio, television, and press appearances.',
    page: 'News & Media',
    tab: 'In the Media',
    href: '/news#media',
  },
};

export const CATEGORY_GROUPS: { page: string; categories: TestimonialCategory[] }[] = [
  { page: 'Testimonies', categories: ['client'] },
  { page: 'Outreach', categories: ['school', 'community'] },
  { page: 'News & Media', categories: ['event', 'media'] },
];

export const CATEGORY_LABELS: Record<TestimonialCategory, string> = Object.fromEntries(
  TESTIMONIAL_CATEGORIES.map((category) => [category, CATEGORY_DETAILS[category].label])
) as Record<TestimonialCategory, string>;

export function isTestimonialCategory(value: unknown): value is TestimonialCategory {
  return typeof value === 'string' && (TESTIMONIAL_CATEGORIES as readonly string[]).includes(value);
}

export function isStoryCategory(value: unknown): value is StoryCategory {
  return typeof value === 'string' && (STORY_CATEGORIES as readonly string[]).includes(value);
}
