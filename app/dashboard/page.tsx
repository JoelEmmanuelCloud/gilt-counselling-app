'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Appointment } from '@/lib/types';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';

interface UserProfile {
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
  };
  emergencyContact?: {
    name?: string;
    phone?: string;
  };
}

function DashboardContent() {
  const { data: session, status } = useSession();
  const { user: customUser, token } = useAuth();
  const router = useRouter();
  const toast = useToast();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [profileComplete, setProfileComplete] = useState(true);
  const [rescheduleModal, setRescheduleModal] = useState<{ isOpen: boolean; appointment: Appointment | null }>({
    isOpen: false,
    appointment: null,
  });
  const [rescheduleForm, setRescheduleForm] = useState({ date: '', time: '' });
  const [rescheduleLoading, setRescheduleLoading] = useState(false);

  // Use either NextAuth user (Google) or custom auth user (OTP)
  const user = session?.user || customUser;
  const isAuthenticated = status === 'authenticated' || (token && customUser);

  useEffect(() => {
    if (status === 'loading') return;

    if (!isAuthenticated) {
      router.push('/book-appointment');
    } else {
      fetchAppointments();
      checkProfileCompletion();
    }
  }, [status, isAuthenticated, router]);

  const fetchAppointments = async () => {
    try {
      const response = await api.get('/appointments/my-appointments');
      // API returns { appointments: [...] }
      setAppointments(response.data.appointments || response.data || []);
    } catch (error) {
      console.error('Failed to fetch appointments', error);
    } finally {
      setLoading(false);
    }
  };

  const checkProfileCompletion = async () => {
    try {
      const response = await api.get('/profile');
      const profile: UserProfile = response.data;

      // Check if key profile fields are filled
      const hasPhone = !!profile.phone;
      const hasDOB = !!profile.dateOfBirth;
      const hasGender = !!profile.gender;
      const hasAddress = !!(profile.address?.city || profile.address?.street);
      const hasEmergencyContact = !!(profile.emergencyContact?.name && profile.emergencyContact?.phone);

      // Profile is complete if at least phone, DOB, and gender are filled
      setProfileComplete(hasPhone && hasDOB && hasGender);
    } catch (error) {
      console.error('Failed to check profile completion', error);
    }
  };

  const handleCancelAppointment = async (id: string) => {
    if (!window.confirm('Are you sure you would like to cancel this appointment? We understand plans change.')) {
      return;
    }

    try {
      await api.patch(`/appointments/${id}`, { status: 'cancelled' });
      fetchAppointments();
    } catch (error) {
      console.error('Failed to cancel appointment', error);
      toast.error('We encountered an issue canceling your appointment. Please contact us directly if you need to make changes.');
    }
  };

  const openRescheduleModal = (appointment: Appointment) => {
    setRescheduleModal({ isOpen: true, appointment });
    setRescheduleForm({ date: appointment.date, time: appointment.time });
  };

  const handleReschedule = async () => {
    if (!rescheduleModal.appointment) return;

    if (!rescheduleForm.date || !rescheduleForm.time) {
      toast.warning('Please select both a new date and time.');
      return;
    }

    setRescheduleLoading(true);
    try {
      await api.patch(`/appointments/${rescheduleModal.appointment.id}`, {
        date: rescheduleForm.date,
        time: rescheduleForm.time,
      });
      setRescheduleModal({ isOpen: false, appointment: null });
      fetchAppointments();
      toast.success('Your appointment has been rescheduled successfully. A confirmation email has been sent.');
    } catch (error: any) {
      console.error('Failed to reschedule appointment', error);
      toast.error(error.response?.data?.message || 'We encountered an issue rescheduling your appointment. Please try again or contact us.');
    } finally {
      setRescheduleLoading(false);
    }
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-olive-green bg-opacity-10 text-olive-green border border-olive-green';
      case 'pending':
        return 'bg-soft-gold bg-opacity-10 text-soft-gold border border-soft-gold';
      case 'cancelled':
        return 'bg-soft-beige text-gray-600 border border-soft-beige';
      case 'completed':
        return 'bg-muted-teal bg-opacity-10 text-muted-teal border border-muted-teal';
      default:
        return 'bg-light-grey text-gray-600 border border-light-grey';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'pending':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'cancelled':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'completed':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-off-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-warm-cream via-off-white to-warm-sand py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="heading-xl mb-3">Welcome back, {(user as any)?.firstName || (user as any)?.name?.split(' ')[0] || 'there'}!</h1>
          <p className="text-gray-600 text-lg">Here's an overview of your appointments and sessions.</p>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="section-container">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-soft-gold bg-opacity-10 rounded-full mx-auto mb-4">
                <svg className="w-6 h-6 text-soft-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">Total Appointments</h3>
              <p className="text-4xl font-heading font-bold text-gray-900">{appointments.length}</p>
            </Card>

            <Card className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-soft-gold bg-opacity-10 rounded-full mx-auto mb-4">
                <svg className="w-6 h-6 text-soft-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">Pending Confirmation</h3>
              <p className="text-4xl font-heading font-bold text-gray-900">
                {appointments.filter(a => a.status === 'pending').length}
              </p>
            </Card>

            <Card className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-olive-green bg-opacity-10 rounded-full mx-auto mb-4">
                <svg className="w-6 h-6 text-olive-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">Confirmed Sessions</h3>
              <p className="text-4xl font-heading font-bold text-gray-900">
                {appointments.filter(a => a.status === 'confirmed').length}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Profile Completion Prompt */}
      {!profileComplete && (
        <section className="section-container pt-0">
          <div className="max-w-7xl mx-auto">
            <Card className="bg-gradient-to-r from-soft-gold/10 to-warm-cream border-soft-gold/30">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-soft-gold/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-soft-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-semibold text-lg text-gray-900 mb-1">Complete Your Profile</h3>
                  <p className="text-gray-600 text-sm">
                    Add your phone number, date of birth, gender, address, and emergency contact to help us serve you better. This information will be reused for all your appointment bookings.
                  </p>
                </div>
                <Link href="/account?tab=profile">
                  <Button variant="primary" className="whitespace-nowrap">
                    Set Up Profile
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Appointments List */}
      <section className="section-container bg-off-white">
        <div className="max-w-7xl mx-auto">
          <Card>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h2 className="heading-md">Your Appointments</h2>
                <p className="text-gray-600 text-sm mt-1">View and manage your upcoming and past sessions</p>
              </div>
              <Link href="/book-appointment">
                <Button variant="primary">Schedule New Session</Button>
              </Link>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-soft-gold mb-4"></div>
                <p className="text-gray-600">Loading your appointments...</p>
              </div>
            ) : appointments.length === 0 ? (
              <div className="text-center py-12 bg-warm-cream rounded-lg">
                <svg className="w-16 h-16 text-soft-gold mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="font-heading font-semibold text-lg text-gray-900 mb-2">No Appointments Yet</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  You haven't scheduled any sessions yet. When you're ready, we're here to support you.
                </p>
                <Link href="/book-appointment">
                  <Button variant="primary">Schedule Your First Session</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-light-grey">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Service
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date & Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-light-grey">
                      {appointments.map((appointment) => (
                        <tr key={appointment.id} className="hover:bg-warm-cream transition-colors duration-150">
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">
                              {appointment.service}
                            </div>
                            {appointment.notes && (
                              <div className="text-sm text-gray-500 mt-1 max-w-xs truncate" title={appointment.notes}>
                                {appointment.notes}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{appointment.date}</div>
                            <div className="text-sm text-gray-500">{appointment.time}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-3 py-1 inline-flex items-center gap-2 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                              {getStatusIcon(appointment.status)}
                              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {appointment.status !== 'cancelled' && appointment.status !== 'completed' && (
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => openRescheduleModal(appointment)}
                                  className="text-gilt-gold hover:text-gilt-orange font-medium transition-colors duration-150"
                                >
                                  Reschedule
                                </button>
                                <button
                                  onClick={() => handleCancelAppointment(appointment.id)}
                                  className="text-muted-coral hover:text-soft-terracotta font-medium transition-colors duration-150"
                                >
                                  Cancel
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-4">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="bg-warm-cream rounded-lg p-4 border border-light-grey">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-medium text-gray-900 flex-1">{appointment.service}</h3>
                        <span className={`px-2 py-1 inline-flex items-center gap-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                          {getStatusIcon(appointment.status)}
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </span>
                      </div>

                      <div className="space-y-2 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{appointment.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{appointment.time}</span>
                        </div>
                        {appointment.notes && (
                          <div className="text-xs text-gray-500 mt-2 italic">
                            Note: {appointment.notes}
                          </div>
                        )}
                      </div>

                      {appointment.status !== 'cancelled' && appointment.status !== 'completed' && (
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => openRescheduleModal(appointment)}
                            className="text-gilt-gold hover:text-gilt-orange font-medium text-sm transition-colors duration-150"
                          >
                            Reschedule
                          </button>
                          <button
                            onClick={() => handleCancelAppointment(appointment.id)}
                            className="text-muted-coral hover:text-soft-terracotta font-medium text-sm transition-colors duration-150"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>
      </section>

      {/* Help Section */}
      <section className="section-container bg-warm-cream">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="heading-sm mb-4">Need Help?</h3>
          <p className="body-md text-gray-700 mb-6">
            If you have questions about your upcoming sessions, we're here to help.
          </p>
          <Link href="/contact">
            <Button variant="secondary">Contact Us</Button>
          </Link>
        </div>
      </section>

      {/* Reschedule Modal */}
      {rescheduleModal.isOpen && rescheduleModal.appointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
            <h3 className="text-xl font-heading font-semibold mb-2">Reschedule Appointment</h3>
            <p className="text-sm text-gray-600 mb-6">
              {rescheduleModal.appointment.service}<br />
              <span className="text-gray-500">Currently: {rescheduleModal.appointment.date} at {rescheduleModal.appointment.time}</span>
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Date</label>
                <input
                  type="date"
                  value={rescheduleForm.date}
                  onChange={(e) => setRescheduleForm({ ...rescheduleForm, date: e.target.value })}
                  min={getMinDate()}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gilt-gold focus:border-gilt-gold"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Time</label>
                <input
                  type="time"
                  value={rescheduleForm.time}
                  onChange={(e) => setRescheduleForm({ ...rescheduleForm, time: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gilt-gold focus:border-gilt-gold"
                />
              </div>
            </div>

            <div className="flex gap-4 justify-end">
              <button
                onClick={() => setRescheduleModal({ isOpen: false, appointment: null })}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
                disabled={rescheduleLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleReschedule}
                disabled={rescheduleLoading}
                className="px-6 py-2 bg-gilt-gold text-white rounded-lg hover:bg-gilt-orange transition-colors font-medium disabled:opacity-50"
              >
                {rescheduleLoading ? 'Rescheduling...' : 'Confirm Reschedule'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
