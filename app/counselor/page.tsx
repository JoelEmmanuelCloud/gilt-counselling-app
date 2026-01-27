'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import { useToast } from '@/components/ui/Toast';
import NotificationBell from '@/components/ui/NotificationBell';
import ProfilePhotoUpload from '@/components/ProfilePhotoUpload';
import api from '@/lib/api';

type Tab = 'appointments' | 'availability' | 'profile';

interface CounselorProfile {
  firstName?: string;
  lastName?: string;
  email?: string;
  profilePhoto?: string;
  image?: string;
}

interface Appointment {
  _id: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  service: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  counselorNotes?: string;
}

interface Availability {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function CounselorDashboardContent() {
  const { data: session, status } = useSession();
  const { user: customUser, token } = useAuth();
  const router = useRouter();
  const toast = useToast();

  const user = session?.user || customUser;
  const isAuthenticated = status === 'authenticated' || (token && customUser);

  const [activeTab, setActiveTab] = useState<Tab>('appointments');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('');
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [isAvailable, setIsAvailable] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [counselorNotes, setCounselorNotes] = useState('');
  const [profile, setProfile] = useState<CounselorProfile | null>(null);

  useEffect(() => {
    if (status === 'loading') return;

    if (!isAuthenticated) {
      router.push('/auth/signin');
    } else if (user?.role !== 'counselor') {
      router.push('/account');
    } else {
      fetchProfile();
    }
  }, [status, isAuthenticated, user, router]);

  useEffect(() => {
    if (activeTab === 'appointments') {
      fetchAppointments();
    } else if (activeTab === 'availability') {
      fetchAvailability();
    }
  }, [activeTab]);

  const fetchProfile = async () => {
    try {
      const response = await api.get('/profile');
      setProfile(response.data);
    } catch (error) {
      console.error('Failed to fetch profile', error);
    }
  };

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filter !== 'all') params.append('status', filter);
      if (dateFilter) params.append('date', dateFilter);

