'use client';

import React, { useState } from 'react';
import axios from 'axios';

interface SecurityTabProps {
  hasPassword: boolean;
  emailNotifications: boolean;
  onUpdate: () => void;
}

export default function SecurityTab({ hasPassword, emailNotifications, onUpdate }: SecurityTabProps) {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [savingPassword, setSavingPassword] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(emailNotifications);
  const [savingNotifications, setSavingNotifications] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }

    setSavingPassword(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/profile/change-password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('Password changed successfully!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to change password');
    } finally {
      setSavingPassword(false);
    }
  };

  const handleNotificationsChange = async () => {
    setSavingNotifications(true);
    try {
      const token = localStorage.getItem('token');
      await axios.patch('/api/profile', {
        emailNotifications: !notificationsEnabled,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNotificationsEnabled(!notificationsEnabled);
      alert('Notification preferences updated successfully!');
      onUpdate();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to update preferences');
    } finally {
      setSavingNotifications(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Change Password */}
      {hasPassword && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-heading font-semibold mb-4">Change Password</h2>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Password
              </label>
              <input
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gilt-gold focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gilt-gold focus:border-transparent"
                required
                minLength={8}
              />
              <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gilt-gold focus:border-transparent"
                required
                minLength={8}
              />
            </div>

            <button
              type="submit"
              disabled={savingPassword}
              className="px-6 py-3 bg-gilt-gold text-white rounded-lg font-semibold hover:bg-gilt-orange transition disabled:opacity-50"
            >
              {savingPassword ? 'Changing Password...' : 'Change Password'}
            </button>
          </form>
        </div>
      )}

      {!hasPassword && (
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-xl font-heading font-semibold mb-2">Password Not Set</h2>
          <p className="text-gray-700">
            You signed in with Google or OTP authentication. Password changes are not available for your account.
          </p>
        </div>
      )}

      {/* Email Notifications */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-heading font-semibold mb-4">Notifications</h2>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">Email Notifications</h3>
            <p className="text-sm text-gray-600">
              Receive appointment confirmations, reminders, and updates via email
            </p>
          </div>
          <button
            onClick={handleNotificationsChange}
            disabled={savingNotifications}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              notificationsEnabled ? 'bg-gilt-gold' : 'bg-gray-300'
            } ${savingNotifications ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Account Info */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-heading font-semibold mb-4">Account Information</h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-sm font-medium text-gray-700">Account Type</span>
            <span className="text-sm text-gray-900">
              {hasPassword ? 'Email & Password' : 'OAuth / OTP'}
            </span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-sm font-medium text-gray-700">Authentication Method</span>
            <span className="text-sm text-gray-900">
              {hasPassword ? 'Password-based' : 'Passwordless (Google / OTP)'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
