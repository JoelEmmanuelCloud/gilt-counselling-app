import mongoose, { Schema, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: 'user' | 'admin';
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
      required: [true, 'Phone is required'],
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
UserSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare password
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Prevent model recompilation in development
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

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
