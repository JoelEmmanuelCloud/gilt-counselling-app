'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import axios from 'axios';

function ProfileContent() {
  const { data: session, status } = useSession();
  const { user: customUser, token } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Use either NextAuth user (Google) or custom auth user (OTP)
  const user = session?.user || customUser;
  const isAuthenticated = status === 'authenticated' || (token && customUser);

  useEffect(() => {
    if (status === 'loading') return;

    if (!isAuthenticated) {
      router.push('/book-appointment');
    }
  }, [status, isAuthenticated, router]);

  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: {
      street: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
    },
    emergencyContact: {
      name: '',
      relationship: '',
      phone: '',
      email: '',
    },
    preferredContactMethod: 'email',
    emailNotifications: true,
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = response.data;
      setProfile({
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        email: data.email || '',
        phone: data.phone || '',
        dateOfBirth: data.dateOfBirth ? data.dateOfBirth.split('T')[0] : '',
        gender: data.gender || '',
        address: {
          street: data.address?.street || '',
          city: data.address?.city || '',
          state: data.address?.state || '',
          country: data.address?.country || '',
          postalCode: data.address?.postalCode || '',
        },
        emergencyContact: {
          name: data.emergencyContact?.name || '',
          relationship: data.emergencyContact?.relationship || '',
          phone: data.emergencyContact?.phone || '',
          email: data.emergencyContact?.email || '',
        },
        preferredContactMethod: data.preferredContactMethod || 'email',
        emailNotifications: data.emailNotifications !== false,
      });
    } catch (error) {
      console.error('Failed to fetch profile', error);
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');

    try {
      const token = localStorage.getItem('token');
      await axios.patch('/api/profile', profile, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gilt-gold mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-off-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-warm-cream via-off-white to-warm-sand py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="heading-xl mb-3">My Profile</h1>
          <p className="text-gray-600 text-lg">Manage your personal information and preferences</p>
        </div>
      </section>

      {/* Messages */}
      {message && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            {message}
          </div>
        </div>
      )}

      {error && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      )}

      {/* Profile Form */}
      <section className="section-container">
        <div className="max-w-4xl mx-auto">
          <Card>
            <h2 className="heading-md mb-6">Personal Information</h2>
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    value={profile.firstName}
                    onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gilt-gold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    value={profile.lastName}
                    onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gilt-gold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    disabled
                    className="w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gilt-gold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                  <input
                    type="date"
                    value={profile.dateOfBirth}
                    onChange={(e) => setProfile({ ...profile, dateOfBirth: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gilt-gold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <select
                    value={profile.gender}
                    onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gilt-gold"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Contact Method</label>
                  <select
                    value={profile.preferredContactMethod}
                    onChange={(e) => setProfile({ ...profile, preferredContactMethod: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gilt-gold"
                  >
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                    <option value="whatsapp">WhatsApp</option>
                  </select>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                    <input
                      type="text"
                      value={profile.address.street}
                      onChange={(e) => setProfile({ ...profile, address: { ...profile.address, street: e.target.value } })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gilt-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      value={profile.address.city}
                      onChange={(e) => setProfile({ ...profile, address: { ...profile.address, city: e.target.value } })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gilt-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State/Province</label>
                    <input
                      type="text"
                      value={profile.address.state}
                      onChange={(e) => setProfile({ ...profile, address: { ...profile.address, state: e.target.value } })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gilt-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                    <select
                      value={profile.address.country}
                      onChange={(e) => setProfile({ ...profile, address: { ...profile.address, country: e.target.value } })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gilt-gold"
                    >
                      <option value="">Select Country</option>
                      <option value="Nigeria">Nigeria</option>
                      <option value="Canada">Canada</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                    <input
                      type="text"
                      value={profile.address.postalCode}
                      onChange={(e) => setProfile({ ...profile, address: { ...profile.address, postalCode: e.target.value } })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gilt-gold"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Emergency Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      value={profile.emergencyContact.name}
                      onChange={(e) => setProfile({ ...profile, emergencyContact: { ...profile.emergencyContact, name: e.target.value } })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gilt-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
                    <input
                      type="text"
                      value={profile.emergencyContact.relationship}
                      onChange={(e) => setProfile({ ...profile, emergencyContact: { ...profile.emergencyContact, relationship: e.target.value } })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gilt-gold"
                      placeholder="e.g. Spouse, Parent, Sibling"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={profile.emergencyContact.phone}
                      onChange={(e) => setProfile({ ...profile, emergencyContact: { ...profile.emergencyContact, phone: e.target.value } })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gilt-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={profile.emergencyContact.email}
                      onChange={(e) => setProfile({ ...profile, emergencyContact: { ...profile.emergencyContact, email: e.target.value } })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gilt-gold"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="emailNotifications"
                    checked={profile.emailNotifications}
                    onChange={(e) => setProfile({ ...profile, emailNotifications: e.target.checked })}
                    className="mr-2"
                  />
                  <label htmlFor="emailNotifications" className="text-sm text-gray-700">
                    Receive email notifications for appointments and updates
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full px-6 py-3 bg-gilt-gold text-white rounded-lg font-semibold hover:bg-gilt-orange transition disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </Card>

        </div>
      </section>
    </div>
  );
}

export default function ProfilePage() {
  return <ProfileContent />;
}
