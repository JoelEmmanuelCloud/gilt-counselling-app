import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/blog',
  },
  title: 'Resources & Insights',
  description: 'Expert articles and practical guides on mental health, teen development, parenting, family wellness, and self-care from the team at Gilt Counselling Consult.',
  openGraph: {
    title: 'Resources & Insights | Gilt Counselling Consult',
    description: 'Practical guidance and expert insights on mental health, teen development, family wellness, and self-care from professional counsellors in Port Harcourt.',
    url: 'https://giltcounselling.com/blog',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
