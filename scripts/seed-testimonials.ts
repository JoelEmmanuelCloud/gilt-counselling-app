import mongoose from 'mongoose';
import { config } from 'dotenv';
import path from 'path';

config({ path: path.resolve(process.cwd(), '.env.local') });

import Testimonial from '../lib/models/testimonial';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in .env.local');
}

const clientTestimonials = [
  {
    quote: 'The counselling sessions helped me understand myself better and gave me tools to manage my emotions. I feel more confident and hopeful about the future.',
    name: 'Sarah',
    service: 'Individual Counselling',
    date: 'November 2025',
  },
  {
    quote: 'Our family is communicating better than we have in years. The sessions provided a safe space for all of us to express ourselves and heal together.',
    name: 'Michael',
    service: 'Family Counselling',
    date: 'October 2025',
  },
  {
    quote: 'I was struggling with school stress and anxiety. The counselor listened without judgment and helped me find healthy coping strategies that actually work.',
    name: 'David',
    service: 'Teen Support',
    date: 'December 2025',
  },
  {
    quote: 'After years of feeling lost, I finally found someone who understood what I was going through. The support has been life-changing.',
    name: 'Grace',
    service: 'Mental Health Support',
    date: 'September 2025',
  },
  {
    quote: 'The parenting sessions gave us practical tools and helped us understand our child better. We feel equipped to support them through their challenges.',
    name: 'Emmanuel',
    service: 'Parenting Support',
    date: 'November 2025',
  },
  {
    quote: 'I learned so much about myself through these sessions. The counselor created such a warm, accepting environment that made it easy to open up.',
    name: 'Joy',
    service: 'Individual Counselling',
    date: 'October 2025',
  },
  {
    quote: 'Our teen was going through a difficult time, and the counselor helped her navigate it with compassion and wisdom. We\'re so grateful.',
    name: 'Patricia',
    service: 'Teen & Youth Support',
    date: 'December 2025',
  },
  {
    quote: 'The sessions helped me process trauma I had been carrying for years. I feel lighter and more at peace than I have in a long time.',
    name: 'Daniel',
    service: 'Mental Health Support',
    date: 'August 2025',
  },
  {
    quote: 'Coming to counselling was the best decision I made this year. I have learned to set boundaries and prioritize my mental wellbeing.',
    name: 'Ruth',
    service: 'Individual Counselling',
    date: 'September 2025',
  },
  {
    quote: 'I would like to express my heartfelt gratitude to Gilt Counselling Services for the incredible work they are doing. One day, a female therapist from your organization reached out to me after my 13-year-old niece had searched online for a female therapist and contacted your team for help. During their conversation, the therapist realized that my niece was living in an abusive environment and urgently needed protection. The therapist acted with compassion, professionalism, and wisdom by ensuring the situation was brought to my attention. As soon as I learned what was happening, I immediately contacted the appropriate authorities, and swift action was taken to remove her from the abusive environment. Today, my niece is safe, receiving the care and support she needs, and we are deeply grateful for the role Gilt Counselling Services played in changing the course of her life. Your commitment to listening, believing, and responding to vulnerable children has made an immeasurable difference to our family. Thank you for your dedication, courage, and genuine concern for those in need. May your organization continue to be a source of hope, healing, and protection for many more people.',
    name: 'Dr. M.E',
    service: 'Child Safeguarding & Protection',
    date: 'July 2026',
  },
];

