'use client';

import React, { useState } from 'react';
import AppointmentEditModal from '@/components/AppointmentEditModal';

interface Appointment {
  _id: string;
  service: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  rescheduledFrom?: {
    date: string;
    time: string;
    rescheduledAt: string;
  };
}

interface AppointmentsTabProps {
  appointments: Appointment[];
  onRefresh: () => void;
}

export default function AppointmentsTab({ appointments, onRefresh }: AppointmentsTabProps) {
  const [filter, setFilter] = useState<string>('all');
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);

  const filteredAppointments = appointments.filter((apt) => {
    if (filter === 'all') return true;
    return apt.status === filter;
  });

  return (
    <div className="space-y-6">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            filter === 'all'
              ? 'bg-gilt-gold text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All ({appointments.length})
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            filter === 'pending'
              ? 'bg-soft-gold text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Pending ({appointments.filter(a => a.status === 'pending').length})
        </button>
        <button
          onClick={() => setFilter('confirmed')}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            filter === 'confirmed'
              ? 'bg-olive-green text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Confirmed ({appointments.filter(a => a.status === 'confirmed').length})
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            filter === 'completed'
              ? 'bg-muted-teal text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Completed ({appointments.filter(a => a.status === 'completed').length})
        </button>
        <button
          onClick={() => setFilter('cancelled')}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            filter === 'cancelled'
              ? 'bg-gray-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Cancelled ({appointments.filter(a => a.status === 'cancelled').length})
        </button>
      </div>

      {/* Appointments List */}
      {filteredAppointments.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No {filter !== 'all' ? filter : ''} appointments found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Notes
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAppointments.map((apt) => (
                  <tr key={apt._id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-4 text-sm text-gray-900">
                      {apt.service}
                      {apt.rescheduledFrom && (
                        <span className="ml-2 text-xs text-blue-600">(Rescheduled)</span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <div className="text-gray-900">{apt.date}</div>
                      <div className="text-gray-500">{apt.time}</div>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`px-3 py-1 text-xs rounded-full font-medium ${
                          apt.status === 'confirmed'
                            ? 'bg-olive-green bg-opacity-10 text-olive-green'
                            : apt.status === 'pending'
                            ? 'bg-soft-gold bg-opacity-10 text-soft-gold'
                            : apt.status === 'completed'
                            ? 'bg-muted-teal bg-opacity-10 text-muted-teal'
                            : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        {apt.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {apt.notes || '-'}
                    </td>
                    <td className="px-4 py-4">
                      {apt.status === 'pending' && (
                        <button
                          onClick={() => setEditingAppointment(apt)}
                          className="text-sm text-gilt-gold hover:text-gilt-orange font-medium"
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-3">
            {filteredAppointments.map((apt) => (
              <div key={apt._id} className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-gray-900 flex-1">{apt.service}</h3>
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-medium ${
                      apt.status === 'confirmed'
                        ? 'bg-olive-green bg-opacity-10 text-olive-green'
                        : apt.status === 'pending'
                        ? 'bg-soft-gold bg-opacity-10 text-soft-gold'
                        : apt.status === 'completed'
                        ? 'bg-muted-teal bg-opacity-10 text-muted-teal'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {apt.status}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  <p>{apt.date} at {apt.time}</p>
                  {apt.notes && <p className="mt-1">Notes: {apt.notes}</p>}
                  {apt.rescheduledFrom && (
                    <p className="mt-1 text-blue-600">
                      Rescheduled from {apt.rescheduledFrom.date} at {apt.rescheduledFrom.time}
                    </p>
                  )}
                </div>
                {apt.status === 'pending' && (
                  <button
                    onClick={() => setEditingAppointment(apt)}
                    className="w-full px-4 py-2 bg-gilt-gold text-white rounded-lg font-semibold hover:bg-gilt-orange transition"
                  >
                    Edit Appointment
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingAppointment && (
        <AppointmentEditModal
          appointment={editingAppointment}
          isOpen={!!editingAppointment}
          onClose={() => setEditingAppointment(null)}
          onUpdate={() => {
            onRefresh();
            setEditingAppointment(null);
          }}
        />
      )}
    </div>
  );
}
