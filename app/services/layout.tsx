import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/services',
  },
  title: 'Our Services',
  description: 'Explore Gilt Counselling Consult\'s full range of services — mental health support, educational consulting, youth counselling, family therapy, career guidance, and organizational training in Port Harcourt, Nigeria.',
  openGraph: {
    title: 'Our Services | Gilt Counselling Consult',
    description: 'Mental health support, educational consulting, youth counselling, family therapy, and more. Professional counselling services in Port Harcourt, Nigeria.',
    url: 'https://giltcounselling.com/services',
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
