import mongoose, { Schema, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  phone?: string; // Now optional (for OAuth users)
  password?: string; // Now optional (for passwordless auth)
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
    name: {
      type: String,
      required: [true, 'Name is required'],
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
      required: false, // Now optional for OAuth users
      trim: true,
    },
    password: {
      type: String,
      required: false, // Now optional for passwordless auth
      minlength: [6, 'Password must be at least 6 characters'],
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

// Hash password before saving (only if password exists and is modified)
UserSchema.pre('save', async function () {
  if (!this.isModified('password') || !this.password) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare password (only if password exists)
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  if (!this.password) {
    return false; // No password set (OAuth or magic link user)
  }
  return bcrypt.compare(candidatePassword, this.password);
};

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

export const createUser = async (name: string, email: string, password: string, phone: string) => {
  const user = new User({
    name,
    email,
    password,
    phone,
    role: 'user',
  });
  return await user.save();
};

export const validatePassword = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(plainPassword, hashedPassword);
};
