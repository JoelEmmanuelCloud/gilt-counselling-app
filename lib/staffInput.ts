const TEXT_LIMITS = {
  name: 120,
  role: 120,
  title: 160,
  credentials: 160,
  bio: 2000,
} as const;

type TextField = keyof typeof TEXT_LIMITS;

export const STAFF_TIERS = [
  { value: 'leadership', label: 'Leadership' },
  { value: 'consultant', label: 'Consultants & Counsellors' },
  { value: 'administration', label: 'Administration' },
  { value: 'volunteer', label: 'Volunteers' },
] as const;

export type StaffTier = (typeof STAFF_TIERS)[number]['value'];

export const DEFAULT_STAFF_TIER: StaffTier = 'consultant';

export function isStaffTier(value: unknown): value is StaffTier {
  return STAFF_TIERS.some((tier) => tier.value === value);
}

export interface StaffInput {
  name?: string;
  role?: string;
  title?: string;
  credentials?: string;
  bio?: string;
  photo?: string;
  tier?: StaffTier;
  featured?: boolean;
  published?: boolean;
  order?: number;
}

export function isAllowedPhotoUrl(value: string): boolean {
  if (value === '') return true;
  if (value.startsWith('/') && !value.startsWith('//') && !value.includes('..')) return true;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && url.hostname.endsWith('.public.blob.vercel-storage.com');
  } catch {
    return false;
  }
}

export function isBlobUrl(value: string | undefined): value is string {
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && url.hostname.endsWith('.public.blob.vercel-storage.com');
  } catch {
    return false;
  }
}

export function parseStaffInput(body: unknown, { partial }: { partial: boolean }): { data?: StaffInput; error?: string } {
  if (!body || typeof body !== 'object') {
    return { error: 'Invalid request body' };
  }
  const source = body as Record<string, unknown>;
  const data: StaffInput = {};

  for (const field of Object.keys(TEXT_LIMITS) as TextField[]) {
    const value = source[field];
    if (value === undefined) continue;
    if (typeof value !== 'string') return { error: `${field} must be text` };
    const trimmed = value.trim();
    if (trimmed.length > TEXT_LIMITS[field]) {
      return { error: `${field} must be ${TEXT_LIMITS[field]} characters or fewer` };
    }
    data[field] = trimmed;
  }

  if (source.photo !== undefined) {
    if (typeof source.photo !== 'string' || !isAllowedPhotoUrl(source.photo.trim())) {
      return { error: 'Photo must be an uploaded image' };
    }
    data.photo = source.photo.trim();
  }

  if (source.tier !== undefined) {
    if (!isStaffTier(source.tier)) return { error: 'Tier must be one of the listed team groups' };
    data.tier = source.tier;
  }

  for (const field of ['featured', 'published'] as const) {
    if (source[field] === undefined) continue;
    if (typeof source[field] !== 'boolean') return { error: `${field} must be true or false` };
    data[field] = source[field] as boolean;
  }

  if (source.order !== undefined) {
    const order = Number(source.order);
    if (!Number.isInteger(order) || order < 0 || order > 9999) {
      return { error: 'Order must be a whole number from 0 to 9999' };
    }
    data.order = order;
  }

  if (!partial) {
    if (!data.name) return { error: 'Name is required' };
    if (!data.role) return { error: 'Role is required' };
  } else {
    if (data.name !== undefined && !data.name) return { error: 'Name cannot be empty' };
    if (data.role !== undefined && !data.role) return { error: 'Role cannot be empty' };
  }

  return { data };
}
