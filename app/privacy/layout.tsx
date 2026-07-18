import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/privacy',
  },
  title: 'Privacy Policy',
  description: 'Privacy Policy for Gilt Counselling Consult.',
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: 'Privacy Policy | Gilt Counselling Consult',
    description: 'Privacy Policy for Gilt Counselling Consult.',
    url: 'https://giltcounselling.com/privacy',
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
