import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/testimonies',
  },
  title: 'Client Testimonials',
  description: 'Read what clients say about Gilt Counselling Consult. Real stories of transformation, healing, and growth through professional counselling in Port Harcourt, Nigeria.',
  openGraph: {
    title: 'Client Testimonials | Gilt Counselling Consult',
    description: 'Real stories from clients who have experienced transformation through counselling at Gilt Counselling Consult in Port Harcourt, Nigeria.',
    url: 'https://giltcounselling.com/testimonies',
  },
};

export default function TestimoniesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
