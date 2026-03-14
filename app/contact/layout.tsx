import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Gilt Counselling Consult. Visit our office at 88 Woji Road, GRA Phase 2, Port Harcourt, or reach us by phone, WhatsApp, or email. Online consultations available worldwide.',
  openGraph: {
    title: 'Contact Us | Gilt Counselling Consult',
    description: 'Reach Gilt Counselling Consult at 88 Woji Road, GRA Phase 2, Port Harcourt. Call, WhatsApp, or book online. First 30-minute session is free.',
    url: 'https://giltcounselling.com/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
