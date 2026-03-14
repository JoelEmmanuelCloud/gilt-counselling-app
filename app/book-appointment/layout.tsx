import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book an Appointment',
  description: 'Book a counselling session with Gilt Counselling Consult. Your first 30 minutes is free. In-person at GRA Phase 2 Port Harcourt, or online via video, phone, or WhatsApp.',
  openGraph: {
    title: 'Book an Appointment | Gilt Counselling Consult',
    description: 'Schedule your counselling session today. First 30 minutes free. In-person in Port Harcourt or online worldwide.',
    url: 'https://giltcounselling.com/book-appointment',
  },
};

export default function BookAppointmentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
