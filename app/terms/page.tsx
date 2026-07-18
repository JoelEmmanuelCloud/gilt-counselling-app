import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-off-white">
      <section className="bg-gradient-to-br from-warm-cream via-off-white to-warm-sand py-10 sm:py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="heading-xl mb-4 sm:mb-6">Terms of Service</h1>
          <p className="body-lg">Gilt Counselling Consult</p>
        </div>
      </section>

      <section className="section-container">
        <div className="max-w-3xl mx-auto">
          <div className="bg-warm-cream border border-soft-gold/40 rounded-xl px-5 py-4 mb-10">
            <p className="body-md">
              This page is a placeholder while our full Terms of Service are being finalized.
              It does not yet reflect our final, legally reviewed terms. If you have questions
              in the meantime, please contact us at{' '}
              <a href="mailto:wecare@giltcounselling.com" className="text-soft-gold hover:text-muted-coral transition-colors">
                wecare@giltcounselling.com
              </a>.
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="heading-sm mb-3">1. Acceptance of Terms</h2>
              <p className="body-md">
                By accessing or using the Gilt Counselling Consult website or booking a
                session with us, you agree to be bound by these Terms of Service.
              </p>
            </div>

            <div>
              <h2 className="heading-sm mb-3">2. Our Services</h2>
              <p className="body-md">
                Gilt Counselling Consult provides professional counselling, educational
                consulting, and youth development services in Port Harcourt, Nigeria, and
                online. Our services support but do not replace emergency medical or
                psychiatric care. If you are experiencing a crisis or emergency, please
                contact the nearest emergency service immediately.
              </p>
            </div>

            <div>
              <h2 className="heading-sm mb-3">3. Appointments and Cancellations</h2>
              <p className="body-md">
                Appointments booked through our website or by phone are subject to
                availability. We ask that you provide as much notice as possible if you
                need to reschedule or cancel a session.
              </p>
            </div>

            <div>
              <h2 className="heading-sm mb-3">4. Confidentiality</h2>
              <p className="body-md">
                We take client confidentiality seriously. Details of how we collect, use,
                and protect your information are set out in our{' '}
                <Link href="/privacy" className="text-soft-gold hover:text-muted-coral transition-colors">
                  Privacy Policy
                </Link>.
              </p>
            </div>

            <div>
              <h2 className="heading-sm mb-3">5. Limitation of Liability</h2>
              <p className="body-md">
                To the extent permitted by law, Gilt Counselling Consult is not liable for
                indirect or consequential loss arising from use of our website or services.
              </p>
            </div>

            <div>
              <h2 className="heading-sm mb-3">6. Governing Law</h2>
              <p className="body-md">
                These terms are governed by the laws of the Federal Republic of Nigeria.
              </p>
            </div>

            <div>
              <h2 className="heading-sm mb-3">7. Contact Us</h2>
              <p className="body-md">
                Questions about these terms can be sent to{' '}
                <a href="mailto:wecare@giltcounselling.com" className="text-soft-gold hover:text-muted-coral transition-colors">
                  wecare@giltcounselling.com
                </a>{' '}
                or to our office at 88 Woji Road, Vineyard Building, GRA Phase 2, Port
                Harcourt.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
