import mongoose, { Schema, Model } from 'mongoose';

export interface INotification {
  _id?: string;
  userId: mongoose.Types.ObjectId | string;
  type: 'appointment_assigned' | 'appointment_updated' | 'appointment_cancelled' | 'appointment_reminder';
  title: string;
  message: string;
  data: {
    appointmentId?: string;
    clientName?: string;
    clientEmail?: string;
    clientPhone?: string;
    service?: string;
    date?: string;
    time?: string;
  };
  read: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const NotificationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true,
    },
    type: {
      type: String,
      enum: ['appointment_assigned', 'appointment_updated', 'appointment_cancelled', 'appointment_reminder'],
      required: [true, 'Notification type is required'],
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
    },
    data: {
      appointmentId: String,
      clientName: String,
      clientEmail: String,
      clientPhone: String,
      service: String,
      date: String,
      time: String,
    },
    read: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for efficient queries
NotificationSchema.index({ userId: 1, read: 1, createdAt: -1 });

// Prevent model recompilation in development
const Notification: Model<INotification> =
  mongoose.models.Notification || mongoose.model<INotification>('Notification', NotificationSchema);

export default Notification;

// Helper functions
export const createNotification = async (notificationData: Partial<INotification>) => {
  const notification = new Notification(notificationData);
  return await notification.save();
};

export const getNotificationsByUserId = async (userId: string, limit = 50) => {
  return await Notification.find({ userId })
    .sort({ createdAt: -1 })
    .limit(limit);
};

export const getUnreadCount = async (userId: string) => {
  return await Notification.countDocuments({ userId, read: false });
};

export const markAsRead = async (notificationId: string) => {
  return await Notification.findByIdAndUpdate(
    notificationId,
    { read: true },
    { new: true }
  );
};

export const markAllAsRead = async (userId: string) => {
  return await Notification.updateMany(
    { userId, read: false },
    { read: true }
  );
};
