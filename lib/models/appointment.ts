import { v4 as uuidv4 } from 'uuid';

export interface Appointment {
  id: string;
  userId: string | null;
  userName: string;
  userEmail: string;
  userPhone: string;
  service: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  createdAt: string;
}

// In-memory storage (replace with database in production)
let appointments: Appointment[] = [
  {
    id: '1',
    userId: '2',
    userName: 'John Doe',
    userEmail: 'user@example.com',
    userPhone: '+234 706 573 4165',
    service: 'Mental Health & Emotional Wellness',
    date: '2025-12-25',
    time: '10:00 AM',
    status: 'confirmed',
    notes: 'Looking forward to the session',
    createdAt: new Date().toISOString()
  }
];

export const getAllAppointments = (): Appointment[] => {
  return appointments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const getAppointmentsByUserId = (userId: string): Appointment[] => {
  return appointments
    .filter(apt => apt.userId === userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const getAppointmentById = (id: string): Appointment | undefined => {
  return appointments.find(apt => apt.id === id);
};

export const createAppointment = (appointmentData: Omit<Appointment, 'id' | 'status' | 'createdAt'>): Appointment => {
  const newAppointment: Appointment = {
    id: uuidv4(),
    ...appointmentData,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  appointments.push(newAppointment);
  return newAppointment;
};

export const updateAppointment = (id: string, updates: Partial<Appointment>): Appointment | null => {
  const index = appointments.findIndex(apt => apt.id === id);
  if (index === -1) return null;

  appointments[index] = {
    ...appointments[index],
    ...updates
  };
  return appointments[index];
};

export const deleteAppointment = (id: string): boolean => {
  const index = appointments.findIndex(apt => apt.id === id);
  if (index === -1) return false;

  appointments.splice(index, 1);
  return true;
};
