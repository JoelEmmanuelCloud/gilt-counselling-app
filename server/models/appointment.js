const { v4: uuidv4 } = require('uuid');

// In-memory storage (replace with database in production)
let appointments = [
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

const getAllAppointments = () => {
  return appointments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

const getAppointmentsByUserId = (userId) => {
  return appointments
    .filter(apt => apt.userId === userId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

const getAppointmentById = (id) => {
  return appointments.find(apt => apt.id === id);
};

const createAppointment = (appointmentData) => {
  const newAppointment = {
    id: uuidv4(),
    ...appointmentData,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  appointments.push(newAppointment);
  return newAppointment;
};

const updateAppointment = (id, updates) => {
  const index = appointments.findIndex(apt => apt.id === id);
  if (index === -1) return null;

  appointments[index] = {
    ...appointments[index],
    ...updates
  };
  return appointments[index];
};

const deleteAppointment = (id) => {
  const index = appointments.findIndex(apt => apt.id === id);
  if (index === -1) return false;

  appointments.splice(index, 1);
  return true;
};

module.exports = {
  getAllAppointments,
  getAppointmentsByUserId,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment
};
