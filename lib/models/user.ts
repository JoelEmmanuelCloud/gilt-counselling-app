import mongoose, { Schema, Model } from 'mongoose';

export interface IUser {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string; // Optional (for OAuth users)
  role: 'user' | 'admin' | 'counselor';
  // Counselor-specific fields
  specializations?: string[];
  bio?: string;
  availability?: Array<{
    dayOfWeek: number; // 0 = Sunday, 6 = Saturday
    startTime: string; // HH:mm format
    endTime: string; // HH:mm format
  }>;
  isAvailable?: boolean; // Quick toggle for availability
  emailVerified?: Date | null; // For NextAuth
  verificationToken?: string; // For email verification
  verificationTokenExpiry?: Date; // Token expiry time
  image?: string; // For OAuth profile photos
  // Profile information
  profilePhoto?: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  occupation?: string;
  // Address information
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
  };
  // Emergency contact
  emergencyContact?: {
    name?: string;
    relationship?: string;
    phone?: string;
    email?: string;
  };
  // Client source tracking
  source?: 'online' | 'phone' | 'whatsapp' | 'walk-in';
  // Medical/counselling history
  medicalHistory?: string;
  // Session notes (admin only, not exposed to user)
  sessionNotes?: Array<{
    date: Date;
    note: string;
    createdBy: string;
  }>;
  // Additional preferences
  preferredContactMethod?: 'email' | 'phone' | 'whatsapp';
  emailNotifications?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v: string) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: 'Please provide a valid email',
      },
    },
    phone: {
      type: String,
      required: false, // Optional for OAuth users
      trim: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'counselor'],
      default: 'user',
    },
    // Counselor-specific fields
    specializations: [{
      type: String,
      trim: true,
    }],
    bio: {
      type: String,
      trim: true,
    },
    availability: [{
      dayOfWeek: {
        type: Number,
        min: 0,
        max: 6,
      },
      startTime: String,
      endTime: String,
    }],
    isAvailable: {
      type: Boolean,
      default: true,
    },
    // NextAuth fields
    emailVerified: {
      type: Date,
      default: null,
    },
    verificationToken: {
      type: String,
    },
    verificationTokenExpiry: {
      type: Date,
    },
    image: {
      type: String, // For OAuth profile photos (e.g., Google avatar)
    },
    // Profile information
    profilePhoto: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other', 'prefer-not-to-say'],
    },
    occupation: {
      type: String,
      trim: true,
    },
    // Address information
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      postalCode: String,
    },
    // Emergency contact
    emergencyContact: {
      name: String,
      relationship: String,
      phone: String,
      email: String,
    },
    // Client source tracking
    source: {
      type: String,
      enum: ['online', 'phone', 'whatsapp', 'walk-in'],
      default: 'online',
    },
    // Medical/counselling history
    medicalHistory: {
      type: String,
    },
    // Session notes (admin only)
    sessionNotes: [{
      date: {
        type: Date,
        default: Date.now,
      },
      note: String,
      createdBy: String,
    }],
    // Additional preferences
    preferredContactMethod: {
      type: String,
      enum: ['email', 'phone', 'whatsapp'],
      default: 'email',
    },
    emailNotifications: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model recompilation in development
let User: any;
if (mongoose.models.User) {
  User = mongoose.models.User;
} else {
  // @ts-ignore - Complex schema types cause TypeScript compilation issues
  User = mongoose.model('User', UserSchema);
}

export default User;

// Helper functions for compatibility
export const findUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};

export const findUserById = async (id: string) => {
  return await User.findById(id);
};

export const createUser = async (firstName: string, lastName: string, email: string, phone: string) => {
  const user = new User({
    firstName,
    lastName,
    email,
    phone,
    role: 'user',
  });
  return await user.save();
};
