import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: 'user' | 'admin' | 'counselor';
      phone?: string;
      emailVerified?: Date | null;
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: 'user' | 'admin' | 'counselor';
    phone?: string;
    emailVerified?: Date | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    userId?: string;
    role?: 'user' | 'admin' | 'counselor';
    phone?: string;
    emailVerified?: Date | null;
  }
}
