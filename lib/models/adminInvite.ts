import mongoose, { Schema, Model } from 'mongoose';

export interface IAdminInvite {
  _id?: string;
  email: string;
  token: string;
  invitedBy: string; // Admin user ID who created the invite
  expiresAt: Date;
  used: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const AdminInviteSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v: string) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: 'Please provide a valid email',
      },
    },
    token: {
      type: String,
      required: [true, 'Token is required'],
      unique: true,
      index: true,
    },
    invitedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Invited by admin ID is required'],
    },
    expiresAt: {
      type: Date,
      required: [true, 'Expiration date is required'],
      index: true,
    },
    used: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// TTL Index: Automatically delete expired invites from database
AdminInviteSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Prevent model recompilation in development
const AdminInvite: Model<IAdminInvite> =
  mongoose.models.AdminInvite || mongoose.model<IAdminInvite>('AdminInvite', AdminInviteSchema);

export default AdminInvite;

// Helper functions for admin invite management
export const createAdminInvite = async (email: string, token: string, invitedBy: string, expiresInHours: number = 48) => {
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + expiresInHours);

  const invite = new AdminInvite({
    email: email.toLowerCase(),
    token,
    invitedBy,
    expiresAt,
    used: false,
  });

  return await invite.save();
};

export const findAdminInviteByToken = async (token: string) => {
  return await AdminInvite.findOne({
    token,
    used: false,
    expiresAt: { $gt: new Date() }, // Not expired
  });
};

export const markAdminInviteAsUsed = async (token: string) => {
  return await AdminInvite.findOneAndUpdate(
    { token },
    { used: true },
    { new: true }
  );
};

export const findActiveAdminInvite = async (email: string) => {
  return await AdminInvite.findOne({
    email: email.toLowerCase(),
    used: false,
    expiresAt: { $gt: new Date() },
  });
};
