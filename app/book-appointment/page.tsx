'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useAuth } from '@/lib/AuthContext';
import api from '@/lib/api';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import AuthModal from '@/components/AuthModal';

export default function BookAppointment() {
  const { data: session, status } = useSession();
  const { user: customUser, token } = useAuth(); // Custom auth context for OTP users
  const router = useRouter();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserInfoForm, setShowUserInfoForm] = useState(false);

  // Use either NextAuth user (Google) or custom auth user (OTP)
  const user = session?.user || customUser;
  const isAuthenticated = status === 'authenticated' || (token && customUser);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    service: '',
    date: '',
    time: '',
    notes: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Check authentication status on mount
  useEffect(() => {
    if (status === 'loading') return;

    // Check both auth systems
    if (!isAuthenticated) {
      setShowAuthModal(true);
    } else if (user) {
      // Update form data with user info
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
      }));

      // Check if we need additional user info (phone number)
      if (!user.phone) {
        setShowUserInfoForm(true);
      }
    }
  }, [status, isAuthenticated, user]);

  const services = [
    {
      name: 'Mental Health & Emotional Wellness',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      name: 'Educational Consulting',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      name: 'School Counselling Consult',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      name: 'Academic and Career Counselling',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
    },
    {
      name: 'Youth Counselling, Life Skills & Mentoring',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      name: 'Parenting & Special Needs Support',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      name: 'Organizational Staff Training',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      name: 'Group Therapy, Outreach & Advocacy',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      name: 'Online Counselling',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await api.post('/appointments', formData);
      setSuccess('Your appointment request has been received. We\'ll be in touch within 24 hours to confirm your session.');
      setTimeout(() => {
        router.push('/dashboard');
      }, 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'We encountered an issue processing your request. Please try again or contact us directly.');
    } finally {
      setLoading(false);
    }
  };

  // Show auth modal if not authenticated
  if (showAuthModal && !isAuthenticated) {
    return (
      <AuthModal
        redirectTo="/book-appointment"
        onClose={() => {
          setShowAuthModal(false);
          router.push('/');
        }}
      />
    );
  }

  // Show loading state while checking auth
  if (status === 'loading' && !token) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-soft-terracotta mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show user info collection modal if needed
  const UserInfoModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-8">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-soft-terracotta rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-2xl font-heading font-bold text-gray-900 mb-2">Complete your profile</h2>
          <p className="text-gray-600 text-sm">
            We need a few more details to complete your booking
          </p>
        </div>

        <form onSubmit={async (e) => {
          e.preventDefault();
          try {
            // Update user profile with phone number
            await api.patch('/profile', {
              phone: formData.phone,
            });
            setShowUserInfoForm(false);
          } catch (err) {
            console.error('Failed to update profile:', err);
            alert('Failed to update profile. Please try again.');
          }
        }} className="space-y-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              required
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-soft-terracotta focus:border-transparent"
              placeholder="+234 xxx xxx xxxx"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
          >
            Continue to Booking
          </Button>
        </form>
      </div>
    </div>
  );

  return (
    <>
      {showUserInfoForm && <UserInfoModal />}
      <div className="min-h-screen bg-off-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-warm-cream via-off-white to-warm-sand py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="heading-xl mb-6">Take the First Step</h1>
          <p className="body-lg mb-4">
            We're here to support you on your journey. Book a consultation at a time that works for you.
          </p>
          <p className="text-sm text-gray-600">
            Not sure which service is right for you? That's okay—we'll help you find the best fit during your first session.
          </p>
        </div>
      </section>

      {/* Privacy Notice */}
      <section className="section-container">
        <div className="max-w-3xl mx-auto">
          <Card variant="warm" className="text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <svg className="w-5 h-5 text-soft-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <h3 className="font-heading font-semibold text-lg text-gray-900">Your Privacy Matters</h3>
            </div>
            <p className="text-gray-700 text-sm">
              All information you share is kept strictly confidential. We take your privacy seriously and will never share your details without your consent.
            </p>
          </Card>
        </div>
      </section>

      {/* Booking Form */}
      <section className="section-container bg-off-white">
        <div className="max-w-3xl mx-auto">
          <SectionHeading
            title="Schedule Your Session"
            subtitle="Fill out the form below and we'll confirm your appointment within 24 hours."
            centered
          />

          <Card>
            {error && (
              <div className="bg-muted-coral bg-opacity-10 border border-muted-coral text-gray-800 px-4 py-3 rounded-lg mb-6 flex items-start gap-3">
                <svg className="w-5 h-5 text-muted-coral flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm">{error}</p>
              </div>
            )}

            {success && (
              <div className="bg-olive-green bg-opacity-10 border border-olive-green text-gray-800 px-4 py-3 rounded-lg mb-6 flex items-start gap-3">
                <svg className="w-5 h-5 text-olive-green flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm">{success}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div>
                <h3 className="font-heading font-semibold text-lg text-gray-900 mb-4">Your Information</h3>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="label">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="input"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="label">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="input"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="label">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="input"
                      placeholder="+234 xxx xxx xxxx"
                    />
                  </div>
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <h3 className="font-heading font-semibold text-lg text-gray-900 mb-4">Choose a Service</h3>
                <div className="space-y-2">
                  {services.map((service, index) => (
                    <label
                      key={index}
                      className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        formData.service === service.name
                          ? 'border-soft-gold bg-warm-cream'
                          : 'border-light-grey bg-white hover:border-soft-gold hover:bg-warm-cream'
                      }`}
                    >
                      <input
                        type="radio"
                        name="service"
                        value={service.name}
                        checked={formData.service === service.name}
                        onChange={handleChange}
                        required
                        className="sr-only"
                      />
                      <div className={`flex-shrink-0 ${formData.service === service.name ? 'text-soft-gold' : 'text-gray-400'}`}>
                        {service.icon}
                      </div>
                      <span className={`text-sm font-medium ${formData.service === service.name ? 'text-gray-900' : 'text-gray-700'}`}>
                        {service.name}
                      </span>
                      {formData.service === service.name && (
                        <svg className="w-5 h-5 text-soft-gold ml-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              {/* Date and Time */}
              <div>
                <h3 className="font-heading font-semibold text-lg text-gray-900 mb-4">Preferred Date & Time</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="date" className="label">Date</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="input"
                    />
                    <p className="text-xs text-gray-500 mt-1">We'll do our best to accommodate your preferred date</p>
                  </div>

                  <div>
                    <label htmlFor="time" className="label">Time</label>
                    <select
                      id="time"
                      name="time"
                      required
                      value={formData.time}
                      onChange={handleChange}
                      className="input"
                    >
                      <option value="">Select a time...</option>
                      {timeSlots.map((time, index) => (
                        <option key={index} value={time}>{time}</option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Available Monday-Saturday (hours vary by location)</p>
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label htmlFor="notes" className="label">Additional Information (Optional)</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                  className="input"
                  placeholder="Is there anything you'd like us to know before your session? Feel free to share any questions or concerns."
                />
                <p className="text-xs text-gray-500 mt-1">This helps us prepare for your session, but it's completely optional</p>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? 'Sending Your Request...' : 'Request Appointment'}
                </Button>
                <p className="text-xs text-gray-600 text-center mt-3">
                  By submitting this form, you agree to our privacy policy and consent to be contacted regarding your appointment.
                </p>
              </div>
            </form>
          </Card>
        </div>
      </section>

      {/* Help Section */}
      <section className="section-container bg-warm-cream">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="heading-sm mb-4">Have Questions?</h3>
          <p className="body-md text-gray-700 mb-6">
            If you'd prefer to speak with us before booking, or if you have questions about our services, we're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/contact">
              <Button variant="secondary" className="w-full sm:w-auto">
                Contact Us
              </Button>
            </a>
            <a href="/services">
              <Button variant="ghost" className="w-full sm:w-auto">
                Learn About Our Services
              </Button>
            </a>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
