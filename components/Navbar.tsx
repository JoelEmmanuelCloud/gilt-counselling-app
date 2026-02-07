'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useAuth } from '@/lib/AuthContext';
import AuthModal from '@/components/AuthModal';

const Navbar: React.FC = () => {
  const { data: session, status } = useSession();
  const { user: customUser, token, logout: customLogout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Use either NextAuth user (Google) or custom auth user (OTP)
  const user = session?.user || customUser;
  const isAuthenticated = status === 'authenticated' || (token && customUser);

  const handleBookSession = () => {
    if (isAuthenticated) {
      // Redirect based on user role
      if (user?.role === 'admin') {
        router.push('/admin');
      } else if (user?.role === 'counselor') {
        router.push('/counselor');
      } else {
        router.push('/dashboard');
      }
    } else {
      setShowAuthModal(true);
      setMobileMenuOpen(false);
    }
  };

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    // Handle both auth methods
    if (session) {
      // NextAuth (Google) logout
      await signOut({ callbackUrl: '/' });
    } else if (token) {
      // Custom OTP logout
      customLogout();
      router.push('/');
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Programs' },
    { href: '/contact', label: 'Contact' },
    { href: '/blog', label: 'Pages' },
  ];

  return (
    <nav className="bg-white sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-warm-cream border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-10 text-sm">
            <div className="hidden md:flex items-center space-x-6 text-gray-600">
              <span className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Port Harcourt, Nigeria | Toronto, Canada</span>
              </span>
              <span className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:wecare@giltcounselling.com" className="hover:text-soft-terracotta transition-colors">wecare@giltcounselling.com</a>
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="https://www.facebook.com/giltcounsellingconsult" target="_blank" rel="noopener noreferrer" className="text-[#1877F2] hover:opacity-80 transition-opacity" aria-label="Facebook">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://x.com/giltcounselling" target="_blank" rel="noopener noreferrer" className="text-[#000000] hover:opacity-80 transition-opacity" aria-label="X (Twitter)">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/@giltcounsellingconsult" target="_blank" rel="noopener noreferrer" className="text-[#FF0000] hover:opacity-80 transition-opacity" aria-label="YouTube">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="https://www.tiktok.com/@giltcounselling" target="_blank" rel="noopener noreferrer" className="text-[#000000] hover:opacity-80 transition-opacity" aria-label="TikTok">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/giltcounsellingconsult" target="_blank" rel="noopener noreferrer" className="text-[#E4405F] hover:opacity-80 transition-opacity" aria-label="Instagram">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-32 h-20 group-hover:scale-105 transition-transform duration-300">
                <Image
                  src="/Gilt Counselling Consult Profile.svg"
                  alt="Gilt Counselling Consult Logo"
                  fill
                  className="object-contain"
                  sizes="128px"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors duration-200 font-body relative pb-1 ${
                    pathname === link.href
                      ? 'text-soft-terracotta font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-soft-terracotta'
                      : 'text-gray-700 hover:text-soft-terracotta'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {user && (
                <>
                  {user.role === 'admin' && (
                    <Link
                      href="/admin"
                      className={`transition-colors duration-200 relative pb-1 ${
                        pathname === '/admin'
                          ? 'text-soft-terracotta font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-soft-terracotta'
                          : 'text-gray-700 hover:text-soft-terracotta'
                      }`}
                    >
                      Admin
                    </Link>
                  )}
                  {user.role === 'counselor' && (
                    <Link
                      href="/counselor"
                      className={`transition-colors duration-200 relative pb-1 ${
                        pathname === '/counselor'
                          ? 'text-soft-terracotta font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-soft-terracotta'
                          : 'text-gray-700 hover:text-soft-terracotta'
                      }`}
                    >
                      Dashboard
                    </Link>
                  )}
                  {user.role !== 'admin' && user.role !== 'counselor' && (
                    <Link
                      href="/account"
                      className={`transition-colors duration-200 relative pb-1 ${
                        pathname === '/account'
                          ? 'text-soft-terracotta font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-soft-terracotta'
                          : 'text-gray-700 hover:text-soft-terracotta'
                      }`}
                    >
                      My Account
                    </Link>
                  )}
                </>
              )}
            </div>

            {/* Contact & CTA */}
            <div className="hidden lg:flex items-center space-x-6">
              <div className="flex items-center space-x-3 text-gray-700">
                <svg className="w-5 h-5 text-soft-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div className="text-sm">
                  <div className="text-xs text-gray-500">LET'S CHAT</div>
                  <a href="tel:+2348033094050" className="font-semibold hover:text-soft-terracotta transition-colors">+234 803 309 4050</a>
                </div>
              </div>

              {user ? (
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-gray-800 transition-colors duration-200 text-sm"
                >
                  Sign Out
                </button>
              ) : (
                <button
                  onClick={handleBookSession}
                  className="bg-soft-terracotta text-gray-900 px-6 py-2.5 rounded hover:bg-soft-terracotta/90 transition-colors duration-300 font-semibold uppercase text-sm tracking-wide"
                >
                  Book Session
                </button>
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
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Menu Drawer */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out
          w-[280px] xs:w-[300px] sm:w-[340px] md:w-[380px] max-w-[90vw]
          ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Drawer Header */}
        <div className="border-b border-gray-200 safe-area-top">
          {/* Social Links Row */}
          <div className="flex items-center justify-center space-x-4 py-2 bg-warm-cream border-b border-gray-200">
            <a href="https://www.facebook.com/giltcounsellingconsult" target="_blank" rel="noopener noreferrer" className="text-[#1877F2] hover:opacity-80 active:opacity-60 transition-opacity p-1 touch-manipulation" aria-label="Facebook">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="https://x.com/giltcounselling" target="_blank" rel="noopener noreferrer" className="text-[#000000] hover:opacity-80 active:opacity-60 transition-opacity p-1 touch-manipulation" aria-label="X (Twitter)">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://www.youtube.com/@giltcounsellingconsult" target="_blank" rel="noopener noreferrer" className="text-[#FF0000] hover:opacity-80 active:opacity-60 transition-opacity p-1 touch-manipulation" aria-label="YouTube">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a href="https://www.tiktok.com/@giltcounselling" target="_blank" rel="noopener noreferrer" className="text-[#000000] hover:opacity-80 active:opacity-60 transition-opacity p-1 touch-manipulation" aria-label="TikTok">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/giltcounsellingconsult" target="_blank" rel="noopener noreferrer" className="text-[#E4405F] hover:opacity-80 active:opacity-60 transition-opacity p-1 touch-manipulation" aria-label="Instagram">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
              </svg>
            </a>
          </div>
          {/* Logo and Close Button Row */}
          <div className="flex items-center justify-between p-3 sm:p-4">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center">
              <div className="relative w-24 h-14 xs:w-28 xs:h-16 sm:w-32 sm:h-20">
                <Image
                  src="/Gilt Counselling Consult Profile.svg"
                  alt="Gilt Counselling Consult Logo"
                  fill
                  className="object-contain"
                  sizes="(max-width: 475px) 96px, (max-width: 640px) 112px, 128px"
                />
              </div>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-gray-700 hover:bg-warm-cream active:bg-warm-cream/80 transition-colors duration-200 touch-manipulation text-sm sm:text-base font-medium"
              aria-label="Close menu"
            >
              Close
            </button>
          </div>
        </div>

        {/* Drawer Content - Full height scrollable */}
        <div className="h-[calc(100%-96px)] xs:h-[calc(100%-104px)] sm:h-[calc(100%-116px)] overflow-y-auto overscroll-contain">
          <div className="px-3 sm:px-4 py-4 sm:py-6">
            {/* Navigation Links */}
            <div className="space-y-0.5 sm:space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block text-gray-700 hover:text-soft-terracotta active:text-soft-terracotta hover:bg-warm-cream active:bg-warm-cream/80 transition-colors duration-200 py-3 sm:py-3.5 px-3 sm:px-4 rounded-lg font-medium text-sm sm:text-base touch-manipulation ${
                    pathname === link.href ? 'bg-warm-cream text-soft-terracotta' : ''
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {user && (
                <div className="border-t border-gray-200 pt-3 sm:pt-4 mt-3 sm:mt-4">
                  {user.role === 'admin' ? (
                    <Link
                      href="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block text-gray-700 hover:text-soft-terracotta active:text-soft-terracotta hover:bg-warm-cream active:bg-warm-cream/80 transition-colors duration-200 py-3 sm:py-3.5 px-3 sm:px-4 rounded-lg font-semibold text-sm sm:text-base touch-manipulation ${
                        pathname === '/admin' ? 'bg-warm-cream text-soft-terracotta' : ''
                      }`}
                    >
                      Admin Dashboard
                    </Link>
                  ) : user.role === 'counselor' ? (
                    <Link
                      href="/counselor"
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block text-gray-700 hover:text-soft-terracotta active:text-soft-terracotta hover:bg-warm-cream active:bg-warm-cream/80 transition-colors duration-200 py-3 sm:py-3.5 px-3 sm:px-4 rounded-lg font-semibold text-sm sm:text-base touch-manipulation ${
                        pathname === '/counselor' ? 'bg-warm-cream text-soft-terracotta' : ''
                      }`}
                    >
                      Dashboard
                    </Link>
                  ) : (
                    <Link
                      href="/account"
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block text-gray-700 hover:text-soft-terracotta active:text-soft-terracotta hover:bg-warm-cream active:bg-warm-cream/80 transition-colors duration-200 py-3 sm:py-3.5 px-3 sm:px-4 rounded-lg text-sm sm:text-base touch-manipulation ${
                        pathname === '/account' ? 'bg-warm-cream text-soft-terracotta' : ''
                      }`}
                    >
                      My Account
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* Contact Info - Right after nav links */}
            <div className="flex items-center space-x-3 text-gray-700 mt-4 sm:mt-6 p-3 sm:p-4 bg-warm-cream rounded-lg">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-soft-terracotta flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <div className="text-sm sm:text-base">
                <div className="text-xs sm:text-sm text-gray-500">LET'S CHAT</div>
                <a href="tel:+2348033094050" className="font-semibold hover:text-soft-terracotta active:text-soft-terracotta transition-colors touch-manipulation">+234 803 309 4050</a>
              </div>
            </div>

            {/* CTA Button - Right after contact info */}
            <div className="mt-3 sm:mt-4">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="block w-full text-center text-gray-600 hover:text-gray-800 active:text-gray-900 border border-gray-300 bg-white transition-colors duration-200 py-3 sm:py-3.5 rounded-lg text-sm sm:text-base font-medium touch-manipulation"
                >
                  Sign Out
                </button>
              ) : (
                <button
                  onClick={handleBookSession}
                  className="block w-full bg-soft-terracotta text-gray-900 px-4 sm:px-5 py-3 sm:py-3.5 rounded-lg hover:bg-soft-terracotta/90 active:bg-soft-terracotta/80 transition-colors duration-300 font-semibold text-center uppercase text-sm sm:text-base touch-manipulation"
                >
                  Book Session
                </button>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          redirectTo="/dashboard"
        />
      )}
    </nav>
  );
};

export default Navbar;
