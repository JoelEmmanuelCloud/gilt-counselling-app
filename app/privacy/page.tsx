export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-off-white">
      <section className="bg-gradient-to-br from-warm-cream via-off-white to-warm-sand py-10 sm:py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="heading-xl mb-4 sm:mb-6">Privacy Policy</h1>
          <p className="body-lg">Gilt Counselling Consult</p>
        </div>
      </section>

      <section className="section-container">
        <div className="max-w-3xl mx-auto">
          <div className="bg-warm-cream border border-soft-gold/40 rounded-xl px-5 py-4 mb-10">
            <p className="body-md">
              This page is a placeholder while our full Privacy Policy is being finalized.
              It does not yet reflect our final, legally reviewed policy. If you have
              questions in the meantime, please contact us at{' '}
              <a href="mailto:wecare@giltcounselling.com" className="text-soft-gold hover:text-muted-coral transition-colors">
                wecare@giltcounselling.com
              </a>.
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="heading-sm mb-3">1. Information We Collect</h2>
              <p className="body-md">
                When you book an appointment, create an account, or contact us, we may
                collect your name, email address, phone number, and any details you choose
                to share with us about the reason for your visit.
              </p>
            </div>

            <div>
              <h2 className="heading-sm mb-3">2. How We Use Your Information</h2>
              <p className="body-md">
                We use this information to schedule and provide counselling services,
                respond to your enquiries, and communicate with you about your
                appointments. We do not sell your personal information.
              </p>
            </div>

            <div>
              <h2 className="heading-sm mb-3">3. Minors and Safeguarding</h2>
              <p className="body-md">
                Some of our services support teens and young people. Where a client is a
                minor, we handle their information with the additional care and
                safeguarding obligations appropriate to working with young people, and
                involve a parent or guardian as appropriate.
              </p>
            </div>

            <div>
              <h2 className="heading-sm mb-3">4. Data Security</h2>
              <p className="body-md">
                We take reasonable technical and organizational measures to protect your
                information from unauthorized access, loss, or misuse.
              </p>
            </div>

            <div>
              <h2 className="heading-sm mb-3">5. Your Rights</h2>
              <p className="body-md">
                You may request access to, correction of, or deletion of your personal
                information by contacting us using the details below.
              </p>
            </div>

            <div>
              <h2 className="heading-sm mb-3">6. Contact Us</h2>
              <p className="body-md">
                Questions about this policy can be sent to{' '}
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
