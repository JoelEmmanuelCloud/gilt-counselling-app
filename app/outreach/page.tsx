import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import OutreachShowcase from '@/components/OutreachShowcase';
import SchoolQuotes from '@/components/stories/SchoolQuotes';
import StoryFeed from '@/components/stories/StoryFeed';

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

export default function OutreachPage() {
  return (
    <div className="min-h-screen bg-off-white">
      <PageHeader
        eyebrow="Outreach"
        title="Taking Support Beyond the Counselling Room"
        description="From secondary school classrooms to churches, inclusive centres, and conferences, we bring mental health education and practical support to the communities we serve."
        image={{ src: '/images/outreach/grove/grove-team-sign.jpeg', alt: 'The Gilt Counselling Consult team outside The Grove School Secondary during a schools outreach visit' }}
      />

      <section id="schools" className="section-container bg-warm-cream scroll-mt-24">
        <SectionHeading
          title="Schools Outreach Programme"
          subtitle="Bringing Emotional Intelligence education to secondary schools across Port Harcourt."
          centered
        />
        <div className="max-w-5xl mx-auto">
          <OutreachShowcase />
        </div>
      </section>

      <section className="section-container bg-off-white">
        <SectionHeading
          title="What Schools Are Saying"
          subtitle="Feedback from students, counsellors, and principals after our Emotional Intelligence sessions."
          centered
        />
        <SchoolQuotes />
      </section>

      <section id="community" className="section-container bg-warm-cream scroll-mt-24">
        <SectionHeading
          title="Community Outreach"
          subtitle="Making a difference beyond our counselling rooms — bringing support and awareness to communities."
          centered
        />
        <StoryFeed
          category="community"
          badge="Community"
          emptyMessage="New community outreach stories will appear here soon."
        />
      </section>

      <section className="section-container bg-off-white">
        <SectionHeading
          title="Chairs Donated to Otana Inclusive Centre"
          subtitle="Giving back to our community — one act of love at a time."
          centered
        />
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-center">
            <div className="space-y-4 text-gray-700">
              <p className="body-md text-left">
                As part of our ongoing outreach programmes, Gilt Counselling Consult donated executive chairs
                to Otana Inclusive Centre — a gesture born from a deep commitment to the wellbeing of every child,
                regardless of ability.
              </p>
              <blockquote className="border-l-4 border-soft-gold pl-4 italic text-gray-600">
                "You have provided executive chairs for our special children to sit on. God will surely make them
                executive individuals in their life's endeavours. This heartfelt gift is proof of your love for
                humanity and Otana Inclusive Centre. God bless you and your team at Gilt Counselling Consult."
              </blockquote>
              <p className="body-md text-left text-gray-600">
                We are honoured by the warm reception from the centre's leadership and remain committed to serving
                communities in need through compassionate action.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[
                { src: '/images/outreach/otana-outreach-1.jpeg', alt: 'Gilt Counselling Consult donating chairs to Otana Inclusive Centre' },
                { src: '/images/outreach/otana-outreach-2.jpeg', alt: 'Executive chairs donated to special needs children at Otana Inclusive Centre' },
              ].map((photo, index) => (
                <div key={index} className="relative h-[200px] sm:h-[230px] md:h-[260px] rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={60}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-container bg-warm-cream">
        <SectionHeading
          title="All Saints Cathedral Workshop"
          subtitle="CEO GILT coordinated a one-day workshop for the All Saints Cathedral Education and Empowerment Committee."
          centered
        />
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-center mb-6 sm:mb-8">
            <div className="space-y-4 text-gray-700">
              <p className="body-md text-left">
                Dame Prof Chinelo Joy Ugwu, CEO of Gilt Counselling Consult, coordinated a one-day
                workshop for the All Saints Cathedral Education and Empowerment Committee. The workshop
                brought together members of the committee for a day of learning, empowerment, and
                professional development.
              </p>
              <p className="body-md text-left text-gray-600">
                This initiative reflects Gilt Counselling Consult&apos;s dedication to extending
                professional support beyond the counselling room and into the wider community.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {[1, 2, 3, 6].map((i) => (
                <div key={i} className="relative h-[140px] sm:h-[170px] md:h-[200px] rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={`/images/workshops/all-saints/all-saints-workshop-${i}.jpeg`}
                    alt={`All Saints Cathedral Education and Empowerment Committee Workshop - Photo ${i}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    quality={60}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
            {[7, 9, 10, 14, 15].map((i) => (
              <div key={i} className="relative h-[120px] sm:h-[140px] md:h-[160px] rounded-lg overflow-hidden shadow-md">
                <Image
                  src={`/images/workshops/all-saints/all-saints-workshop-${i}.jpeg`}
                  alt={`All Saints Cathedral workshop activity - Photo ${i}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
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
