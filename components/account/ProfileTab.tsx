'use client';

import React, { useState } from 'react';
import axios from 'axios';
import ProfilePhotoUpload from '@/components/ProfilePhotoUpload';

interface User {
  name: string;
  email: string;
  phone?: string;
  occupation?: string;
  dateOfBirth?: string;
  gender?: string;
  profilePhoto?: string;
  image?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
  };
  emergencyContact?: {
    name?: string;
    relationship?: string;
    phone?: string;
    email?: string;
  };
  preferredContactMethod?: string;
}

interface ProfileTabProps {
  user: User;
  onUpdate: () => void;
}

export default function ProfileTab({ user, onUpdate }: ProfileTabProps) {
  const [formData, setFormData] = useState({
    name: user.name || '',
    phone: user.phone || '',
    occupation: user.occupation || '',
    dateOfBirth: user.dateOfBirth ? user.dateOfBirth.split('T')[0] : '',
    gender: user.gender || '',
    address: {
      street: user.address?.street || '',
      city: user.address?.city || '',
      state: user.address?.state || '',
      country: user.address?.country || 'Nigeria',
      postalCode: user.address?.postalCode || '',
    },
    emergencyContact: {
      name: user.emergencyContact?.name || '',
      relationship: user.emergencyContact?.relationship || '',
      phone: user.emergencyContact?.phone || '',
      email: user.emergencyContact?.email || '',
    },
    preferredContactMethod: user.preferredContactMethod || 'email',
  });

  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = localStorage.getItem('token');
      await axios.patch('/api/profile', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('Profile updated successfully!');
      onUpdate();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Photo */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-heading font-semibold mb-4">Profile Photo</h2>
        <ProfilePhotoUpload
          currentPhoto={user.profilePhoto || user.image}
          onPhotoUpdate={onUpdate}
        />
      </div>

      {/* Personal Information Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-heading font-semibold mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gilt-gold focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={user.email}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                disabled
              />
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gilt-gold focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Occupation</label>
              <input
                type="text"
                value={formData.occupation}
                onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gilt-gold focus:border-transparent"
                placeholder="e.g., Teacher, Engineer, Student"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gilt-gold focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gilt-gold focus:border-transparent"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-heading font-semibold mb-4">Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
              <input
                type="text"
                value={formData.address.street}
                onChange={(e) => setFormData({
                  ...formData,
                  address: { ...formData.address, street: e.target.value },
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gilt-gold focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
              <input
                type="text"
                value={formData.address.city}
                onChange={(e) => setFormData({
                  ...formData,
                  address: { ...formData.address, city: e.target.value },
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gilt-gold focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">State/Province</label>
              <input
                type="text"
                value={formData.address.state}
                onChange={(e) => setFormData({
                  ...formData,
                  address: { ...formData.address, state: e.target.value },
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gilt-gold focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
              <select
                value={formData.address.country}
                onChange={(e) => setFormData({
                  ...formData,
                  address: { ...formData.address, country: e.target.value },
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gilt-gold focus:border-transparent"
              >
                <option value="Nigeria">Nigeria</option>
                <option value="Canada">Canada</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
              <input
                type="text"
                value={formData.address.postalCode}
                onChange={(e) => setFormData({
                  ...formData,
                  address: { ...formData.address, postalCode: e.target.value },
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gilt-gold focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-heading font-semibold mb-4">Emergency Contact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={formData.emergencyContact.name}
                onChange={(e) => setFormData({
                  ...formData,
                  emergencyContact: { ...formData.emergencyContact, name: e.target.value },
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gilt-gold focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
              <input
                type="text"
                value={formData.emergencyContact.relationship}
                onChange={(e) => setFormData({
                  ...formData,
                  emergencyContact: { ...formData.emergencyContact, relationship: e.target.value },
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gilt-gold focus:border-transparent"
                placeholder="e.g., Spouse, Parent, Sibling"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                value={formData.emergencyContact.phone}
                onChange={(e) => setFormData({
                  ...formData,
                  emergencyContact: { ...formData.emergencyContact, phone: e.target.value },
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gilt-gold focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={formData.emergencyContact.email}
                onChange={(e) => setFormData({
                  ...formData,
                  emergencyContact: { ...formData.emergencyContact, email: e.target.value },
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gilt-gold focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Contact Preferences */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-heading font-semibold mb-4">Contact Preferences</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Contact Method</label>
            <select
              value={formData.preferredContactMethod}
              onChange={(e) => setFormData({ ...formData, preferredContactMethod: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gilt-gold focus:border-transparent"
            >
              <option value="email">Email</option>
              <option value="phone">Phone</option>
              <option value="whatsapp">WhatsApp</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 bg-gilt-gold text-white rounded-lg font-semibold hover:bg-gilt-orange transition disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
