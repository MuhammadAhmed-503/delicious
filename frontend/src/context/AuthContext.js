import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';

const AuthContext = createContext();
const ADMIN_IDLE_TIMEOUT_MS = 15 * 60 * 1000;
const ADMIN_ACTIVITY_KEY = 'adminLastActivityAt';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      const parsedUser = JSON.parse(storedUser);

      // Admin sessions expire after inactivity.
      if (parsedUser.role === 'admin') {
        const lastActivity = Number(localStorage.getItem(ADMIN_ACTIVITY_KEY) || 0);
        const isExpired = !lastActivity || Date.now() - lastActivity > ADMIN_IDLE_TIMEOUT_MS;

        if (isExpired) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          localStorage.removeItem(ADMIN_ACTIVITY_KEY);
        } else {
          setToken(storedToken);
          setUser(parsedUser);
        }
      } else {
        setToken(storedToken);
        setUser(parsedUser);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!token || user?.role !== 'admin') {
      return undefined;
    }

    const activityEvents = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];
    let timeoutId;

    const forceAdminLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem(ADMIN_ACTIVITY_KEY);
      setToken(null);
      setUser(null);
      toast.info('Admin session expired due to inactivity. Please log in again.');
    };

    const resetAdminTimer = () => {
      localStorage.setItem(ADMIN_ACTIVITY_KEY, String(Date.now()));
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(forceAdminLogout, ADMIN_IDLE_TIMEOUT_MS);
    };

    resetAdminTimer();
    activityEvents.forEach((eventName) => {
      window.addEventListener(eventName, resetAdminTimer);
    });

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      activityEvents.forEach((eventName) => {
        window.removeEventListener(eventName, resetAdminTimer);
      });
    };
  }, [token, user]);

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      if (user.role === 'admin') {
        localStorage.setItem(ADMIN_ACTIVITY_KEY, String(Date.now()));
      } else {
        localStorage.removeItem(ADMIN_ACTIVITY_KEY);
      }

      setToken(token);
      setUser(user);

      toast.success('Login successful!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      return { success: false, message };
    }
  };

  const signup = async (userData) => {
    try {
      const response = await api.post('/auth/signup', userData);
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      if (user.role === 'admin') {
        localStorage.setItem(ADMIN_ACTIVITY_KEY, String(Date.now()));
      } else {
        localStorage.removeItem(ADMIN_ACTIVITY_KEY);
      }

      setToken(token);
      setUser(user);

      toast.success('Account created successfully!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Signup failed';
      toast.error(message);
      return { success: false, message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem(ADMIN_ACTIVITY_KEY);
    setToken(null);
    setUser(null);
    toast.info('Logged out successfully');
  };

  const value = {
    user,
    token,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!token,
    isAdmin: user?.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
