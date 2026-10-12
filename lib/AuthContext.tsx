'use client';

import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import api from './api';
import { User, AuthContextType } from './types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem('token');
    } catch {}
    setToken(null);
    setUser(null);
  }, []);

  useEffect(() => {
    let storedToken: string | null = null;
    try {
      storedToken = localStorage.getItem('token');
    } catch {}

    if (!storedToken) {
      setLoading(false);
      return;
    }

    setToken(storedToken);
    api
      .get('/auth/me')
      .then((response) => setUser(response.data.user))
      .catch(() => logout())
      .finally(() => setLoading(false));
  }, [logout]);

  const adminLogin = async (email: string, password: string): Promise<User> => {
    try {
      const response = await api.post('/auth/admin-login', { email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setToken(token);
      setUser(user);
      return user;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Invalid email or password');
    }
  };

  return (
    <AuthContext.Provider value={{ user, logout, token, loading, adminLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
