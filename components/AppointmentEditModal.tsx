'use client';

import React, { useState } from 'react';
import axios from 'axios';

interface Appointment {
  _id: string;
  service: string;
  date: string;
  time: string;
  status: string;
  notes?: string;
  rescheduledFrom?: {
    date: string;
    time: string;
    rescheduledAt: string;
  };
}

interface AppointmentEditModalProps {
  appointment: Appointment;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

export default function AppointmentEditModal({
  appointment,
  isOpen,
  onClose,
  onUpdate,
}: AppointmentEditModalProps) {
  const [formData, setFormData] = useState({
    service: appointment.service,
    date: appointment.date,
    time: appointment.time,
    notes: appointment.notes || '',
  });
  const [saving, setSaving] = useState(false);

  const services = [
    'Mental Health & Emotional Wellness',
    'Educational Consulting',
    'School Counselling Consult',
    'Academic and Career Counselling',
    'Youth Counselling, Life Skills & Mentoring',
    'Parenting & Special Needs Support',
    'Organizational Staff Training',
    'Group Therapy, Outreach & Advocacy',
    'Online Counselling',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = localStorage.getItem('token');
      await axios.patch(`/api/appointments/${appointment._id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('Appointment updated successfully!');
      onUpdate();
      onClose();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to update appointment');
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-heading font-bold text-gray-900">Edit Appointment</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {appointment.status !== 'pending' && (
            <div className="mb-4 p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> This appointment has been {appointment.status}. Contact us to reschedule confirmed appointments.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Service</label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gilt-gold focus:border-transparent"
                required
                disabled={appointment.status !== 'pending'}
              >
                {services.map((service) => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gilt-gold focus:border-transparent"
                  required
                  disabled={appointment.status !== 'pending'}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gilt-gold focus:border-transparent"
                  required
                  disabled={appointment.status !== 'pending'}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gilt-gold focus:border-transparent"
                placeholder="Any additional information..."
                disabled={appointment.status !== 'pending'}
              />
            </div>

            {appointment.rescheduledFrom && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Previously scheduled:</strong> {appointment.rescheduledFrom.date} at {appointment.rescheduledFrom.time}
                </p>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={saving || appointment.status !== 'pending'}
                className="flex-1 px-6 py-3 bg-gilt-gold text-white rounded-lg font-semibold hover:bg-gilt-orange transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