const schoolTestimonials = [
  {
    school: 'Great Beulah Heritage School',
    quotes: [
      { text: 'I was feeling depressed earlier before the team\'s arrival, but after the event, I feel better.', role: 'Student' },
      { text: 'The teaching on Emotional Intelligence has given me clues on how to manage anger issues.', role: 'Student' },
    ],
  },
  {
    school: 'Niger Delta Science School',
    quotes: [
      { text: 'I have been struggling with anger issues. Thank God, the teaching on Emotional Intelligence has taught me how I can control anger.', role: 'Student' },
      { text: 'I did not know how to understand people\'s emotions, but with this teaching, I will do better.', role: 'Student' },
      { text: 'This teaching has enlightened me to have a successful relationship.', role: 'Counsellor' },
    ],
  },
  {
    school: 'Oliveth Height International School',
    quotes: [
      { text: 'I am very happy for the opportunity to learn about Emotional Intelligence.', role: 'Student' },
      { text: 'Through the teaching I got to understand my emotions and how to express them in both positive and negative situation.', role: 'Student' },
      { text: 'This has helped in shaping the students\' minds on how to have a productive life.', role: 'Principal' },
    ],
  },
  {
    school: 'Christ International School',
    quotes: [
      { text: 'There is need to control our emotions.', role: 'Student' },
      { text: 'I learnt how to balance and regulate my emotions and also relate with others.', role: 'Student' },
      { text: 'We need emotional intelligence in order to build a life of success beyond the classroom.', role: 'Principal' },
    ],
  },
  {
    school: 'The Groove School',
    quotes: [
      { text: 'I am happy because I have learnt how to regulate my emotions.', role: 'Student' },
      { text: 'I have learnt and seen the need to manage my emotions.', role: 'Student' },
      { text: 'The teaching has enlightened the students on the need for self-regulation.', role: 'School Counsellor' },
    ],
  },
  {
    school: 'Priqueen International School',
    quotes: [
      { text: 'The teaching has made me understand the right way to approach people.', role: 'Student' },
      { text: 'I have seen the need for Emotional Intelligence so as not to get overwhelmed by emotions in any given situation.', role: 'Student' },
      { text: 'I have learnt that Emotional Intelligence starts with me, and not just knowing my emotions, but also knowing and understanding the emotions of others around me.', role: 'Student' },
    ],
  },
];

const communityTestimonials = [
  {
    title: 'CASSON Rivers State Chapter 6th Biennial Conference & Induction Ceremony',
    organization: 'IGNATIUS AJURU UNIVERSITY OF EDUCATION',
    date: '2026',
    description: 'Gilt Counselling Consult was represented at the Counselling Association of Nigeria (CASSON) Rivers State Chapter\'s 6th Biennial Conference, Induction Ceremony, and Fund Raise, themed "Counselling for Transformation: Accelerating Mental Health for Sustainable Development in Nigeria." Our team presented at the podium and received a Certificate of Participation, joining fellow counselling professionals across Rivers State.',
    images: [
      '/images/events/casson-conference-2026-1.jpeg',
      '/images/events/casson-conference-2026-2.jpeg',
      '/images/events/casson-conference-2026-3.jpeg',
      '/images/events/casson-conference-2026-4.jpeg',
      '/images/events/casson-conference-2026-5.jpeg',
      '/images/events/casson-conference-2026-6.jpeg',
    ],
  },
  {
    title: 'Gilt Counselling Consult, in Partnership with CASSON Rivers State, Honours International Guest Lecturer Tracy Heath in Canada',
    organization: 'CANADA',
    date: 'June 2026',
    description: 'Gilt Counselling Consult, in partnership with the Counselling Association of Nigeria (CASSON) Rivers State Chapter, honoured international guest lecturer Tracy Heath in Canada in appreciation of her contributions and partnership. The visit was marked with a warm exchange of gifts, including a token from Nigeria and a copy of "Before Goodbye," celebrating the relationship between both parties.',
    images: [
      '/images/events/tracy-heath-canada-1.jpeg',
      '/images/events/tracy-heath-canada-2.jpeg',
      '/images/events/tracy-heath-canada-3.jpeg',
      '/images/events/tracy-heath-canada-4.jpeg',
      '/images/events/tracy-heath-canada-5.jpeg',
    ],
    videoUrl: '/videos/tracy-heath-canada.mp4',
  },
  {
    title: '2026 Children\'s Day Celebration',
    organization: 'VINEYARD',
    date: 'May 2026',
    description: 'Gilt Counselling Consult joined the 2026 Children\'s Day celebration at Vineyard, bringing colour, joy, and our message of mental wellness to families across the city. Our team engaged children and parents at our branded stand, sharing information on our services while celebrating the day dedicated to every child\'s wellbeing and growth.',
    images: [
      '/images/events/childrens-day-2026-1.jpeg',
      '/images/events/childrens-day-2026-2.jpeg',
      '/images/events/childrens-day-2026-3.jpeg',
      '/images/events/childrens-day-2026-4.jpeg',
    ],
  },
  {
    title: 'The Destructive Effect of Substance Abuse and Internet Fraud on Youth',
    organization: '2026 DIOCESAN WOMEN CONFERENCE, DIOCESE OF IDEATO',
    date: 'June 2026',
    description: 'Gilt Counselling Consult was invited to speak at the 2026 Diocesan Women Conference, Arondizuogu Archdeaconry, Diocese of Ideato (Anglican Communion), held at the Cathedral of St. Peter, Ndiawa Arondizuogu. The session addressed the destructive effect of substance abuse and internet fraud on youth, equipping the hundreds of women in attendance with insight to guide the young people in their care.',
    images: [
      '/images/events/ideato-women-conference-1.jpeg',
      '/images/events/ideato-women-conference-2.jpeg',
      '/images/events/ideato-women-conference-3.jpeg',
      '/images/events/ideato-women-conference-4.jpeg',
    ],
  },
  {
    title: '2026 Teachers Training: Championing Dyslexia, Dyscalculia, and Dysgraphia Awareness',
    organization: 'LIGHTVIEW INITIATIVE FOR EMPOWERMENT x AFRICA DYSLEXIA ORGANISATION',
    date: 'June 2026',
    description: 'Gilt Counselling Consult took part in the 2026 teachers training championing Dyslexia, Dyscalculia, and Dysgraphia awareness, organised by the Lightview Initiative for Empowerment in partnership with the Africa Dyslexia Organisation. The training equipped teachers with the knowledge to identify and support students with learning differences in the classroom.',
    images: [
      '/images/events/dyslexia-training-2026-1.jpeg',
      '/images/events/dyslexia-training-2026-2.jpeg',
      '/images/events/dyslexia-training-2026-3.jpeg',
    ],
  },
  {
    title: 'International World Day for Persons with Disabilities 2025',
    organization: 'OTANA INCLUSIVE CENTRE',
    date: 'December 2025',
    description: 'Gilt Counselling Consult celebrated the 2025 International World Day for Persons with Disabilities at Otana Inclusive Centre, championing the message that no child should be left behind. The event brought together families, caregivers, and advocates to raise awareness about inclusion and support for persons with disabilities.',
    images: [
      '/images/events/disability-day-1.jpeg',
      '/images/events/disability-day-2.jpeg',
      '/images/events/disability-day-3.jpeg',
      '/images/events/disability-day-4.jpeg',
    ],
  },
];

