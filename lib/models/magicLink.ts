import mongoose, { Schema, Model } from 'mongoose';

export interface IMagicLink {
  _id?: string;
  email: string;
  token: string;
  expiresAt: Date;
  used: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const MagicLinkSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
    },
    token: {
      type: String,
      required: [true, 'Token is required'],
      unique: true,
      index: true,
    },
    expiresAt: {
      type: Date,
      required: [true, 'Expiry date is required'],
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

// Index to automatically delete expired magic links
MagicLinkSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Prevent model recompilation in development
const MagicLink: Model<IMagicLink> =
  mongoose.models.MagicLink || mongoose.model<IMagicLink>('MagicLink', MagicLinkSchema);

export default MagicLink;

// Helper functions
export const createMagicLink = async (email: string, token: string, expiresInMinutes: number = 15) => {
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + expiresInMinutes);

  const magicLink = new MagicLink({
    email,
    token,
    expiresAt,
    used: false,
  });

  return await magicLink.save();
};

export const findMagicLinkByToken = async (token: string) => {
  return await MagicLink.findOne({ token, used: false, expiresAt: { $gt: new Date() } });
};

export const markMagicLinkAsUsed = async (token: string) => {
  return await MagicLink.findOneAndUpdate(
    { token },
    { used: true },
    { new: true }
  );
};
