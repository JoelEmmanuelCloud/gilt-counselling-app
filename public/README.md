# Image Guidelines for Gilt Counselling Web App

This document provides comprehensive guidelines for all images used in the Gilt Counselling website. Following these guidelines ensures a consistent, professional, and emotionally safe visual experience for all users.

## General Principles

### Visual Tone
- **Calm**: Images should feel peaceful and non-threatening
- **Professional**: High quality, well-composed photographs
- **Warm**: Natural lighting, warm color tones
- **Safe**: Never show emotional vulnerability or distress
- **Inclusive**: Represent diverse ages, ethnicities, and backgrounds

### What to AVOID
- ❌ Sexualized or glamorous images
- ❌ Aggressive facial expressions
- ❌ Dark, moody therapy scenes
- ❌ Children or teens shown in obvious distress
- ❌ Staged or overly commercial stock photos
- ❌ Exaggerated emotions
- ❌ Clinic-like sterile environments

---

## Page-by-Page Image Requirements

### 1. HOME PAGE (`app/page.tsx`)

#### Hero Section - PRIMARY IMAGE
- **Location**: Right side or subtle background
- **Dimensions**: 1200x800px minimum (landscape orientation)
- **Content**:
  - Counsellor in gentle conversation with teen or parent
  - OR diverse group of youths in safe, welcoming environment
- **Style**:
  - Soft-focused
  - Natural lighting
  - Neutral background (office, comfortable space)
  - Warm color temperature
- **Emotional Tone**: Safety, trust, professionalism
- **File Format**: JPG or WebP
- **File Path**: `public/images/hero/home-hero.jpg`

---

### 2. ABOUT PAGE (`app/about/page.tsx`)

#### Professional Headshots - COUNSELLORS
- **Location**: Beside or above bio text
- **Dimensions**: 400x400px (square) or 400x500px (portrait)
- **Content**: Individual headshots of lead counsellor(s) and consulting professionals
- **Style**:
  - Neutral background (solid color or soft blur)
  - Soft, even lighting
  - Calm, approachable facial expressions
  - Professional attire (business casual)
  - No accessories that distract
- **Emotional Tone**: Trustworthy, approachable, professional
- **File Format**: JPG or WebP
- **File Path**: `public/images/team/counsellor-[name].jpg`

**Example filenames**:
- `counsellor-sarah-johnson.jpg`
- `counsellor-michael-chen.jpg`

---

### 3. SERVICES PAGE (`app/services/page.tsx`)

#### Optional Banner Image
- **Location**: Top of page (if used)
- **Dimensions**: 1600x400px (wide banner)
- **Content**:
  - Calm counselling environment
  - Neutral, non-specific human interaction
  - OR abstract calming visuals
- **Style**:
  - Subtle, not overwhelming
  - Can be semi-transparent overlay
  - Warm, inviting colors
- **File Path**: `public/images/services/services-banner.jpg`

#### Service Icons
- **Location**: In service cards throughout the page
- **Format**: SVG icons (already in code)
- **Note**: NO photographs for individual services, use icons only

---

### 4. TESTIMONIES PAGE (`app/testimonies/page.tsx`)

#### Client Photos: **NONE**
- ❌ No client photos under any circumstances
- Privacy and confidentiality are paramount
- Use text-based testimonial cards only

---

### 5. BLOG/RESOURCES (`app/blog/`)

#### Blog Post Featured Images
- **Location**: Header of each blog post and listing cards
- **Dimensions**: 1200x630px (og:image standard)
- **Content**:
  - Nature scenes (calming, peaceful)
  - Light and airy workspaces
  - Abstract textures or patterns
  - Hands holding journals, cups of tea
  - Books, plants, calm environments
- **Style**:
  - NO faces required
  - Warm, soft lighting
  - Minimal, uncluttered
- **File Path**: `public/images/blog/[blog-post-slug].jpg`

**Example filenames**:
- `understanding-teen-anxiety.jpg`
- `support-mental-health-daily.jpg`

---

### 6. CONTACT PAGE (`app/contact/page.tsx`)

#### Office Photos
- **Location**: Below contact details
- **Dimensions**: 800x600px each
- **Content**:
  1. **Waiting Area**
     - Comfortable seating
     - Well-lit, welcoming space
     - Plants, soft colors
     - Professional but warm

  2. **Counselling Room**
     - Private, comfortable setting
     - Neutral colors
     - NOT clinical or sterile
     - Cozy, safe atmosphere

  3. **Office Exterior/Signage** (Optional)
     - Building entrance
     - Clear signage
     - Well-maintained appearance

