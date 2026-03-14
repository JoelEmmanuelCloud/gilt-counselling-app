import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import SessionProvider from '@/components/SessionProvider';
import { AuthProvider } from '@/lib/AuthContext';
import { ToastProvider } from '@/components/ui/Toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://giltcounselling.com'),
  title: {
    default: 'Gilt Counselling Consult | Professional Counselling in Port Harcourt',
    template: '%s | Gilt Counselling Consult',
  },
  description: 'Professional counselling services in Port Harcourt, Nigeria. Empowering teens, youths, and families through mental health support, educational consulting, and youth development. Book a session today.',
  keywords: [
    'counselling Port Harcourt',
    'mental health Port Harcourt',
    'youth counselling Nigeria',
    'teen counselling Port Harcourt',
    'family counselling Nigeria',
    'Gilt Counselling Consult',
    'counselling services Nigeria',
    'educational consulting Port Harcourt',
    'Dame Prof Chinelo Joy Ugwu',
  ],
  authors: [{ name: 'Gilt Counselling Consult' }],
  creator: 'Gilt Counselling Consult',
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: 'https://giltcounselling.com',
    siteName: 'Gilt Counselling Consult',
    title: 'Gilt Counselling Consult | Professional Counselling in Port Harcourt',
    description: 'Professional counselling services in Port Harcourt, Nigeria. Empowering teens, youths, and families through mental health support, educational consulting, and youth development.',
    images: [
      {
        url: '/images/Gilt Counselling Consult.jpg',
        width: 1200,
        height: 630,
        alt: 'Gilt Counselling Consult - Professional Counselling Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gilt Counselling Consult | Professional Counselling in Port Harcourt',
    description: 'Professional counselling services in Port Harcourt, Nigeria. Empowering teens, youths, and families.',
    images: ['/images/Gilt Counselling Consult.jpg'],
    site: '@giltcounselling',
  },
  icons: {
    icon: '/icon-192.png',
    apple: '/icon-192.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    google: 'rRCJL27uUwq8Mhuqx4VMwYC8yY_uGjDdPfs2Jyz0OFg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-body" suppressHydrationWarning>
        <SessionProvider>
          <AuthProvider>
            <ToastProvider>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                  {children}
                </main>
                <Footer />
                <WhatsAppButton />
              </div>
            </ToastProvider>
          </AuthProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
