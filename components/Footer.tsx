'use client';

import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About Us' },
    { href: '/testimonies', label: 'Testimonies' },
  ];

  const resources = [
    { href: '/blog', label: 'Resources' },
    { href: '/contact', label: 'Contact' },
    { href: '/book-appointment', label: 'Book Appointment' },
  ];

  const coreValues = [
    { name: 'Joy', color: 'bg-soft-gold' },
    { name: 'Optimism', color: 'bg-muted-teal' },
    { name: 'Confidentiality', color: 'bg-olive-green' },
    { name: 'Integrity', color: 'bg-muted-coral' },
    { name: 'Inclusion', color: 'bg-gentle-blue-grey' },
  ];

  return (
    <footer className="bg-warm-cream border-t border-soft-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-soft-gold to-muted-coral rounded-full flex items-center justify-center">
                <span className="text-white font-heading font-bold text-lg">G</span>
              </div>
              <div>
                <h3 className="text-lg font-heading font-bold text-soft-gold">Gilt Counselling</h3>
                <p className="text-xs text-gray-600">Consult</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              Empowering teens & youths for optimal development.
            </p>
            <div className="flex flex-wrap gap-2">
              {coreValues.map((value) => (
                <span
                  key={value.name}
                  className={`${value.color} text-white px-2 py-1 text-xs rounded-full font-medium`}
                >
                  {value.name}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-soft-gold transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-heading font-semibold text-gray-900 mb-4">Resources</h4>
            <ul className="space-y-2">
              {resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-soft-gold transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-semibold text-gray-900 mb-4">Contact Us</h4>
            <div className="space-y-4 text-sm">
              <div>
                <p className="font-semibold text-gray-900 mb-1">Nigeria Office</p>
                <p className="text-gray-600 leading-relaxed">
                  88 Woji Road, Vineyard Building<br />
                  GRA Phase 2, Port Harcourt<br />
                  Rivers State
                </p>
                <p className="text-gray-600 mt-2">
                  <a href="tel:+2348033094050" className="hover:text-soft-gold transition-colors">
                    +234 803 309 4050
                  </a>
                  <br />
                  <a href="tel:+2347065734165" className="hover:text-soft-gold transition-colors">
                    +234 706 573 4165
                  </a>
                </p>
              </div>

              <div>
                <p className="font-semibold text-gray-900 mb-1">Canada Office</p>
                <p className="text-gray-600 leading-relaxed">
                  470 Front St W<br />
                  Toronto, Ontario M5V 0V6
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-soft-beige">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-600 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} Gilt Counselling Consult. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs text-center md:text-right">
              Your privacy and confidentiality are our priority.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
