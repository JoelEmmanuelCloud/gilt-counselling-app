import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/cookies',
  },
  title: 'Cookie Policy',
  description: 'How Gilt Counselling Consult uses cookies and browser storage on this website.',
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: 'Cookie Policy | Gilt Counselling Consult',
    description: 'How Gilt Counselling Consult uses cookies and browser storage on this website.',
    url: 'https://giltcounselling.com/cookies',
  },
};

export default function CookiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
