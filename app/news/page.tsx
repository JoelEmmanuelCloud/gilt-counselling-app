import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import Image from 'next/image';
import StoryFeed from '@/components/stories/StoryFeed';

export const metadata: Metadata = {
  alternates: {
    canonical: '/news',
  },
  title: 'News & Media',
  description:
    'Radio and television features, awards, events, and milestones from Gilt Counselling Consult, including our work with CASSON and the Canadian Counselling and Psychotherapy Association.',
  openGraph: {
    title: 'News & Media | Gilt Counselling Consult',
    description: 'Media appearances, events, awards, and milestones from Gilt Counselling Consult.',
    url: 'https://giltcounselling.com/news',
  },
};

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-off-white">
      <PageHeader
        eyebrow="News & Media"
        title="News, Media & Milestones"
        description="Our appearances on radio and television, the events we host and attend, and the recognition our work has received."
        image={{ src: '/images/ccpa-conference/ccpa-2.jpeg', alt: 'Dame Prof Chinelo Joy Ugwu speaking at the Canadian Counselling and Psychotherapy Association conference podium' }}
      />

      <section id="media" className="section-container bg-warm-cream scroll-mt-24">
        <SectionHeading
          title="In the Media"
          subtitle="Sharing our expertise on mental health and wellness with the wider public through radio and television."
          centered
        />
        <StoryFeed category="media" badge="Media" emptyMessage="New media features will appear here soon." />
      </section>

      <section id="events" className="section-container bg-off-white scroll-mt-24">
        <SectionHeading
          title="Events & Milestones"
          subtitle="Conferences, awards, programmes, and the moments that mark our journey."
          centered
        />
        <StoryFeed category="event" badge="News" emptyMessage="New events and milestones will appear here soon." />
      </section>

      <section id="professional-development" className="section-container bg-off-white scroll-mt-24">
        <SectionHeading
          title="Professional Development"
          subtitle="Staying current with evidence-based research and international best practice."
          centered
        />
        <div className="max-w-5xl mx-auto">
          <p className="body-md text-center text-gray-700 mb-8">
            Prof Chinelo Ugwu, founder of Gilt Counselling Consult, at the 2025 Canadian Counselling
            and Psychotherapy Association (CCPA) conference in Calgary.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {[
              { src: '/images/ccpa-conference/ccpa-1.jpeg', alt: 'Prof Chinelo Ugwu at CCPA conference with fellow delegate' },
              { src: '/images/ccpa-conference/ccpa-2.jpeg', alt: 'Prof Chinelo Ugwu speaking at the CCPA conference podium' },
              { src: '/images/ccpa-conference/ccpa-3.jpeg', alt: 'Prof Chinelo Ugwu with colleagues at CCPA conference session' },
              { src: '/images/ccpa-conference/ccpa-4.jpeg', alt: 'Prof Chinelo Ugwu networking with author Patricia Morgan at CCPA conference' },
              { src: '/images/ccpa-conference/ccpa-5.jpeg', alt: 'Prof Chinelo Ugwu at the CCPA conference booth' },
              { src: '/images/ccpa-conference/ccpa-6.jpeg', alt: 'Prof Chinelo Ugwu with fellow counselling professional at CCPA conference' },
            ].map((photo, index) => (
              <div key={index} className="relative h-[200px] sm:h-[240px] md:h-[280px] rounded-lg overflow-hidden">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={60}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="panel-gold py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow mb-4">Media enquiries</p>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-semibold tracking-tight mb-4 sm:mb-5 lg:mb-6 leading-tight">
            Invite Us to Speak
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-gray-900/85 max-w-2xl">
            We welcome interviews, panels, and speaking invitations on mental health, youth development, and
            family wellbeing.
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
