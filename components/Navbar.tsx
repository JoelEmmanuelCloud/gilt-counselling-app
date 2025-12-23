'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/');
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About Us' },
    { href: '/testimonies', label: 'Testimonies' },
    { href: '/blog', label: 'Resources' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="bg-white shadow-calm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-soft-gold to-muted-coral rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <span className="text-white font-heading font-bold text-xl">G</span>
            </div>
            <div>
              <h1 className="text-2xl font-heading font-bold text-soft-gold">Gilt Counselling</h1>
              <p className="text-xs text-gray-600 font-body">Consult</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-soft-gold transition-colors duration-200 font-body font-medium"
              >
                {link.label}
              </Link>
            ))}

            {user ? (
              <>
                {user.role === 'admin' ? (
                  <Link
                    href="/admin"
                    className="text-gray-700 hover:text-soft-gold transition-colors duration-200 font-semibold"
                  >
                    Admin
                  </Link>
                ) : (
                  <Link
                    href="/dashboard"
                    className="text-gray-700 hover:text-soft-gold transition-colors duration-200"
                  >
                    My Account
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-gray-800 transition-colors duration-200 text-sm"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-soft-gold hover:text-muted-coral transition-colors duration-200 font-semibold"
                >
                  Sign In
                </Link>
                <Link
                  href="/book-appointment"
                  className="bg-soft-gold text-white px-5 py-2 rounded-lg hover:bg-muted-coral transition-colors duration-300 font-medium"
                >
                  Book Appointment
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-warm-cream transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-warm-cream border-t border-light-grey">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-gray-700 hover:text-soft-gold transition-colors duration-200 py-2 font-medium"
              >
                {link.label}
              </Link>
            ))}

            <div className="border-t border-light-grey pt-3 mt-3">
              {user ? (
                <>
                  {user.role === 'admin' ? (
                    <Link
                      href="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-gray-700 hover:text-soft-gold transition-colors duration-200 py-2 font-semibold"
                    >
                      Admin Dashboard
                    </Link>
                  ) : (
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-gray-700 hover:text-soft-gold transition-colors duration-200 py-2"
                    >
                      My Account
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left text-gray-600 hover:text-gray-800 transition-colors duration-200 py-2 text-sm"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-soft-gold hover:text-muted-coral transition-colors duration-200 py-2 font-semibold"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/book-appointment"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block bg-soft-gold text-white px-5 py-2 rounded-lg hover:bg-muted-coral transition-colors duration-300 font-medium text-center mt-2"
                  >
                    Book Appointment
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
