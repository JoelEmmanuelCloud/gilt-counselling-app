import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/terms',
  },
  title: 'Terms of Service',
  description: 'Terms of Service for Gilt Counselling Consult.',
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: 'Terms of Service | Gilt Counselling Consult',
    description: 'Terms of Service for Gilt Counselling Consult.',
    url: 'https://giltcounselling.com/terms',
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
