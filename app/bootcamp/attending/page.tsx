import type { Metadata } from 'next';
import Link from 'next/link';
import SectionHeading from '@/components/ui/SectionHeading';
import AttendingBadgeCreator, { WHATSAPP_REGISTER_URL } from '@/components/bootcamp/AttendingBadgeCreator';

export const metadata: Metadata = {
  title: "I'm Attending the Holiday Bootcamp",
  description: 'Create a personalized "I\'m Attending" badge for the Gilt Consult Champions 2026 Holiday Psycho-Social Skills Bootcamp and share it with friends and family.',
  alternates: {
    canonical: '/bootcamp/attending',
  },
};

export default function BootcampAttendingPage() {
  return (
    <div className="min-h-screen bg-off-white">
      <section className="bg-gradient-to-br from-warm-cream via-off-white to-warm-sand py-10 sm:py-14 md:py-16">
        <div className="section-container">
          <SectionHeading
            centered
            title="I'm Attending the Holiday Bootcamp"
            subtitle="Add your photo, create your badge, and let friends and family know you'll be at the Gilt Consult Champions 2026 Holiday Psycho-Social Skills Bootcamp."
          />
        </div>
      </section>

      <section className="section-container bg-off-white">
        <AttendingBadgeCreator />
      </section>

      <section className="section-container bg-warm-cream">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-gray-900 mb-3">
            Not registered yet?
          </h2>
          <p className="text-gray-600 mb-6">
            Theme: &ldquo;When My Child Is Mentored By Professionals&rdquo; · Ages 9-14 &amp; 15-18 · 10th-28th Aug 2026, 9am
            <br />
            Vineyard Building by KFC, 88 Woji Road, GRA Phase 2, Port Harcourt, Rivers State.
          </p>
          <a
            href={WHATSAPP_REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 rounded-lg font-semibold text-white bg-[#25D366] hover:opacity-90 transition"
          >
            Register on WhatsApp
          </a>
          <p className="mt-4">
            <Link href="/" className="text-sm text-muted-teal hover:underline">
              Back to home
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
