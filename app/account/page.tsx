'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSession } from 'next-auth/react';
import { useAuth } from '@/lib/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import OverviewTab from '@/components/account/OverviewTab';
import AppointmentsTab from '@/components/account/AppointmentsTab';
import ProfileTab from '@/components/account/ProfileTab';
import SecurityTab from '@/components/account/SecurityTab';

type AccountTab = 'overview' | 'appointments' | 'profile' | 'security';

function MyAccountContent() {
  const { data: session, status } = useSession();
  const { user: customUser, token } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activeTab, setActiveTab] = useState<AccountTab>('overview');
  const [userData, setUserData] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated
  const isAuthenticated = status === 'authenticated' || (token && customUser);
  const user = session?.user || customUser;

  useEffect(() => {
    if (status === 'loading') return;

    if (!isAuthenticated) {
      router.push('/book-appointment');
      return;
    }

    // Set tab from URL param if provided
    const tab = searchParams.get('tab') as AccountTab;
    if (tab && ['overview', 'appointments', 'profile', 'security'].includes(tab)) {
      setActiveTab(tab);
    }

    fetchData();
  }, [status, isAuthenticated, router, searchParams]);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch user profile
      const profileRes = await axios.get('/api/profile', {
        headers: {
          Authorization: `Bearer ${token || ''}`,
        },
      });

      setUserData(profileRes.data.user);

      // Fetch appointments
      const appointmentsRes = await axios.get('/api/appointments/my-appointments', {
        headers: {
          Authorization: `Bearer ${token || ''}`,
        },
      });

      setAppointments(appointmentsRes.data.appointments || []);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gilt-gold mb-4"></div>
          <p className="text-gray-600">Loading your account...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !userData) {
    return null;
  }

  // Calculate stats
  const stats = {
    total: appointments.length,
    pending: appointments.filter(a => a.status === 'pending').length,
    confirmed: appointments.filter(a => a.status === 'confirmed').length,
    completed: appointments.filter(a => a.status === 'completed').length,
  };

  // Get upcoming appointments (not cancelled or completed, sorted by date)
  const upcomingAppointments = appointments
    .filter(a => a.status !== 'cancelled' && a.status !== 'completed')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-off-white">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-warm-cream via-off-white to-warm-sand py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Profile Photo */}
            <div className="relative">
              <img
                src={userData?.profilePhoto || userData?.image || '/default-avatar.svg'}
                alt={`${userData?.firstName} ${userData?.lastName}`}
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
              />
            </div>
            {/* User Info */}
            <div className="text-center sm:text-left">
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-2">
                My Account
              </h1>
              <p className="text-gray-700 text-lg font-medium">{userData?.firstName} {userData?.lastName}</p>
              <p className="text-gray-600 text-sm">{userData?.email}</p>
              {userData?.occupation && (
                <p className="text-gray-500 text-sm mt-1">{userData.occupation}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Tabs and Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 pb-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 rounded-t-lg font-medium transition ${
              activeTab === 'overview'
                ? 'bg-gilt-gold text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('appointments')}
            className={`px-6 py-3 rounded-t-lg font-medium transition ${
              activeTab === 'appointments'
                ? 'bg-gilt-gold text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Appointments
            {stats.pending > 0 && (
              <span className="ml-2 px-2 py-1 text-xs bg-soft-gold text-white rounded-full">
                {stats.pending}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-3 rounded-t-lg font-medium transition ${
              activeTab === 'profile'
                ? 'bg-gilt-gold text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-6 py-3 rounded-t-lg font-medium transition ${
              activeTab === 'security'
                ? 'bg-gilt-gold text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Security
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'overview' && (
            <OverviewTab
              stats={stats}
              upcomingAppointments={upcomingAppointments}
            />
          )}
          {activeTab === 'appointments' && (
            <AppointmentsTab
              appointments={appointments}
              onRefresh={fetchData}
            />
          )}
          {activeTab === 'profile' && (
            <ProfileTab
              user={userData}
              onUpdate={fetchData}
            />
          )}
          {activeTab === 'security' && (
            <SecurityTab
              emailNotifications={userData?.emailNotifications ?? true}
              onUpdate={fetchData}
            />
          )}
        </div>
      </section>
    </div>
  );
}

export default function MyAccountPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-warm-cream flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-soft-terracotta mb-4"></div>
          <p className="text-gray-600">Loading your account...</p>
        </div>
      </div>
    }>
      <MyAccountContent />
    </Suspense>
  );
}
