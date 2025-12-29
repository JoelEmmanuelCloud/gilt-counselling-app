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

function DashboardContent() {
  const { data: session, status } = useSession();
  const { user: customUser, token } = useAuth();
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  // Use either NextAuth user (Google) or custom auth user (OTP)
  const user = session?.user || customUser;
  const isAuthenticated = status === 'authenticated' || (token && customUser);

  useEffect(() => {
    if (status === 'loading') return;

    if (!isAuthenticated) {
      router.push('/book-appointment');
    } else {
      fetchAppointments();
    }
  }, [status, isAuthenticated, router]);

  const fetchAppointments = async () => {
    try {
      const response = await api.get('/appointments/my-appointments');
      setAppointments(response.data);
    } catch (error) {
      console.error('Failed to fetch appointments', error);
    } finally {
      setLoading(false);
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
      alert('We encountered an issue canceling your appointment. Please contact us directly if you need to make changes.');
    }
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
          <h1 className="heading-xl mb-3">Welcome back, {user?.name}!</h1>
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
                              <button
                                onClick={() => handleCancelAppointment(appointment.id)}
                                className="text-muted-coral hover:text-soft-terracotta font-medium transition-colors duration-150"
                              >
                                Cancel
                              </button>
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
                        <button
                          onClick={() => handleCancelAppointment(appointment.id)}
                          className="text-muted-coral hover:text-soft-terracotta font-medium text-sm transition-colors duration-150"
                        >
                          Cancel Appointment
                        </button>
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
          <h3 className="heading-sm mb-4">Need to Make Changes?</h3>
          <p className="body-md text-gray-700 mb-6">
            If you need to reschedule or have questions about your upcoming sessions, we're here to help.
          </p>
          <Link href="/contact">
            <Button variant="secondary">Contact Us</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
