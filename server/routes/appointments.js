const express = require('express');
const {
  getAppointments,
  getMyAppointments,
  createNewAppointment,
  updateAppointmentStatus,
  removeAppointment
} = require('../controllers/appointmentController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

// Public route - anyone can book an appointment (but must be authenticated to track it)
router.post('/', (req, res, next) => {
  // Try to authenticate, but don't require it for booking
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (token) {
    authMiddleware(req, res, next);
  } else {
    next();
  }
}, createNewAppointment);

// Protected routes - require authentication
router.get('/my-appointments', authMiddleware, getMyAppointments);
router.get('/', authMiddleware, getAppointments);
router.patch('/:id', authMiddleware, updateAppointmentStatus);

// Admin only routes
router.delete('/:id', authMiddleware, adminMiddleware, removeAppointment);

module.exports = router;