      const response = await api.get(`/counselor/appointments?${params.toString()}`);
      setAppointments(response.data);
    } catch (error) {
      console.error('Failed to fetch appointments', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailability = async () => {
    try {
      setLoading(true);
      const response = await api.get('/counselor/availability');
      setAvailability(response.data.availability || []);
      setIsAvailable(response.data.isAvailable ?? true);
    } catch (error) {
      console.error('Failed to fetch availability', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await api.patch(`/counselor/appointments/${id}`, { status: newStatus });
      fetchAppointments();
    } catch (error) {
      console.error('Failed to update appointment', error);
      toast.error('Unable to update appointment status. Please try again.');
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedAppointment) return;

    try {
      await api.patch(`/counselor/appointments/${selectedAppointment._id}`, {
        counselorNotes,
      });
      setSelectedAppointment(null);
      setCounselorNotes('');
      fetchAppointments();
      toast.success('Notes saved successfully');
    } catch (error) {
      console.error('Failed to save notes', error);
      toast.error('Unable to save notes. Please try again.');
    }
  };

  const handleUpdateAvailability = async () => {
    try {
      await api.patch('/counselor/availability', {
        availability,
        isAvailable,
      });
      toast.success('Availability updated successfully');
    } catch (error) {
      console.error('Failed to update availability', error);
      toast.error('Unable to update availability. Please try again.');
    }
  };

  const addAvailabilitySlot = () => {
    setAvailability([
      ...availability,
      { dayOfWeek: 1, startTime: '09:00', endTime: '17:00' },
    ]);
  };

  const removeAvailabilitySlot = (index: number) => {
    setAvailability(availability.filter((_, i) => i !== index));
  };

  const updateAvailabilitySlot = (index: number, field: string, value: any) => {
    const updated = [...availability];
    updated[index] = { ...updated[index], [field]: value };
    setAvailability(updated);
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

  const filteredAppointments = appointments.filter((apt) =>
    filter === 'all' ? true : apt.status === filter
  );

  const stats = {
    total: appointments.length,
    today: appointments.filter((a) => a.date === new Date().toISOString().split('T')[0]).length,
    pending: appointments.filter((a) => a.status === 'pending').length,
    confirmed: appointments.filter((a) => a.status === 'confirmed').length,
    completed: appointments.filter((a) => a.status === 'completed').length,
  };

  return (
    <div className="min-h-screen bg-off-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-warm-cream via-off-white to-warm-sand py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-6">
              <img
                src={profile?.profilePhoto || profile?.image || '/default-avatar.svg'}
                alt="Profile"
                className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover"
              />
              <div>
                <h1 className="heading-xl mb-3">Counselor Dashboard</h1>
                <p className="text-gray-600 text-lg">
                  Welcome back, {profile?.firstName || (user as any)?.firstName || (user as any)?.name || 'Counselor'}. Manage your appointments and availability.
                </p>
              </div>
            </div>
            <NotificationBell />
          </div>
        </div>
      </section>

      {/* Statistics Cards */}
      <section className="section-container">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Card className="text-center">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Today</h3>
              <p className="text-3xl font-heading font-bold text-gilt-gold">{stats.today}</p>
            </Card>
            <Card className="text-center">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Total</h3>
              <p className="text-3xl font-heading font-bold text-gray-900">{stats.total}</p>
            </Card>
            <Card className="text-center">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Pending</h3>
              <p className="text-3xl font-heading font-bold text-soft-gold">{stats.pending}</p>
            </Card>
            <Card className="text-center">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Confirmed</h3>
              <p className="text-3xl font-heading font-bold text-olive-green">{stats.confirmed}</p>
            </Card>
            <Card className="text-center">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Completed</h3>
              <p className="text-3xl font-heading font-bold text-muted-teal">{stats.completed}</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('appointments')}
            className={`px-6 py-3 font-medium transition-all ${
              activeTab === 'appointments'
                ? 'border-b-2 border-gilt-gold text-gilt-gold'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            My Appointments
          </button>
          <button
            onClick={() => setActiveTab('availability')}
            className={`px-6 py-3 font-medium transition-all ${
              activeTab === 'availability'
                ? 'border-b-2 border-gilt-gold text-gilt-gold'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Availability
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-3 font-medium transition-all ${
              activeTab === 'profile'
                ? 'border-b-2 border-gilt-gold text-gilt-gold'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Profile
          </button>
        </div>

        {/* Appointments Tab */}
        {activeTab === 'appointments' && (
          <Card>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
              <div>
                <h2 className="heading-md">My Appointments</h2>
                <p className="text-gray-600 text-sm mt-1">
                  {filteredAppointments.length} {filter === 'all' ? '' : filter} appointment
                  {filteredAppointments.length !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => {
                    setDateFilter(e.target.value);
                    setTimeout(fetchAppointments, 100);
                  }}
                  className="px-3 py-2 border rounded-lg text-sm"
                />
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === 'all'
                      ? 'bg-soft-gold text-white'
                      : 'bg-light-grey text-gray-700 hover:bg-soft-beige'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('pending')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === 'pending'
                      ? 'bg-soft-gold text-white'
                      : 'bg-light-grey text-gray-700 hover:bg-soft-beige'
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => setFilter('confirmed')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === 'confirmed'
                      ? 'bg-olive-green text-white'
                      : 'bg-light-grey text-gray-700 hover:bg-soft-beige'
                  }`}
                >
                  Confirmed
                </button>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-soft-gold mb-4"></div>
                <p className="text-gray-600">Loading appointments...</p>
              </div>
            ) : filteredAppointments.length === 0 ? (
              <div className="text-center py-12 bg-warm-cream rounded-lg">
                <p className="text-gray-600">No {filter !== 'all' ? filter : ''} appointments found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-light-grey">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Client
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Service
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Date & Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-light-grey">
                    {filteredAppointments.map((appointment) => (
                      <tr key={appointment._id} className="hover:bg-warm-cream transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-gilt-gold bg-opacity-10 flex items-center justify-center flex-shrink-0">
                              <span className="text-gilt-gold font-semibold text-sm">
                                {appointment.userName.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-gray-900">{appointment.userName}</div>
                              <div className="flex items-center gap-1 text-sm text-gray-500 mt-0.5">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <a href={`mailto:${appointment.userEmail}`} className="hover:text-gilt-gold">{appointment.userEmail}</a>
                              </div>
                              <div className="flex items-center gap-1 text-sm text-gray-500 mt-0.5">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <a href={`tel:${appointment.userPhone}`} className="hover:text-gilt-gold">{appointment.userPhone}</a>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 font-medium">{appointment.service}</div>
                          {appointment.notes && (
                            <div className="text-sm text-gray-500 mt-1 max-w-xs truncate" title={appointment.notes}>{appointment.notes}</div>
                          )}
                          {appointment.counselorNotes && (
                            <div className="text-xs text-muted-teal mt-1 flex items-center gap-1">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              Notes added
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 font-medium">{appointment.date}</div>
                          <div className="text-sm text-gray-500">{appointment.time}</div>
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={appointment.status}
                            onChange={(e) => handleStatusChange(appointment._id, e.target.value)}
                            className={`px-3 py-1 text-xs font-medium rounded-full cursor-pointer ${getStatusColor(
                              appointment.status
                            )}`}
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => {
                              setSelectedAppointment(appointment);
                              setCounselorNotes(appointment.counselorNotes || '');
                            }}
                            className="text-gilt-gold hover:text-gilt-orange font-medium text-sm"
                          >
                            {appointment.counselorNotes ? 'Edit Notes' : 'Add Notes'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        )}

        {/* Availability Tab */}
        {activeTab === 'availability' && (
          <Card>
            <div className="flex justify-between items-center mb-6">
              <h2 className="heading-md">Manage Availability</h2>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isAvailable}
                    onChange={(e) => setIsAvailable(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium">Available for appointments</span>
                </label>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              {availability.map((slot, index) => (
                <div key={index} className="flex flex-wrap items-center gap-4 p-4 bg-warm-cream rounded-lg">
                  <select
                    value={slot.dayOfWeek}
                    onChange={(e) => updateAvailabilitySlot(index, 'dayOfWeek', parseInt(e.target.value))}
                    className="px-3 py-2 border rounded-lg"
                  >
                    {DAYS_OF_WEEK.map((day, i) => (
                      <option key={i} value={i}>
                        {day}
                      </option>
                    ))}
                  </select>

                  <div className="flex items-center gap-2">
                    <input
                      type="time"
                      value={slot.startTime}
                      onChange={(e) => updateAvailabilitySlot(index, 'startTime', e.target.value)}
                      className="px-3 py-2 border rounded-lg"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="time"
                      value={slot.endTime}
                      onChange={(e) => updateAvailabilitySlot(index, 'endTime', e.target.value)}
                      className="px-3 py-2 border rounded-lg"
                    />
                  </div>

                  <button
                    onClick={() => removeAvailabilitySlot(index)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>
              ))}

              {availability.length === 0 && (
                <div className="text-center py-8 bg-warm-cream rounded-lg">
                  <p className="text-gray-600">No availability slots set. Add your working hours below.</p>
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <button
                onClick={addAvailabilitySlot}
                className="px-4 py-2 border border-gilt-gold text-gilt-gold rounded-lg hover:bg-gilt-gold hover:text-white transition"
              >
                + Add Time Slot
              </button>
              <button
                onClick={handleUpdateAvailability}
                className="px-6 py-2 bg-gilt-gold text-white rounded-lg hover:bg-gilt-orange transition"
              >
                Save Availability
              </button>
            </div>
          </Card>
        )}
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <Card>
            <h2 className="heading-md mb-6">Profile Photo</h2>
            <ProfilePhotoUpload
              currentPhoto={profile?.profilePhoto || profile?.image}
              onPhotoUpdate={(newUrl) => {
                setProfile((prev) => prev ? { ...prev, profilePhoto: newUrl } : prev);
              }}
            />
          </Card>
        )}
      </section>

      {/* Notes Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6">
            <h3 className="text-lg font-semibold mb-4">Session Notes</h3>
            <p className="text-sm text-gray-600 mb-4">
              Client: {selectedAppointment.userName} | {selectedAppointment.date} at {selectedAppointment.time}
            </p>
            <textarea
              value={counselorNotes}
              onChange={(e) => setCounselorNotes(e.target.value)}
              rows={6}
              className="w-full px-4 py-2 border rounded-lg mb-4"
              placeholder="Add private notes about this session..."
            />
            <div className="flex gap-4 justify-end">
              <button
                onClick={() => {
                  setSelectedAppointment(null);
                  setCounselorNotes('');
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNotes}
                className="px-6 py-2 bg-gilt-gold text-white rounded-lg hover:bg-gilt-orange transition"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CounselorDashboard() {
  return <CounselorDashboardContent />;
}
