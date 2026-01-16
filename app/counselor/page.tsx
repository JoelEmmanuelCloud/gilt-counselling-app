'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import axios from 'axios';

type Tab = 'appointments' | 'availability' | 'profile';

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

  useEffect(() => {
    if (status === 'loading') return;

    if (!isAuthenticated) {
      router.push('/auth/signin');
    } else if (user?.role !== 'counselor') {
      if (user?.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    }
  }, [status, isAuthenticated, user, router]);

  useEffect(() => {
    if (activeTab === 'appointments') {
      fetchAppointments();
    } else if (activeTab === 'availability') {
      fetchAvailability();
    }
  }, [activeTab]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filter !== 'all') params.append('status', filter);
      if (dateFilter) params.append('date', dateFilter);

      const response = await axios.get(`/api/counselor/appointments?${params.toString()}`);
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
      const response = await axios.get('/api/counselor/availability');
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
      await axios.patch(`/api/counselor/appointments/${id}`, { status: newStatus });
      fetchAppointments();
    } catch (error) {
      console.error('Failed to update appointment', error);
      alert('Unable to update appointment status. Please try again.');
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedAppointment) return;

    try {
      await axios.patch(`/api/counselor/appointments/${selectedAppointment._id}`, {
        counselorNotes,
      });
      setSelectedAppointment(null);
      setCounselorNotes('');
      fetchAppointments();
      alert('Notes saved successfully');
    } catch (error) {
      console.error('Failed to save notes', error);
      alert('Unable to save notes. Please try again.');
    }
  };

  const handleUpdateAvailability = async () => {
    try {
      await axios.patch('/api/counselor/availability', {
        availability,
        isAvailable,
      });
      alert('Availability updated successfully');
    } catch (error) {
      console.error('Failed to update availability', error);
      alert('Unable to update availability. Please try again.');
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
          <h1 className="heading-xl mb-3">Counselor Dashboard</h1>
          <p className="text-gray-600 text-lg">
            Welcome back, {user?.name || 'Counselor'}. Manage your appointments and availability.
          </p>
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
                          <div className="text-sm font-medium text-gray-900">{appointment.userName}</div>
                          <div className="text-sm text-gray-500">{appointment.userEmail}</div>
                          <div className="text-sm text-gray-500">{appointment.userPhone}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 font-medium">{appointment.service}</div>
                          {appointment.notes && (
                            <div className="text-sm text-gray-500 mt-1">{appointment.notes}</div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{appointment.date}</div>
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
                            Add Notes
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
