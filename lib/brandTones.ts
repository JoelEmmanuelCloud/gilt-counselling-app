export const BRAND_TONES = [
  {
    icon: 'text-gilt-teal',
    tile: 'bg-gilt-teal/10 text-gilt-teal',
    bar: 'bg-gilt-teal',
    border: 'border-t-gilt-teal',
    sideBorder: 'border-l-gilt-teal',
    bottomBorder: 'border-b-gilt-teal',
    text: 'text-gilt-teal-strong',
    hoverText: 'group-hover:text-gilt-teal-strong',
    solid: 'bg-gilt-teal-strong',
  },
  {
    icon: 'text-gilt-green',
    tile: 'bg-gilt-green/10 text-gilt-green',
    bar: 'bg-gilt-green',
    border: 'border-t-gilt-green',
    sideBorder: 'border-l-gilt-green',
    bottomBorder: 'border-b-gilt-green',
    text: 'text-gilt-green-strong',
    hoverText: 'group-hover:text-gilt-green-strong',
    solid: 'bg-gilt-green-strong',
  },
  {
    icon: 'text-gilt-orange',
    tile: 'bg-gilt-orange/10 text-gilt-orange',
    bar: 'bg-gilt-orange',
    border: 'border-t-gilt-orange',
    sideBorder: 'border-l-gilt-orange',
    bottomBorder: 'border-b-gilt-orange',
    text: 'text-gilt-orange-strong',
    hoverText: 'group-hover:text-gilt-orange-strong',
    solid: 'bg-gilt-orange-strong',
  },
  {
    icon: 'text-gilt-gold',
    tile: 'bg-gilt-gold/15 text-gilt-gold',
    bar: 'bg-gilt-gold',
    border: 'border-t-gilt-gold',
    sideBorder: 'border-l-gilt-gold',
    bottomBorder: 'border-b-gilt-gold',
    text: 'text-gilt-gold-strong',
    hoverText: 'group-hover:text-gilt-gold-strong',
    solid: 'bg-gilt-gold-strong',
  },
] as const;

export type BrandTone = (typeof BRAND_TONES)[number];

export function brandTone(index: number): BrandTone {
  return BRAND_TONES[index % BRAND_TONES.length];
}