const mediaTestimonials = [
  {
    title: '92.3 Nigeria Info PH Interview on Navigating Men\'s Mental Health',
    organization: 'IN CELEBRATION OF MEN\'S MENTAL WELLNESS MONTH',
    date: 'June 2026',
    description: 'Gilt Counselling Consult joined 92.3 Nigeria Info Port Harcourt for a studio conversation on navigating men\'s mental health, part of the station\'s programming in celebration of Men\'s Mental Wellness Month. The discussion explored the unique pressures men face and practical ways to build emotional resilience and seek support.',
    images: [
      '/images/media/nigeria-info-studio.jpeg',
      '/images/media/nigeria-info-group.jpeg',
      '/images/media/nigeria-info-onair.jpeg',
    ],
  },
  {
    title: 'Kids FM PH 101.7 Radio Talk on Men\'s Mental Health',
    organization: 'KIDS FM PORT HARCOURT, 101.7FM',
    date: 'June 2026',
    description: 'Gilt Counselling Consult sat down with Kids FM Port Harcourt, 101.7FM, for a radio talk on men\'s mental health, continuing the conversation on emotional wellbeing and the importance of men feeling safe to speak openly about what they carry.',
    images: [
      '/images/media/kidsfm-interview-1.jpeg',
      '/images/media/kidsfm-interview-2.jpeg',
    ],
  },
];

async function seed() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI);
  console.log('Connected successfully!');

  const existingCount = await Testimonial.countDocuments();
  if (existingCount > 0) {
    console.log(`Testimonials collection already has ${existingCount} document(s). Skipping seed to avoid duplicates.`);
    await mongoose.disconnect();
    return;
  }

  const documents = [
    ...clientTestimonials.map((item, index) => ({ category: 'client', order: index, published: true, ...item })),
    ...schoolTestimonials.map((item, index) => ({ category: 'school', order: index, published: true, ...item })),
    ...communityTestimonials.map((item, index) => ({ category: 'community', order: index, published: true, ...item })),
    ...mediaTestimonials.map((item, index) => ({ category: 'media', order: index, published: true, ...item })),
  ];

  await Testimonial.insertMany(documents);
  console.log(`Seeded ${documents.length} testimonial entries.`);

  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error('Seeding testimonials failed:', error);
  process.exit(1);
});