- **Style**:
  - Clean, organized spaces
  - Natural lighting where possible
  - Warm color tones
  - Professional without being intimidating
- **File Paths**:
  - `public/images/office/waiting-area-nigeria.jpg`
  - `public/images/office/counselling-room-nigeria.jpg`
  - `public/images/office/waiting-area-canada.jpg`
  - `public/images/office/counselling-room-canada.jpg`

---

### 7. BOOKING & DASHBOARDS

#### Images: **NONE**
- Use icons and UI elements only
- Focus on functionality and clarity
- NO photography in these areas

---

## Technical Specifications

### File Formats
- **Primary**: WebP (best compression for web)
- **Fallback**: JPG (high quality, 85-90% compression)
- **Icons**: SVG (scalable, small file size)

### Image Optimization
- All images must be optimized for web
- Maximum file size: 300KB per image
- Use lazy loading for images below the fold
- Provide alt text for accessibility

### Dimensions Summary
| Location | Recommended Size | Aspect Ratio |
|----------|-----------------|--------------|
| Hero Images | 1200x800px | 3:2 |
| Headshots | 400x400px | 1:1 |
| Office Photos | 800x600px | 4:3 |
| Blog Headers | 1200x630px | 1.91:1 |
| Service Banner | 1600x400px | 4:1 |

---

## Color Guidelines

Images should complement the website's color palette:

- **Primary Colors**: Soft gold (#D4AF7A), Warm sand (#E8D4B8)
- **Secondary**: Muted teal (#7B9C98), Olive green (#8B9A7A)
- **Neutrals**: Warm cream (#F5F1E8), Soft beige (#D9D1C7)

**Color Temperature**: Warm (avoid cool, blue-toned images)

**Saturation**: Moderate (not overly vibrant or muted)

---

## Accessibility Requirements

### Alt Text Guidelines
All images must include descriptive alt text:

**Good Examples**:
- "Counsellor having a calm conversation with a teen in a comfortable office setting"
- "Waiting area with comfortable seating and warm lighting"
- "Professional headshot of Dr. Sarah Johnson, lead counsellor"

**Bad Examples**:
- "Image1.jpg"
- "Person talking"
- "Office"

### Contrast
- Ensure sufficient contrast for any text overlays
- Test images with accessibility tools
- Consider users with visual impairments

---

## File Organization

```
public/
├── images/
│   ├── hero/
│   │   └── home-hero.jpg
│   ├── team/
│   │   ├── counsellor-sarah-johnson.jpg
│   │   └── counsellor-michael-chen.jpg
│   ├── office/
│   │   ├── waiting-area-nigeria.jpg
│   │   ├── counselling-room-nigeria.jpg
│   │   ├── waiting-area-canada.jpg
│   │   └── counselling-room-canada.jpg
│   ├── blog/
│   │   ├── understanding-teen-anxiety.jpg
│   │   ├── support-mental-health-daily.jpg
│   │   └── building-resilience-young-people.jpg
│   └── services/
│       └── services-banner.jpg (optional)
└── icons/
    └── (SVG icons as needed)
```

---

## Legal & Ethical Considerations

### Model Releases
- Obtain proper model releases for all photographs containing people
- Ensure all subjects have consented to use in counselling context
- Never use client photos without explicit written consent

### Stock Photography
If using stock photos:
- Choose authentic, natural-looking images
- Avoid overly staged or clichéd counselling imagery
- Verify licensing for commercial use
- Credit photographers as required

### Privacy
- Never photograph or display client information
- Blur or remove any identifying details in office photos
- Respect confidentiality in all visual choices

---

## Review Checklist

Before adding any image to the website, verify:

- [ ] Image meets quality standards (resolution, lighting, composition)
- [ ] Emotional tone aligns with counselling environment (safe, warm, professional)
- [ ] No elements that could be triggering or inappropriate
- [ ] Proper file format and optimization
- [ ] Alt text written and descriptive
- [ ] File naming convention followed
- [ ] Saved in correct directory
- [ ] Model release obtained (if applicable)
- [ ] Licensing verified (if stock photo)

---

## Questions?

If you're unsure whether an image is appropriate, ask:
1. Does this image make someone feel **safe**?
2. Is it **professional** without being cold?
3. Does it represent our **values** (joy, optimism, integrity, confidentiality, inclusion)?
4. Would I feel comfortable if I were seeking counselling and saw this image?

When in doubt, choose warmth and safety over visual impact.

---

**Last Updated**: December 2024
**Maintained By**: Gilt Counselling Design Team
