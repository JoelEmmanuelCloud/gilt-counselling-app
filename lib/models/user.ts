import mongoose, { Schema, Model } from 'mongoose';

export interface IUser {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: 'user' | 'admin' | 'counselor';
  specializations?: string[];
  bio?: string;
  availability?: Array<{
    dayOfWeek: number;
    startTime: string;
    endTime: string;
  }>;
  isAvailable?: boolean;
  emailVerified?: Date | null;
  verificationToken?: string;
  verificationTokenExpiry?: Date;
  image?: string;
  profilePhoto?: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  occupation?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
  };
  emergencyContact?: {
    name?: string;
    relationship?: string;
    phone?: string;
    email?: string;
  };
  source?: 'online' | 'phone' | 'whatsapp' | 'walk-in';
  medicalHistory?: string;
  sessionNotes?: Array<{
    date: Date;
    note: string;
    createdBy: string;
  }>;
  preferredContactMethod?: 'email' | 'phone' | 'whatsapp';
  emailNotifications?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<IUser>(
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
      required: false,
      trim: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'counselor'],
      default: 'user',
    },
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
      type: String,
    },
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
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      postalCode: String,
    },
    emergencyContact: {
      name: String,
      relationship: String,
      phone: String,
      email: String,
    },
    source: {
      type: String,
      enum: ['online', 'phone', 'whatsapp', 'walk-in'],
      default: 'online',
    },
    medicalHistory: {
      type: String,
    },
    sessionNotes: [{
      date: {
        type: Date,
        default: Date.now,
      },
      note: String,
      createdBy: String,
    }],
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
let User: any;
if (mongoose.models.User) {
  User = mongoose.models.User;
} else {
  User = mongoose.model('User', UserSchema);
}

export default User;
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
