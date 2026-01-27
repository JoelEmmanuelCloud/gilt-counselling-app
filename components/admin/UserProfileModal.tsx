'use client';

import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Card from '@/components/ui/Card';
import { useToast } from '@/components/ui/Toast';

interface UserProfileModalProps {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function UserProfileModal({ userId, isOpen, onClose }: UserProfileModalProps) {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const printRef = useRef<HTMLDivElement>(null);

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
      toast.error('Failed to load user profile');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const handlePrint = () => {
    if (loading || !data) return;

    // Create a new window for printing
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    if (!printWindow) {
      toast.error('Please allow pop-ups to print');
      return;
    }

    const user = data.user;
    const stats = data.stats;
    const appointments = data.appointments || [];

    // Build the print HTML
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Client Profile - ${user?.firstName} ${user?.lastName}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 20px; color: #333; }
            .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 15px; margin-bottom: 20px; }
            .header h1 { font-size: 20px; margin-bottom: 5px; }
            .header p { font-size: 12px; color: #666; }
            .profile-header { display: flex; align-items: center; gap: 20px; margin-bottom: 25px; padding-bottom: 15px; border-bottom: 1px solid #ddd; }
            .avatar { width: 80px; height: 80px; border-radius: 50%; object-fit: cover; border: 3px solid #ddd; }
            .avatar-placeholder { width: 80px; height: 80px; border-radius: 50%; background: #e5e5e5; display: flex; align-items: center; justify-content: center; font-size: 32px; font-weight: bold; color: #999; }
            .profile-info h2 { font-size: 22px; margin-bottom: 5px; }
            .profile-info p { font-size: 14px; color: #666; margin: 2px 0; }
            .stats { display: flex; gap: 15px; margin-bottom: 25px; }
            .stat-box { flex: 1; text-align: center; padding: 15px; border: 1px solid #ddd; border-radius: 8px; }
            .stat-box h4 { font-size: 11px; color: #666; text-transform: uppercase; margin-bottom: 5px; }
            .stat-box p { font-size: 24px; font-weight: bold; }
            .section { margin-bottom: 25px; }
            .section h3 { font-size: 16px; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 1px solid #eee; }
            .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
            .info-item label { display: block; font-size: 11px; color: #666; text-transform: uppercase; margin-bottom: 3px; }
            .info-item p { font-size: 14px; font-weight: 500; }
            .full-width { grid-column: 1 / -1; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { padding: 10px; text-align: left; border: 1px solid #ddd; font-size: 13px; }
            th { background: #f5f5f5; font-weight: 600; text-transform: uppercase; font-size: 11px; }
            .status { display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 11px; font-weight: 500; }
            .status-pending { background: #fef3c7; color: #92400e; }
            .status-confirmed { background: #d1fae5; color: #065f46; }
            .status-completed { background: #dbeafe; color: #1e40af; }
            .status-cancelled { background: #f3f4f6; color: #4b5563; }
            @media print { body { print-color-adjust: exact; -webkit-print-color-adjust: exact; } }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Gilt Counselling Services</h1>
            <p>Client Profile Report - Generated on ${new Date().toLocaleDateString()}</p>
          </div>

          <div class="profile-header">
            ${user?.profilePhoto || user?.image
              ? `<img src="${user.profilePhoto || user.image}" alt="${user.firstName}" class="avatar" />`
              : `<div class="avatar-placeholder">${(user?.firstName || 'U').charAt(0).toUpperCase()}</div>`
            }
            <div class="profile-info">
              <h2>${user?.firstName || ''} ${user?.lastName || ''}</h2>
              <p>${user?.email || ''}</p>
              <p>${user?.phone || ''}</p>
              ${user?.occupation ? `<p><strong>Occupation:</strong> ${user.occupation}</p>` : ''}
            </div>
          </div>

          <div class="stats">
            <div class="stat-box"><h4>Total</h4><p>${stats?.totalAppointments || 0}</p></div>
            <div class="stat-box"><h4>Pending</h4><p style="color:#d97706">${stats?.pending || 0}</p></div>
            <div class="stat-box"><h4>Confirmed</h4><p style="color:#059669">${stats?.confirmed || 0}</p></div>
            <div class="stat-box"><h4>Completed</h4><p style="color:#0891b2">${stats?.completed || 0}</p></div>
            <div class="stat-box"><h4>Cancelled</h4><p style="color:#6b7280">${stats?.cancelled || 0}</p></div>
          </div>

          <div class="section">
            <h3>Profile Information</h3>
            <div class="info-grid">
              <div class="info-item">
                <label>Date of Birth</label>
                <p>${user?.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : 'Not specified'}</p>
              </div>
              <div class="info-item">
                <label>Gender</label>
                <p style="text-transform:capitalize">${user?.gender || 'Not specified'}</p>
              </div>
              <div class="info-item">
                <label>Source</label>
                <p style="text-transform:capitalize">${user?.source || 'online'}</p>
              </div>
              <div class="info-item">
                <label>Member Since</label>
                <p>${user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
              </div>
              <div class="info-item">
                <label>Preferred Contact</label>
                <p style="text-transform:capitalize">${user?.preferredContactMethod || 'email'}</p>
              </div>
              <div class="info-item">
                <label>Email Notifications</label>
                <p>${user?.emailNotifications !== false ? 'Enabled' : 'Disabled'}</p>
              </div>
              ${user?.address && (user.address.street || user.address.city) ? `
                <div class="info-item full-width">
                  <label>Address</label>
                  <p>${[user.address.street, user.address.city, user.address.state, user.address.country, user.address.postalCode].filter(Boolean).join(', ')}</p>
                </div>
              ` : ''}
              ${user?.emergencyContact?.name ? `
                <div class="info-item full-width">
                  <label>Emergency Contact</label>
                  <p><strong>${user.emergencyContact.name}</strong> (${user.emergencyContact.relationship || 'N/A'}) - ${user.emergencyContact.phone || 'N/A'}${user.emergencyContact.email ? ` - ${user.emergencyContact.email}` : ''}</p>
                </div>
              ` : ''}
            </div>
          </div>

          <div class="section">
            <h3>Appointment History</h3>
            ${appointments.length === 0
              ? '<p style="text-align:center;color:#666;padding:20px;">No appointments yet</p>'
              : `
                <table>
                  <thead>
                    <tr>
                      <th>Service</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Status</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${appointments.map((apt: any) => `
                      <tr>
                        <td>${apt.service}${apt.rescheduledFrom ? ' (Rescheduled)' : ''}</td>
                        <td>${apt.date}</td>
                        <td>${apt.time}</td>
                        <td><span class="status status-${apt.status}">${apt.status}</span></td>
                        <td>${apt.notes || '-'}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              `
            }
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();

    // Wait for content to load, then print
    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
      printWindow.onafterprint = () => printWindow.close();
    };
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto my-8" ref={printRef}>
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6 sticky top-0 bg-white pb-4 border-b border-gray-200">
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
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                disabled={loading || !data}
                className={`transition p-2 rounded-lg ${
                  loading || !data
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
                title={loading || !data ? 'Loading...' : 'Print profile'}
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
