import Link from 'next/link';

const linkClass =
  'font-medium text-gilt-gold-strong underline decoration-gilt-gold/60 underline-offset-2 transition-colors hover:text-gilt-orange-strong';

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-off-white">
      <section className="panel-gold py-14 sm:py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow mb-4">Legal</p>
          <h1 className="heading-xl max-w-3xl mb-4 sm:mb-6">Cookie Policy</h1>
          <p className="body-lg max-w-2xl text-gray-900/85">Gilt Counselling Consult</p>
        </div>
      </section>

      <section className="section-container">
        <div className="max-w-3xl mx-auto space-y-8">
          <div>
            <h2 className="heading-sm mb-3">1. What Cookies Are</h2>
            <p className="body-md">
              Cookies are small text files that a website saves in your browser. Similar technologies, such as your
              browser&apos;s local storage, let a website remember small pieces of information between visits. This
              policy explains how this website uses them.
            </p>
          </div>

          <div>
            <h2 className="heading-sm mb-3">2. What We Use</h2>
            <p className="body-md mb-4">
              We currently only use cookies and storage that are strictly necessary for the website to work. We do not
              use advertising, analytics, or tracking cookies, and we do not build profiles of visitors.
            </p>
            <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
              <table className="w-full text-left text-sm">
                <thead className="bg-warm-cream text-gray-900">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">Name</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Type</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Purpose</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-700">
                  <tr>
                    <td className="px-4 py-3 font-mono text-xs">gilt_cookie_consent</td>
                    <td className="px-4 py-3">Cookie</td>
                    <td className="px-4 py-3">Remembers your cookie choices so we do not ask you again on every visit.</td>
                    <td className="px-4 py-3">6 months</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-xs">token</td>
                    <td className="px-4 py-3">Local storage</td>
                    <td className="px-4 py-3">Keeps our staff signed in to the website&apos;s content manager. It is only set for staff who sign in.</td>
                    <td className="px-4 py-3">Until the staff member signs out</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-xs">admin-login-email</td>
                    <td className="px-4 py-3">Local storage</td>
                    <td className="px-4 py-3">Remembers a staff member&apos;s email address on the sign-in form when they choose to be remembered.</td>
                    <td className="px-4 py-3">Until the staff member turns it off</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-xs">admin-sidebar-collapsed</td>
                    <td className="px-4 py-3">Local storage</td>
                    <td className="px-4 py-3">Remembers whether a staff member collapsed the content manager sidebar.</td>
                    <td className="px-4 py-3">Until you clear your browser data</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="heading-sm mb-3">3. Third-Party Websites</h2>
            <p className="body-md">
              Our website links to services such as WhatsApp, YouTube, Facebook, Instagram, and TikTok. When you follow
              those links, you leave our website and those services may set their own cookies under their own policies.
            </p>
          </div>

          <div>
            <h2 className="heading-sm mb-3">4. Managing Cookies</h2>
            <p className="body-md">
              You can accept, reject, or choose which optional cookies to allow when you first visit, and change your
              choice at any time using the Cookie settings link at the bottom of every page. You can also delete cookies
              and local storage through your browser settings; if you do, we will ask for your choice again.
            </p>
          </div>

          <div>
            <h2 className="heading-sm mb-3">5. Changes to This Policy</h2>
            <p className="body-md">
              If we start using any optional cookies, such as analytics or marketing cookies, we will list them here
              and only set them if you have allowed that category.
            </p>
          </div>

          <div>
            <h2 className="heading-sm mb-3">6. Contact Us</h2>
            <p className="body-md">
              Questions about this policy can be sent to{' '}
              <a href="mailto:wecare@giltcounselling.com" className={linkClass}>
                wecare@giltcounselling.com
              </a>
              . You can also read our{' '}
              <Link href="/privacy" className={linkClass}>
                Privacy Policy
              </Link>{' '}
              and{' '}
              <Link href="/terms" className={linkClass}>
                Terms of Service
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
