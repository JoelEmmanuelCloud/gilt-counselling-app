import mongoose, { Schema } from 'mongoose';
import { DEFAULT_STAFF_TIER, STAFF_TIERS, type StaffTier } from '@/lib/staffInput';

export interface IStaffMember {
  _id?: string;
  name: string;
  role: string;
  title?: string;
  credentials?: string;
  bio?: string;
  photo?: string;
  tier: StaffTier;
  featured: boolean;
  published: boolean;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const StaffMemberSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: 120,
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      trim: true,
      maxlength: 120,
    },
    title: {
      type: String,
      trim: true,
      maxlength: 160,
    },
    credentials: {
      type: String,
      trim: true,
      maxlength: 160,
    },
    bio: {
      type: String,
      trim: true,
      maxlength: 2000,
    },
    photo: {
      type: String,
      trim: true,
    },
    tier: {
      type: String,
      enum: STAFF_TIERS.map((tier) => tier.value),
      default: DEFAULT_STAFF_TIER,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    published: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

let StaffMember: any;
if (mongoose.models.StaffMember) {
  StaffMember = mongoose.models.StaffMember;
} else {
  StaffMember = mongoose.model('StaffMember', StaffMemberSchema);
}

export default StaffMember;
