'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Appointment } from '@/lib/types';
import Card from '@/components/ui/Card';
import { useToast } from '@/components/ui/Toast';
import axios from 'axios';
import UserProfileModal from '@/components/admin/UserProfileModal';
import AdminPhotoUpload from '@/components/admin/AdminPhotoUpload';

type Tab = 'appointments' | 'clients' | 'counselors' | 'create-booking';

interface Client {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  source?: string;
  dateOfBirth?: string;
  gender?: string;
  address?: {
    city?: string;
    country?: string;
  };
  createdAt: string;
}

interface Counselor {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  specializations?: string[];
  bio?: string;
  isAvailable?: boolean;
  createdAt: string;
}

function AdminDashboardContent() {
  const { data: session, status } = useSession();
  const { user: customUser, token } = useAuth();
  const router = useRouter();
  const toast = useToast();

  // Use either NextAuth user (Google) or custom auth user (OTP)
  const user = session?.user || customUser;
  const isAuthenticated = status === 'authenticated' || (token && customUser);

  const [activeTab, setActiveTab] = useState<Tab>('appointments');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [counselors, setCounselors] = useState<Counselor[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [showCounselorForm, setShowCounselorForm] = useState(false);
  const [counselorForm, setCounselorForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specializations: '',
    bio: '',
    profilePhoto: '',
  });

  useEffect(() => {
    if (status === 'loading') return;

    if (!isAuthenticated) {
      router.push('/book-appointment');
    } else if (user?.role !== 'admin') {
      // Only admins can access this page - redirect everyone else to account
      router.push('/account');
    }
  }, [status, isAuthenticated, user, router]);

  // Booking form state
  const [bookingForm, setBookingForm] = useState({
    userId: '',
    service: '',
    date: '',
    time: '',
    notes: '',
    status: 'confirmed',
    sendConfirmation: true,
  });

  // Client form state
  const [showClientForm, setShowClientForm] = useState(false);
  const [clientForm, setClientForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    source: 'walk-in',
    gender: '',
    dateOfBirth: '',
    address: {
      street: '',
      city: '',
      state: '',
      country: 'Nigeria',
      postalCode: '',
    },
    emergencyContact: {
      name: '',
      relationship: '',
      phone: '',
    },
    preferredContactMethod: 'phone',
    profilePhoto: '',
  });

  useEffect(() => {
    if (activeTab === 'appointments') {
      fetchAppointments();
      fetchCounselors(); // Also fetch counselors for assignment dropdown
    } else if (activeTab === 'clients' || activeTab === 'create-booking') {
      fetchClients();
    } else if (activeTab === 'counselors') {
      fetchCounselors();
    }
  }, [activeTab]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await api.get('/appointments');
      setAppointments(response.data);
    } catch (error) {
      console.error('Failed to fetch appointments', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchClients = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/admin/clients', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClients(response.data);
    } catch (error) {
      console.error('Failed to fetch clients', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCounselors = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/admin/counselors', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCounselors(response.data);
    } catch (error) {
      console.error('Failed to fetch counselors', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCounselor = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/admin/counselors', {
        ...counselorForm,
        specializations: counselorForm.specializations.split(',').map(s => s.trim()).filter(Boolean),
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Counselor created successfully! A welcome email has been sent.');
      setShowCounselorForm(false);
      setCounselorForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        specializations: '',
        bio: '',
        profilePhoto: '',
      });
      fetchCounselors();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create counselor');
    }
  };

  const handleDeleteCounselor = async (id: string) => {
    if (!window.confirm('Are you sure you want to remove this counselor? Their account will be converted to a regular user.')) {
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/admin/counselors/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCounselors();
    } catch (error) {
      console.error('Failed to delete counselor', error);
      toast.error('Unable to remove counselor. Please try again.');
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await api.patch(`/appointments/${id}`, { status });
      fetchAppointments();
    } catch (error) {
      console.error('Failed to update appointment', error);
      toast.error('Unable to update appointment status. Please try again.');
    }
  };

  const handleAssignCounselor = async (appointmentId: string, counselorId: string) => {
    if (!counselorId) return;

    try {
      const token = localStorage.getItem('token');
      await axios.patch(`/api/admin/appointments/${appointmentId}/assign`,
        { counselorId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Counselor assigned successfully! Notification sent.');
      fetchAppointments();
    } catch (error: any) {
      console.error('Failed to assign counselor', error);
      toast.error(error.response?.data?.message || 'Unable to assign counselor. Please try again.');
    }
  };

  const handleDeleteAppointment = async (id: string) => {
    if (!window.confirm('Are you sure you want to permanently delete this appointment record?')) {
      return;
    }

    try {
      await api.delete(`/appointments/${id}`);
      fetchAppointments();
    } catch (error) {
      console.error('Failed to delete appointment', error);
      toast.error('Unable to delete appointment. Please try again.');
    }
  };

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/admin/clients', clientForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Client created successfully!');
      setShowClientForm(false);
      setClientForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        source: 'walk-in',
        gender: '',
        dateOfBirth: '',
        address: {
          street: '',
          city: '',
          state: '',
          country: 'Nigeria',
          postalCode: '',
        },
        emergencyContact: {
          name: '',
          relationship: '',
          phone: '',
        },
        preferredContactMethod: 'phone',
        profilePhoto: '',
      });
      fetchClients();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create client');
    }
  };

  const handleCreateBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/admin/create-booking', bookingForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Appointment created successfully!');
      setBookingForm({
        userId: '',
        service: '',
        date: '',
        time: '',
        notes: '',
        status: 'confirmed',
        sendConfirmation: true,
      });
      setActiveTab('appointments');
      fetchAppointments();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create appointment');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-olive-green bg-opacity-10 text-olive-green border border-olive-green';
      case 'pending':
        return 'bg-soft-gold bg-opacity-10 text-soft-gold border border-soft-gold';
      case 'cancelled':
        return 'bg-soft-beige text-gray-600 border border-soft-beige';
      case 'completed':
        return 'bg-muted-teal bg-opacity-10 text-muted-teal border border-muted-teal';
      default:
        return 'bg-light-grey text-gray-600 border border-light-grey';
    }
  };

  const filteredAppointments = appointments.filter(apt =>
    filter === 'all' ? true : apt.status === filter
  );

  const filteredClients = clients.filter(client => {
    const fullName = `${client.firstName || ''} ${client.lastName || ''}`.toLowerCase();
    const search = searchTerm.toLowerCase();
    return fullName.includes(search) ||
      (client.email?.toLowerCase() || '').includes(search) ||
      (client.phone || '').includes(searchTerm);
  });

  const stats = {
    total: appointments.length,
    pending: appointments.filter(a => a.status === 'pending').length,
    confirmed: appointments.filter(a => a.status === 'confirmed').length,
    completed: appointments.filter(a => a.status === 'completed').length,
    cancelled: appointments.filter(a => a.status === 'cancelled').length,
    totalClients: clients.length,
    totalCounselors: counselors.length,
  };

  const services = [
    'Individual Counseling',
    'Family Therapy',
    'Couples Counseling',
    'Group Therapy',
    'Child & Adolescent Therapy',
    'Trauma & PTSD Counseling',
    'Addiction Counseling',
    'Career Counseling',
    'Mental Health Assessment',
    'Online Counseling Sessions',
  ];

  return (
    <div className="min-h-screen bg-off-white">
      {/* Header - Hidden when printing */}
      <section className="bg-gradient-to-br from-warm-cream via-off-white to-warm-sand py-12 md:py-16 admin-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="heading-xl mb-3">Admin Dashboard</h1>
          <p className="text-gray-600 text-lg">Manage clients, appointments, and bookings</p>
        </div>
      </section>

      {/* Statistics Cards - Hidden when printing */}
      <section className="section-container admin-stats">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <Card className="text-center">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Clients</h3>
              <p className="text-3xl font-heading font-bold text-gray-900">{stats.totalClients}</p>
            </Card>
            <Card className="text-center">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Total</h3>
              <p className="text-3xl font-heading font-bold text-gray-900">{stats.total}</p>
            </Card>
            <Card className="text-center">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Pending</h3>
              <p className="text-3xl font-heading font-bold text-soft-gold">{stats.pending}</p>
            </Card>
            <Card className="text-center">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Confirmed</h3>
              <p className="text-3xl font-heading font-bold text-olive-green">{stats.confirmed}</p>
            </Card>
            <Card className="text-center">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Completed</h3>
              <p className="text-3xl font-heading font-bold text-muted-teal">{stats.completed}</p>
            </Card>
            <Card className="text-center">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Cancelled</h3>
              <p className="text-3xl font-heading font-bold text-gray-500">{stats.cancelled}</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Tabs - Hidden when printing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 admin-content print-content-area">
        <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 admin-tabs">
          <button
            onClick={() => setActiveTab('appointments')}
            className={`px-6 py-3 font-medium transition-all ${
              activeTab === 'appointments'
                ? 'border-b-2 border-gilt-gold text-gilt-gold'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Appointments
          </button>
          <button
            onClick={() => setActiveTab('clients')}
            className={`px-6 py-3 font-medium transition-all ${
              activeTab === 'clients'
                ? 'border-b-2 border-gilt-gold text-gilt-gold'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Clients
          </button>
          <button
            onClick={() => setActiveTab('counselors')}
            className={`px-6 py-3 font-medium transition-all ${
              activeTab === 'counselors'
                ? 'border-b-2 border-gilt-gold text-gilt-gold'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Counselors
          </button>
          <button
            onClick={() => setActiveTab('create-booking')}
            className={`px-6 py-3 font-medium transition-all ${
              activeTab === 'create-booking'
                ? 'border-b-2 border-gilt-gold text-gilt-gold'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Create Booking
          </button>
        </div>

        {/* Appointments Tab */}
        {activeTab === 'appointments' && (
          <Card>
            {/* Print Header - Only visible when printing */}
            <div className="print-header hidden print:block">
              <h1 className="text-2xl font-bold">Gilt Counselling Services</h1>
              <p className="text-sm text-gray-600">Appointments Report - {new Date().toLocaleDateString()}</p>
              <p className="text-xs text-gray-500 mt-1">
                {filter === 'all' ? 'All Appointments' : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Appointments`} ({filteredAppointments.length} total)
              </p>
            </div>

            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6 print:hidden">
              <div>
                <h2 className="heading-md">All Appointments</h2>
                <p className="text-gray-600 text-sm mt-1">
                  {filteredAppointments.length} {filter === 'all' ? '' : filter} appointment{filteredAppointments.length !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'all' ? 'bg-soft-gold text-white' : 'bg-light-grey text-gray-700 hover:bg-soft-beige'}`}>All</button>
                <button onClick={() => setFilter('pending')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'pending' ? 'bg-soft-gold text-white' : 'bg-light-grey text-gray-700 hover:bg-soft-beige'}`}>Pending</button>
                <button onClick={() => setFilter('confirmed')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'confirmed' ? 'bg-olive-green text-white' : 'bg-light-grey text-gray-700 hover:bg-soft-beige'}`}>Confirmed</button>
                <button onClick={() => setFilter('completed')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'completed' ? 'bg-muted-teal text-white' : 'bg-light-grey text-gray-700 hover:bg-soft-beige'}`}>Completed</button>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-600 text-white hover:bg-gray-700 transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Print
                </button>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-soft-gold mb-4"></div>
                <p className="text-gray-600">Loading appointments...</p>
              </div>
            ) : filteredAppointments.length === 0 ? (
              <div className="text-center py-12 bg-warm-cream rounded-lg">
                <p className="text-gray-600">No {filter !== 'all' ? filter : ''} appointments found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-light-grey">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date & Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Counselor</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase print:hidden">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-light-grey">
                    {filteredAppointments.map((appointment: any) => (
                      <tr key={appointment._id || appointment.id} className="hover:bg-warm-cream transition-colors">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{appointment.userName}</div>
                          <div className="text-sm text-gray-500">{appointment.userEmail}</div>
                          <div className="text-sm text-gray-500">{appointment.userPhone}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 font-medium">{appointment.service}</div>
                          {appointment.notes && <div className="text-sm text-gray-500 mt-1">{appointment.notes}</div>}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{appointment.date}</div>
                          <div className="text-sm text-gray-500">{appointment.time}</div>
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={appointment.counselorId || ''}
                            onChange={(e) => handleAssignCounselor(appointment._id || appointment.id, e.target.value)}
                            className={`px-3 py-1 text-xs font-medium rounded-lg cursor-pointer border print:hidden ${
                              appointment.counselorId
                                ? 'bg-olive-green bg-opacity-10 text-olive-green border-olive-green'
                                : 'bg-soft-gold bg-opacity-10 text-soft-gold border-soft-gold'
                            }`}
                          >
                            <option value="">Unassigned</option>
                            {counselors.map((counselor) => (
                              <option key={counselor._id} value={counselor._id}>
                                {counselor.firstName} {counselor.lastName}
                              </option>
                            ))}
                          </select>
                          <span className="hidden print:inline text-sm">{appointment.counselorName || 'Unassigned'}</span>
                        </td>
                        <td className="px-6 py-4">
                          <select value={appointment.status} onChange={(e) => handleStatusChange(appointment._id || appointment.id, e.target.value)} className={`px-3 py-1 text-xs font-medium rounded-full cursor-pointer ${getStatusColor(appointment.status)} print:hidden`}>
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                          <span className="hidden print:inline px-3 py-1 text-xs font-medium capitalize">{appointment.status}</span>
                        </td>
                        <td className="px-6 py-4 print:hidden">
                          <button onClick={() => handleDeleteAppointment(appointment._id || appointment.id)} className="text-red-600 hover:text-red-800 font-medium text-sm">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        )}

        {/* Clients Tab */}
        {activeTab === 'clients' && (
          <Card>
            <div className="flex justify-between items-center mb-6">
              <h2 className="heading-md">Client Management</h2>
              <button onClick={() => setShowClientForm(!showClientForm)} className="px-4 py-2 bg-gilt-gold text-white rounded-lg hover:bg-gilt-orange transition">
                {showClientForm ? 'Cancel' : '+ New Client'}
              </button>
            </div>

            {showClientForm && (
              <form onSubmit={handleCreateClient} className="mb-8 p-6 bg-warm-cream rounded-lg">
                <h3 className="font-semibold text-lg mb-4">Create New Client</h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Profile Photo</label>
                  <AdminPhotoUpload
                    currentPhotoUrl={clientForm.profilePhoto || undefined}
                    onPhotoUploaded={(url) => setClientForm({...clientForm, profilePhoto: url})}
                    onPhotoRemoved={() => setClientForm({...clientForm, profilePhoto: ''})}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="First Name *" required value={clientForm.firstName} onChange={(e) => setClientForm({...clientForm, firstName: e.target.value})} className="px-4 py-2 border rounded-lg" />
                  <input type="text" placeholder="Last Name *" required value={clientForm.lastName} onChange={(e) => setClientForm({...clientForm, lastName: e.target.value})} className="px-4 py-2 border rounded-lg" />
                  <input type="email" placeholder="Email *" required value={clientForm.email} onChange={(e) => setClientForm({...clientForm, email: e.target.value})} className="px-4 py-2 border rounded-lg" />
                  <input type="tel" placeholder="Phone *" required value={clientForm.phone} onChange={(e) => setClientForm({...clientForm, phone: e.target.value})} className="px-4 py-2 border rounded-lg" />
                  <select value={clientForm.source} onChange={(e) => setClientForm({...clientForm, source: e.target.value as any})} className="px-4 py-2 border rounded-lg">
                    <option value="walk-in">Walk-in</option>
                    <option value="phone">Phone</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="online">Online</option>
                  </select>
                  <select value={clientForm.gender} onChange={(e) => setClientForm({...clientForm, gender: e.target.value})} className="px-4 py-2 border rounded-lg">
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                  <input type="date" placeholder="Date of Birth" value={clientForm.dateOfBirth} onChange={(e) => setClientForm({...clientForm, dateOfBirth: e.target.value})} className="px-4 py-2 border rounded-lg" />
                  <input type="text" placeholder="City" value={clientForm.address.city} onChange={(e) => setClientForm({...clientForm, address: {...clientForm.address, city: e.target.value}})} className="px-4 py-2 border rounded-lg" />
                  <select value={clientForm.address.country} onChange={(e) => setClientForm({...clientForm, address: {...clientForm.address, country: e.target.value}})} className="px-4 py-2 border rounded-lg">
                    <option value="Nigeria">Nigeria</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>
                <button type="submit" className="mt-4 px-6 py-2 bg-gilt-gold text-white rounded-lg hover:bg-gilt-orange transition">Create Client</button>
              </form>
            )}

            <input
              type="text"
              placeholder="Search clients by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mb-4"
            />

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-soft-gold mb-4"></div>
                <p className="text-gray-600">Loading clients...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Source</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredClients.map((client) => (
                      <tr
                        key={client._id}
                        onClick={() => setSelectedUserId(client._id)}
                        className="hover:bg-warm-cream transition-colors cursor-pointer"
                      >
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{client.firstName} {client.lastName}</td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{client.email}</div>
                          <div className="text-sm text-gray-500">{client.phone}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{client.address?.city || '-'}, {client.address?.country || '-'}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className="px-2 py-1 bg-gilt-gold bg-opacity-10 text-gilt-gold rounded-full text-xs">{client.source || 'online'}</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">{new Date(client.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        )}

        {/* Counselors Tab */}
        {activeTab === 'counselors' && (
          <Card>
            <div className="flex justify-between items-center mb-6">
              <h2 className="heading-md">Counselor Management</h2>
              <button onClick={() => setShowCounselorForm(!showCounselorForm)} className="px-4 py-2 bg-gilt-gold text-white rounded-lg hover:bg-gilt-orange transition">
                {showCounselorForm ? 'Cancel' : '+ Add Counselor'}
              </button>
            </div>

            {showCounselorForm && (
              <form onSubmit={handleCreateCounselor} className="mb-8 p-6 bg-warm-cream rounded-lg">
                <h3 className="font-semibold text-lg mb-4">Add New Counselor</h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Profile Photo</label>
                  <AdminPhotoUpload
                    currentPhotoUrl={counselorForm.profilePhoto || undefined}
                    onPhotoUploaded={(url) => setCounselorForm({...counselorForm, profilePhoto: url})}
                    onPhotoRemoved={() => setCounselorForm({...counselorForm, profilePhoto: ''})}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="First Name *" required value={counselorForm.firstName} onChange={(e) => setCounselorForm({...counselorForm, firstName: e.target.value})} className="px-4 py-2 border rounded-lg" />
                  <input type="text" placeholder="Last Name *" required value={counselorForm.lastName} onChange={(e) => setCounselorForm({...counselorForm, lastName: e.target.value})} className="px-4 py-2 border rounded-lg" />
                  <input type="email" placeholder="Email *" required value={counselorForm.email} onChange={(e) => setCounselorForm({...counselorForm, email: e.target.value})} className="px-4 py-2 border rounded-lg" />
                  <input type="tel" placeholder="Phone" value={counselorForm.phone} onChange={(e) => setCounselorForm({...counselorForm, phone: e.target.value})} className="px-4 py-2 border rounded-lg" />
                  <input type="text" placeholder="Specializations (comma-separated)" value={counselorForm.specializations} onChange={(e) => setCounselorForm({...counselorForm, specializations: e.target.value})} className="px-4 py-2 border rounded-lg md:col-span-2" />
                </div>
                <textarea placeholder="Bio / Description" value={counselorForm.bio} onChange={(e) => setCounselorForm({...counselorForm, bio: e.target.value})} rows={3} className="w-full px-4 py-2 border rounded-lg mt-4" />
                <button type="submit" className="mt-4 px-6 py-2 bg-gilt-gold text-white rounded-lg hover:bg-gilt-orange transition">Create Counselor</button>
              </form>
            )}

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-soft-gold mb-4"></div>
                <p className="text-gray-600">Loading counselors...</p>
              </div>
            ) : counselors.length === 0 ? (
              <div className="text-center py-12 bg-warm-cream rounded-lg">
                <p className="text-gray-600">No counselors found. Add your first counselor above.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Specializations</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {counselors.map((counselor) => (
                      <tr key={counselor._id} className="hover:bg-warm-cream transition-colors">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{counselor.firstName} {counselor.lastName}</div>
                          {counselor.bio && <div className="text-sm text-gray-500 truncate max-w-xs">{counselor.bio}</div>}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{counselor.email}</div>
                          <div className="text-sm text-gray-500">{counselor.phone || '-'}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {counselor.specializations?.map((spec, i) => (
                              <span key={i} className="px-2 py-1 bg-muted-teal bg-opacity-10 text-muted-teal rounded-full text-xs">{spec}</span>
                            )) || <span className="text-gray-400">-</span>}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${counselor.isAvailable !== false ? 'bg-olive-green bg-opacity-10 text-olive-green' : 'bg-gray-200 text-gray-600'}`}>
                            {counselor.isAvailable !== false ? 'Available' : 'Unavailable'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button onClick={() => handleDeleteCounselor(counselor._id)} className="text-red-600 hover:text-red-800 font-medium text-sm">Remove</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        )}

        {/* Create Booking Tab */}
        {activeTab === 'create-booking' && (
          <Card>
            <h2 className="heading-md mb-6">Create Appointment for Client</h2>
            <form onSubmit={handleCreateBooking} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Client *</label>
                  <select required value={bookingForm.userId} onChange={(e) => setBookingForm({...bookingForm, userId: e.target.value})} className="w-full px-4 py-2 border rounded-lg">
                    <option value="">-- Select a client --</option>
                    {clients.map((client) => (
                      <option key={client._id} value={client._id}>{client.firstName} {client.lastName} ({client.email})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service *</label>
                  <select required value={bookingForm.service} onChange={(e) => setBookingForm({...bookingForm, service: e.target.value})} className="w-full px-4 py-2 border rounded-lg">
                    <option value="">-- Select a service --</option>
                    {services.map((service) => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                  <input type="date" required value={bookingForm.date} onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time *</label>
                  <input type="time" required value={bookingForm.time} onChange={(e) => setBookingForm({...bookingForm, time: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select value={bookingForm.status} onChange={(e) => setBookingForm({...bookingForm, status: e.target.value})} className="w-full px-4 py-2 border rounded-lg">
                    <option value="confirmed">Confirmed</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input type="checkbox" id="sendConfirmation" checked={bookingForm.sendConfirmation} onChange={(e) => setBookingForm({...bookingForm, sendConfirmation: e.target.checked})} className="mr-2" />
                  <label htmlFor="sendConfirmation" className="text-sm text-gray-700">Send email confirmation</label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea value={bookingForm.notes} onChange={(e) => setBookingForm({...bookingForm, notes: e.target.value})} rows={3} className="w-full px-4 py-2 border rounded-lg" placeholder="Add any notes about this booking..."></textarea>
              </div>

              <button type="submit" className="w-full px-6 py-3 bg-gilt-gold text-white rounded-lg font-semibold hover:bg-gilt-orange transition">Create Appointment</button>
            </form>
          </Card>
        )}
      </section>

      {/* User Profile Modal */}
      {selectedUserId && (
        <UserProfileModal
          userId={selectedUserId}
          isOpen={!!selectedUserId}
          onClose={() => setSelectedUserId(null)}
        />
      )}
    </div>
  );
}

export default function AdminDashboard() {
  return <AdminDashboardContent />;
}
