const SITE_URL = 'https://giltcounselling.com';

const SERVICES = [
  'Mental Health & Emotional Wellness',
  'Educational Consulting',
  'School Counselling Consultation',
  'Academic & Career Counselling',
  'Youth Counselling, Life Skills & Mentoring',
  'Parenting & Special Needs Support',
  'Organizational Staff Training',
  'Group Therapy, Outreach & Advocacy',
  'Online Counselling',
];

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#organization`,
  name: 'Gilt Counselling Consult',
  url: SITE_URL,
  logo: `${SITE_URL}/icon-192.png`,
  image: `${SITE_URL}/images/Gilt%20Counselling%20Consult.jpg`,
  description:
    'Professional counselling services in Port Harcourt, Nigeria, empowering teens, youths, and families through mental health support, educational consulting, and youth development.',
  slogan: 'Empowering teens and youths for optimal development',
  telephone: '+2347065734165',
  email: 'wecare@giltcounselling.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '88 Woji Road, Vineyard Building, GRA Phase 2',
    addressLocality: 'Port Harcourt',
    addressRegion: 'Rivers State',
    addressCountry: 'NG',
  },
  areaServed: [
    { '@type': 'City', name: 'Port Harcourt' },
    { '@type': 'State', name: 'Rivers State' },
    { '@type': 'Country', name: 'Nigeria' },
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '10:00',
      closes: '14:00',
    },
  ],
  founder: {
    '@type': 'Person',
    name: 'Dame Prof Chinelo Joy Ugwu',
    jobTitle: 'Founder & CEO',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Counselling and consulting services',
    itemListElement: SERVICES.map((service) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: service },
    })),
  },
  sameAs: [
    'https://www.facebook.com/profile.php?id=61588696223113',
    'https://www.instagram.com/giltcounsellingconsult',
    'https://www.tiktok.com/@giltcounsellingconsult',
    'https://x.com/giltcounselling',
    'https://www.youtube.com/@giltcounsellingconsult',
  ],
};

export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
