'use client';

import React from 'react';
import Link from 'next/link';
import Card from '@/components/ui/Card';

interface OverviewTabProps {
  stats: {
    total: number;
    pending: number;
    confirmed: number;
    completed: number;
  };
  upcomingAppointments: Array<{
    _id: string;
    service: string;
    date: string;
    time: string;
    status: string;
  }>;
}

export default function OverviewTab({ stats, upcomingAppointments }: OverviewTabProps) {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center p-6">
          <h3 className="text-xs font-medium text-gray-500 uppercase mb-2">Total Appointments</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
        </Card>
        <Card className="text-center p-6">
          <h3 className="text-xs font-medium text-gray-500 uppercase mb-2">Pending</h3>
          <p className="text-3xl font-bold text-soft-gold">{stats.pending}</p>
        </Card>
        <Card className="text-center p-6">
          <h3 className="text-xs font-medium text-gray-500 uppercase mb-2">Confirmed</h3>
          <p className="text-3xl font-bold text-olive-green">{stats.confirmed}</p>
        </Card>
        <Card className="text-center p-6">
          <h3 className="text-xs font-medium text-gray-500 uppercase mb-2">Completed</h3>
          <p className="text-3xl font-bold text-muted-teal">{stats.completed}</p>
        </Card>
      </div>

      {/* Upcoming Appointments */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-heading font-semibold">Upcoming Appointments</h2>
          <Link
            href="/book-appointment"
            className="text-sm text-gilt-gold hover:text-gilt-orange font-medium"
          >
            Book New
          </Link>
        </div>

        {upcomingAppointments.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No upcoming appointments</p>
            <Link
              href="/book-appointment"
              className="inline-block px-6 py-3 bg-gilt-gold text-white rounded-lg font-semibold hover:bg-gilt-orange transition"
            >
              Book Your First Appointment
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {upcomingAppointments.slice(0, 3).map((apt) => (
              <div
                key={apt._id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
              >
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{apt.service}</h3>
                  <p className="text-sm text-gray-600">{apt.date} at {apt.time}</p>
                </div>
                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium ${
                    apt.status === 'confirmed'
                      ? 'bg-olive-green bg-opacity-10 text-olive-green'
                      : apt.status === 'pending'
                      ? 'bg-soft-gold bg-opacity-10 text-soft-gold'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {apt.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Quick Actions */}
      <Card>
        <h2 className="text-xl font-heading font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/book-appointment"
            className="flex items-center gap-3 p-4 bg-gradient-to-r from-gilt-gold to-gilt-orange text-white rounded-lg hover:shadow-lg transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <div>
              <h3 className="font-semibold">Book Appointment</h3>
              <p className="text-xs text-white text-opacity-90">Schedule a new session</p>
            </div>
          </Link>
          <Link
            href="/contact"
            className="flex items-center gap-3 p-4 bg-gradient-to-r from-olive-green to-muted-teal text-white rounded-lg hover:shadow-lg transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <div>
              <h3 className="font-semibold">Contact Us</h3>
              <p className="text-xs text-white text-opacity-90">Get in touch with our team</p>
            </div>
          </Link>
        </div>
      </Card>
    </div>
  );
}
