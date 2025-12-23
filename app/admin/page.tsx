'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import api from '@/lib/api';
import { Appointment } from '@/lib/types';
import ProtectedRoute from '@/components/ProtectedRoute';
import Card from '@/components/ui/Card';

function AdminDashboardContent() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await api.get('/appointments');
      setAppointments(response.data);
    } catch (error) {
      console.error('Failed to fetch appointments', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await api.patch(`/appointments/${id}`, { status });
      fetchAppointments();
    } catch (error) {
      console.error('Failed to update appointment', error);
      alert('Unable to update appointment status. Please try again.');
    }
  };

  const handleDeleteAppointment = async (id: string) => {
    if (!window.confirm('Are you sure you want to permanently delete this appointment record?')) {
      return;
    }

    try {
      await api.delete(`/appointments/${id}`);
      fetchAppointments();
    } catch (error) {
      console.error('Failed to delete appointment', error);
      alert('Unable to delete appointment. Please try again.');
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

  const filteredAppointments = appointments.filter(apt =>
    filter === 'all' ? true : apt.status === filter
  );

  const stats = {
    total: appointments.length,
    pending: appointments.filter(a => a.status === 'pending').length,
    confirmed: appointments.filter(a => a.status === 'confirmed').length,
    completed: appointments.filter(a => a.status === 'completed').length,
    cancelled: appointments.filter(a => a.status === 'cancelled').length,
  };

  return (
    <div className="min-h-screen bg-off-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-warm-cream via-off-white to-warm-sand py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="heading-xl mb-3">Admin Dashboard</h1>
          <p className="text-gray-600 text-lg">Manage client appointments and bookings</p>
        </div>
      </section>

      {/* Statistics Cards */}
      <section className="section-container">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
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
            <Card className="text-center">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Cancelled</h3>
              <p className="text-3xl font-heading font-bold text-gray-500">{stats.cancelled}</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Appointments Table */}
      <section className="section-container bg-off-white">
        <div className="max-w-7xl mx-auto">
          <Card>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
              <div>
                <h2 className="heading-md">All Appointments</h2>
                <p className="text-gray-600 text-sm mt-1">
                  {filteredAppointments.length} {filter === 'all' ? '' : filter} appointment{filteredAppointments.length !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    filter === 'all'
                      ? 'bg-soft-gold text-white'
                      : 'bg-light-grey text-gray-700 hover:bg-soft-beige'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('pending')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    filter === 'pending'
                      ? 'bg-soft-gold text-white'
                      : 'bg-light-grey text-gray-700 hover:bg-soft-beige'
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => setFilter('confirmed')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    filter === 'confirmed'
                      ? 'bg-olive-green text-white'
                      : 'bg-light-grey text-gray-700 hover:bg-soft-beige'
                  }`}
                >
                  Confirmed
                </button>
                <button
                  onClick={() => setFilter('completed')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    filter === 'completed'
                      ? 'bg-muted-teal text-white'
                      : 'bg-light-grey text-gray-700 hover:bg-soft-beige'
                  }`}
                >
                  Completed
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
                <svg className="w-16 h-16 text-soft-gold mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-600">No {filter !== 'all' ? filter : ''} appointments found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-light-grey">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Client Information
                      </th>
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
                    {filteredAppointments.map((appointment) => (
                      <tr key={appointment.id} className="hover:bg-warm-cream transition-colors duration-150">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {appointment.userName}
                          </div>
                          <div className="text-sm text-gray-500">{appointment.userEmail}</div>
                          <div className="text-sm text-gray-500">{appointment.userPhone}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 font-medium">{appointment.service}</div>
                          {appointment.notes && (
                            <div className="text-sm text-gray-500 mt-1 max-w-xs">
                              <span className="font-medium">Note:</span> {appointment.notes}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{appointment.date}</div>
                          <div className="text-sm text-gray-500">{appointment.time}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={appointment.status}
                            onChange={(e) => handleStatusChange(appointment.id, e.target.value)}
                            className={`px-3 py-1 text-xs font-medium rounded-full cursor-pointer transition-colors duration-200 ${getStatusColor(appointment.status)}`}
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => handleDeleteAppointment(appointment.id)}
                            className="text-muted-coral hover:text-soft-terracotta font-medium transition-colors duration-150"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>
      </section>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <ProtectedRoute adminOnly>
      <AdminDashboardContent />
    </ProtectedRoute>
  );
}
