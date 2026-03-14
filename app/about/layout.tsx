import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Gilt Counselling Consult, our founder Dame Prof Chinelo Joy Ugwu, our dedicated team, and our mission to empower teens and youths in Port Harcourt and beyond.',
  openGraph: {
    title: 'About Us | Gilt Counselling Consult',
    description: 'Meet our team and learn about our mission to empower teens, youths, and families through professional counselling in Port Harcourt, Nigeria.',
    url: 'https://giltcounselling.com/about',
    images: [
      {
        url: '/images/Dame Prof Chinelo Joy Ugwu.jpeg',
        width: 1200,
        height: 630,
        alt: 'Dame Prof Chinelo Joy Ugwu - Founder & CEO of Gilt Counselling Consult',
      },
    ],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
