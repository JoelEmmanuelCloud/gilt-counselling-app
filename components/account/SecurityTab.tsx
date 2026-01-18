'use client';

import React, { useState } from 'react';
import axios from 'axios';

interface SecurityTabProps {
  emailNotifications: boolean;
  onUpdate: () => void;
}

export default function SecurityTab({ emailNotifications, onUpdate }: SecurityTabProps) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(emailNotifications);
  const [savingNotifications, setSavingNotifications] = useState(false);

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
            <span className="text-sm text-gray-900">Passwordless</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-sm font-medium text-gray-700">Authentication Method</span>
            <span className="text-sm text-gray-900">OTP / Google Sign-In</span>
          </div>
        </div>
      </div>

      {/* Security Info */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h2 className="text-xl font-heading font-semibold mb-2">Secure Authentication</h2>
        <p className="text-gray-700">
          Your account uses passwordless authentication. Each time you sign in, you'll receive a secure
          verification code via email. This provides enhanced security without the need to remember passwords.
        </p>
      </div>
    </div>
  );
}
