export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'admin' | 'counselor';
}

export interface Appointment {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  counselorId?: string;
  counselorName?: string;
  service: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  counselorNotes?: string;
  rescheduledFrom?: {
    date: string;
    time: string;
    rescheduledAt: Date;
  };
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, phone: string) => Promise<void>;
  logout: () => void;
  token: string | null;
  sendOTP: (email: string) => Promise<void>;
  verifyOTP: (email: string, code: string) => Promise<void>;
  resendOTP: (email: string) => Promise<void>;
}
