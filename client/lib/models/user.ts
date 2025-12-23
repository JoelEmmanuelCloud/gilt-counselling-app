import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: 'user' | 'admin';
}

// In-memory storage (replace with database in production)
let users: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@gilt.com',
    phone: '+234 803 309 4050',
    password: bcrypt.hashSync('admin123', 10),
    role: 'admin'
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'user@example.com',
    phone: '+234 706 573 4165',
    password: bcrypt.hashSync('user123', 10),
    role: 'user'
  }
];

export const findUserByEmail = (email: string): User | undefined => {
  return users.find(user => user.email === email);
};

export const findUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

export const createUser = (name: string, email: string, password: string, phone: string): User => {
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser: User = {
    id: uuidv4(),
    name,
    email,
    phone,
    password: hashedPassword,
    role: 'user'
  };
  users.push(newUser);
  return newUser;
};

export const validatePassword = (plainPassword: string, hashedPassword: string): boolean => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};
