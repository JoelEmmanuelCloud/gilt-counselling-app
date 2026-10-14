import { CATEGORY_DETAILS, isStoryCategory, type StoryCategory } from '@/lib/testimonialCategories';
import { toStory, type PublishedEntry } from '@/components/stories/usePublishedEntries';
import type { Story } from '@/components/stories/types';
import { BRAND_TONES, type BrandTone } from '@/lib/brandTones';

export interface ActivityItem {
  story: Story;
  category: StoryCategory;
  badge: string;
  href: string;
  tone: BrandTone;
}

const ACTIVITY_BADGES: Record<StoryCategory, string> = {
  event: 'News',
  media: 'Media',
  community: 'Outreach',
};

const ACTIVITY_TONES: Record<StoryCategory, BrandTone> = {
  event: BRAND_TONES[0],
  community: BRAND_TONES[1],
  media: BRAND_TONES[2],
};

function createdTime(entry: PublishedEntry) {
  return Date.parse(entry.createdAt || '') || 0;
}

export function buildActivity(entries: PublishedEntry[]): ActivityItem[] {
  return entries
    .filter((entry): entry is PublishedEntry & { category: StoryCategory } => isStoryCategory(entry.category) && Boolean(entry.title))
    .sort((a, b) => createdTime(b) - createdTime(a))
    .map((entry) => ({
      story: toStory(entry),
      category: entry.category,
      badge: ACTIVITY_BADGES[entry.category],
      href: CATEGORY_DETAILS[entry.category].href,
      tone: ACTIVITY_TONES[entry.category],
    }));
}
