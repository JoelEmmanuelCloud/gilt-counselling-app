import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: 'user' | 'admin';
      phone?: string;
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: 'user' | 'admin';
    phone?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userId: string;
    role: 'user' | 'admin';
    phone?: string;
  }
}
