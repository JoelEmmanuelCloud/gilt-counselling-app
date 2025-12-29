'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import api from './api';
import { User, AuthContextType } from './types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const response = await api.get('/auth/me');
      setUser(response.data.user);
    } catch (error) {
      console.error('Failed to fetch user', error);
      logout();
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setToken(token);
      setUser(user);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const register = async (name: string, email: string, password: string, phone: string) => {
    try {
      const response = await api.post('/auth/register', { name, email, password, phone });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setToken(token);
      setUser(user);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const sendOTP = async (email: string) => {
    try {
      const response = await api.post('/auth/send-otp', { email });
      // Success - OTP sent (don't set token/user yet, wait for verification)
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to send verification code');
    }
  };

  const verifyOTP = async (email: string, code: string) => {
    try {
      const response = await api.post('/auth/verify-otp', { email, code });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setToken(token);
      setUser(user);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Invalid verification code');
    }
  };

  const resendOTP = async (email: string) => {
    try {
      const response = await api.post('/auth/resend-otp', { email });
      // Success - new OTP sent
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to resend verification code');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, token, sendOTP, verifyOTP, resendOTP }}>
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
