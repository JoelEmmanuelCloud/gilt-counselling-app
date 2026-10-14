import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import Tabs from '@/components/ui/Tabs';
import OutreachShowcase from '@/components/OutreachShowcase';
import SchoolQuotes from '@/components/stories/SchoolQuotes';
import StoryGrid from '@/components/stories/StoryGrid';
import type { Story } from '@/components/stories/types';

export const metadata: Metadata = {
  alternates: {
    canonical: '/outreach',
  },
  title: 'Outreach',
  description:
    'Gilt Counselling Consult brings Emotional Intelligence education to secondary schools across Port Harcourt and supports communities through workshops, donations, and awareness programmes.',
  openGraph: {
    title: 'Outreach | Gilt Counselling Consult',
    description:
      'Schools outreach and community programmes by Gilt Counselling Consult across Port Harcourt and beyond.',
    url: 'https://giltcounselling.com/outreach',
  },
};

const communityHighlights: Story[] = [
  {
    id: 'otana-chairs-donation',
    title: 'Chairs Donated to Otana Inclusive Centre',
    organization: 'Otana Inclusive Centre',
    description: [
      'As part of our ongoing outreach programmes, Gilt Counselling Consult donated executive chairs to Otana Inclusive Centre — a gesture born from a deep commitment to the wellbeing of every child, regardless of ability.',
      '“You have provided executive chairs for our special children to sit on. God will surely make them executive individuals in their life’s endeavours. This heartfelt gift is proof of your love for humanity and Otana Inclusive Centre. God bless you and your team at Gilt Counselling Consult.” — Otana Inclusive Centre',
      'We are honoured by the warm reception from the centre’s leadership and remain committed to serving communities in need through compassionate action.',
    ].join('\n\n'),
    images: ['/images/outreach/otana-outreach-1.jpeg', '/images/outreach/otana-outreach-2.jpeg'],
  },
  {
    id: 'all-saints-cathedral-workshop',
    title: 'All Saints Cathedral Education & Empowerment Committee Workshop',
    organization: 'All Saints Cathedral',
    description: [
      'Dame Prof Chinelo Joy Ugwu, CEO of Gilt Counselling Consult, coordinated a one-day workshop for the All Saints Cathedral Education and Empowerment Committee. The workshop brought together members of the committee for a day of learning, empowerment, and professional development.',
      'This initiative reflects Gilt Counselling Consult’s dedication to extending professional support beyond the counselling room and into the wider community.',
    ].join('\n\n'),
    images: [1, 2, 3, 6, 7, 9, 10, 14, 15].map((n) => `/images/workshops/all-saints/all-saints-workshop-${n}.jpeg`),
  },
];

export default function OutreachPage() {
  return (
    <div className="min-h-screen bg-off-white">
      <PageHeader
        eyebrow="Outreach"
        title="Taking Support Beyond the Counselling Room"
        description="From secondary school classrooms to churches, inclusive centres, and conferences, we bring mental health education and practical support to the communities we serve."
        image={{ src: '/images/outreach/grove/grove-team-sign.jpeg', alt: 'The Gilt Counselling Consult team outside The Grove School Secondary during a schools outreach visit' }}
      />

      <Tabs
        label="Outreach programmes"
        tabs={[
          {
            id: 'schools',
            label: 'Schools Programme',
            content: (
              <>
                <section className="section-container">
                  <SectionHeading
                    title="Schools Outreach Programme"
                    highlight="Outreach Programme"
                    subtitle="Bringing Emotional Intelligence education to secondary schools across Port Harcourt."
                    centered
                  />
                  <div className="max-w-5xl mx-auto">
                    <OutreachShowcase />
                  </div>
                </section>
                <section className="section-container bg-warm-cream">
                  <SectionHeading
                    title="What Schools Are Saying"
                    highlight="Are Saying"
                    subtitle="Feedback from students, counsellors, and principals after our Emotional Intelligence sessions."
                    centered
                  />
                  <SchoolQuotes />
                </section>
              </>
            ),
          },
          {
            id: 'community',
            label: 'Community Outreach',
            content: (
              <section className="section-container">
                <SectionHeading
                  title="Community Outreach"
                  highlight="Outreach"
                  subtitle="Workshops, donations, and awareness programmes that bring support to communities beyond our counselling rooms."
                  centered
                />
                <StoryGrid
                  category="community"
                  badge="Community"
                  emptyMessage="New community outreach stories will appear here soon."
                  extraStories={communityHighlights}
                />
              </section>
            ),
          },
        ]}
      />

      <section className="panel-gold py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow mb-4">Partner with us</p>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-semibold tracking-tight mb-4 sm:mb-5 lg:mb-6 leading-tight">
            Bring an Outreach Session to Your School or Community
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-gray-900/85 max-w-2xl">
            We partner with schools, churches, and organisations to deliver talks, workshops, and Emotional
            Intelligence sessions tailored to your audience.
          </p>
          <Link href="/contact">
            <Button className="bg-white text-gray-900 hover:bg-gray-100 shadow-sm px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg text-sm font-semibold transition-colors duration-150">
              Get in Touch
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
