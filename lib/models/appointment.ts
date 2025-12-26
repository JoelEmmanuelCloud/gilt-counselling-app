import mongoose, { Schema, Model } from 'mongoose';

export interface IAppointment {
  _id?: string;
  userId?: mongoose.Types.ObjectId | string | null;
  userName: string;
  userEmail: string;
  userPhone: string;
  service: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const AppointmentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    userName: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    userEmail: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
    },
    userPhone: {
      type: String,
      required: [true, 'Phone is required'],
      trim: true,
    },
    service: {
      type: String,
      required: [true, 'Service is required'],
    },
    date: {
      type: String,
      required: [true, 'Date is required'],
    },
    time: {
      type: String,
      required: [true, 'Time is required'],
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending',
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model recompilation in development
const Appointment: Model<IAppointment> =
  mongoose.models.Appointment || mongoose.model<IAppointment>('Appointment', AppointmentSchema);

export default Appointment;

// Helper functions for compatibility
export const getAllAppointments = async () => {
  return await Appointment.find().sort({ createdAt: -1 });
};

export const getAppointmentsByUserId = async (userId: string) => {
  return await Appointment.find({ userId }).sort({ createdAt: -1 });
};

export const getAppointmentById = async (id: string) => {
  return await Appointment.findById(id);
};

export const createAppointment = async (appointmentData: Partial<IAppointment>) => {
  const appointment = new Appointment({
    ...appointmentData,
    status: 'pending',
  });
  return await appointment.save();
};

export const updateAppointment = async (id: string, updates: Partial<IAppointment>) => {
  return await Appointment.findByIdAndUpdate(id, updates, { new: true });
};

export const deleteAppointment = async (id: string) => {
  const result = await Appointment.findByIdAndDelete(id);
  return result !== null;
};
