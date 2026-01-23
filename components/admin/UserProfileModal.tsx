'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@/components/ui/Card';

interface UserProfileModalProps {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function UserProfileModal({ userId, isOpen, onClose }: UserProfileModalProps) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (isOpen && userId) {
      fetchUserProfile();
    }
  }, [isOpen, userId]);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/admin/users/${userId}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(response.data);
    } catch (error) {
      console.error('Failed to fetch user profile', error);
      alert('Failed to load user profile');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto print-modal-backdrop">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto my-8 print-modal-content">
        <div className="p-6">
          {/* Print Header - Only visible when printing */}
          <div className="print-header hidden print:block">
            <h1 className="text-2xl font-bold">Gilt Counselling Services</h1>
            <p className="text-sm text-gray-600">Client Profile Report</p>
            <p className="text-xs text-gray-500 mt-1">Generated on {new Date().toLocaleDateString()}</p>
          </div>

          {/* Header */}
          <div className="flex justify-between items-start mb-6 sticky top-0 bg-white pb-4 border-b border-gray-200 print:static print:border-0">
            <div className="flex items-center gap-4">
              <img
                src={data?.user?.profilePhoto || data?.user?.image || '/default-avatar.svg'}
                alt={data?.user?.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-gray-200"
              />
              <div>
                <h2 className="text-2xl font-heading font-bold text-gray-900">
                  {data?.user?.name}
                </h2>
                <p className="text-gray-600">{data?.user?.email}</p>
                <p className="text-gray-500 text-sm">{data?.user?.phone}</p>
                {data?.user?.occupation && (
                  <p className="text-gray-500 text-sm mt-1">
                    <span className="font-medium">Occupation:</span> {data.user.occupation}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 print:hidden">
              <button
                onClick={handlePrint}
                className="text-gray-600 hover:text-gray-800 transition p-2 rounded-lg hover:bg-gray-100"
                title="Print profile"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
              </button>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-soft-gold mb-4"></div>
              <p className="text-gray-600">Loading profile...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <Card className="text-center">
                  <h3 className="text-xs font-medium text-gray-500 uppercase mb-1">Total</h3>
                  <p className="text-2xl font-bold text-gray-900">{data?.stats?.totalAppointments || 0}</p>
                </Card>
                <Card className="text-center">
                  <h3 className="text-xs font-medium text-gray-500 uppercase mb-1">Pending</h3>
                  <p className="text-2xl font-bold text-soft-gold">{data?.stats?.pending || 0}</p>
                </Card>
                <Card className="text-center">
                  <h3 className="text-xs font-medium text-gray-500 uppercase mb-1">Confirmed</h3>
                  <p className="text-2xl font-bold text-olive-green">{data?.stats?.confirmed || 0}</p>
                </Card>
                <Card className="text-center">
                  <h3 className="text-xs font-medium text-gray-500 uppercase mb-1">Completed</h3>
                  <p className="text-2xl font-bold text-muted-teal">{data?.stats?.completed || 0}</p>
                </Card>
                <Card className="text-center">
                  <h3 className="text-xs font-medium text-gray-500 uppercase mb-1">Cancelled</h3>
                  <p className="text-2xl font-bold text-gray-500">{data?.stats?.cancelled || 0}</p>
                </Card>
              </div>

              {/* Profile Information */}
              <Card>
                <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Date of Birth</p>
                    <p className="font-medium">
                      {data?.user?.dateOfBirth
                        ? new Date(data.user.dateOfBirth).toLocaleDateString()
                        : 'Not specified'}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Gender</p>
                    <p className="font-medium capitalize">{data?.user?.gender || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Source</p>
                    <p className="font-medium capitalize">{data?.user?.source || 'online'}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Member Since</p>
                    <p className="font-medium">
                      {data?.user?.createdAt
                        ? new Date(data.user.createdAt).toLocaleDateString()
                        : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Preferred Contact</p>
                    <p className="font-medium capitalize">{data?.user?.preferredContactMethod || 'email'}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Email Notifications</p>
                    <p className="font-medium">{data?.user?.emailNotifications ? 'Enabled' : 'Disabled'}</p>
                  </div>
                </div>

                {/* Address */}
                {data?.user?.address && (data.user.address.street || data.user.address.city) && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-gray-500 mb-2">Address</p>
                    <p className="font-medium">
                      {[
                        data.user.address.street,
                        data.user.address.city,
                        data.user.address.state,
                        data.user.address.country,
                        data.user.address.postalCode,
                      ].filter(Boolean).join(', ') || 'Not specified'}
                    </p>
                  </div>
                )}

                {/* Emergency Contact */}
                {data?.user?.emergencyContact?.name && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-gray-500 mb-2">Emergency Contact</p>
                    <p className="font-medium">{data.user.emergencyContact.name}</p>
                    <p className="text-sm text-gray-600">
                      {data.user.emergencyContact.relationship} - {data.user.emergencyContact.phone}
                      {data.user.emergencyContact.email && ` - ${data.user.emergencyContact.email}`}
                    </p>
                  </div>
                )}

                {/* Medical History */}
                {data?.user?.medicalHistory && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-gray-500 mb-2">Medical History</p>
                    <p className="text-sm text-gray-700">{data.user.medicalHistory}</p>
                  </div>
                )}
              </Card>

              {/* Appointments */}
              <Card>
                <h3 className="text-lg font-semibold mb-4">Appointment History</h3>
                {data?.appointments?.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No appointments yet</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date & Time</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {data?.appointments?.map((apt: any) => (
                          <tr key={apt._id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm">
                              {apt.service}
                              {apt.rescheduledFrom && (
                                <span className="ml-2 text-xs text-blue-600">(Rescheduled)</span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              <div>{apt.date}</div>
                              <div className="text-gray-500">{apt.time}</div>
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`px-2 py-1 text-xs rounded-full ${
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
                            <td className="px-4 py-3 text-sm text-gray-600">{apt.notes || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </Card>

              {/* Session Notes (Admin Only) */}
              {data?.user?.sessionNotes?.length > 0 && (
                <Card>
                  <h3 className="text-lg font-semibold mb-4">Session Notes</h3>
                  <div className="space-y-3">
                    {data.user.sessionNotes.map((note: any, index: number) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs text-gray-500">
                            {new Date(note.date).toLocaleDateString()} by {note.createdBy}
                          </span>
                        </div>
                        <p className="text-sm text-gray-800">{note.note}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
