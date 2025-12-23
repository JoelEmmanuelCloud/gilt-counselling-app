const {
  getAllAppointments,
  getAppointmentsByUserId,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment
} = require('../models/appointment');

const getAppointments = (req, res) => {
  try {
    // Admin can see all appointments
    if (req.user.role === 'admin') {
      const appointments = getAllAppointments();
      return res.json(appointments);
    }

    // Regular users see only their appointments
    const appointments = getAppointmentsByUserId(req.user.id);
    res.json(appointments);
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getMyAppointments = (req, res) => {
  try {
    const appointments = getAppointmentsByUserId(req.user.id);
    res.json(appointments);
  } catch (error) {
    console.error('Get my appointments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const createNewAppointment = (req, res) => {
  try {
    const { name, email, phone, service, date, time, notes } = req.body;

    // Validate input
    if (!name || !email || !phone || !service || !date || !time) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // Create appointment
    const appointmentData = {
      userId: req.user?.id || null,
      userName: name,
      userEmail: email,
      userPhone: phone,
      service,
      date,
      time,
      notes: notes || ''
    };

    const newAppointment = createAppointment(appointmentData);

    res.status(201).json({
      message: 'Appointment booked successfully',
      appointment: newAppointment
    });
  } catch (error) {
    console.error('Create appointment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateAppointmentStatus = (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const appointment = getAppointmentById(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Check if user has permission to update
    if (req.user.role !== 'admin' && appointment.userId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this appointment' });
    }

    const updatedAppointment = updateAppointment(id, { status });

    res.json({
      message: 'Appointment updated successfully',
      appointment: updatedAppointment
    });
  } catch (error) {
    console.error('Update appointment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const removeAppointment = (req, res) => {
  try {
    const { id } = req.params;

    const appointment = getAppointmentById(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Only admin can delete appointments
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can delete appointments' });
    }

    const deleted = deleteAppointment(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error('Delete appointment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAppointments,
  getMyAppointments,
  createNewAppointment,
  updateAppointmentStatus,
  removeAppointment
};
