import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api.js';
import { useToast } from './ToastContext.jsx';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('crowdtrust_token') || null);
  const [loading, setLoading] = useState(true);
  const { success, error } = useToast();

  // Load current authenticated user profile
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await api.get('/auth/me');
        if (res.success && res.data.user) {
          setUser(res.data.user);
        }
      } catch (err) {
        console.warn('Session expired or invalid token:', err.message);
        localStorage.removeItem('crowdtrust_token');
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.success && res.token) {
        localStorage.setItem('crowdtrust_token', res.token);
        setToken(res.token);
        setUser(res.data.user);
        success(`Welcome back, ${res.data.user.name}!`);
        return { success: true, user: res.data.user };
      }
    } catch (err) {
      error(err.message);
      return { success: false, error: err.message };
    }
  };

  const register = async (userData) => {
    try {
      const res = await api.post('/auth/register', userData);
      if (res.success && res.token) {
        localStorage.setItem('crowdtrust_token', res.token);
        setToken(res.token);
        setUser(res.data.user);
        success('Account created successfully! Welcome to CrowdTrust.');
        return { success: true, user: res.data.user };
      }
    } catch (err) {
      error(err.message);
      return { success: false, error: err.message };
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (err) {
      // Ignore network errors on logout
    } finally {
      localStorage.removeItem('crowdtrust_token');
      setToken(null);
      setUser(null);
      success('Logged out safely.');
    }
  };

  const updateProfile = async (updates) => {
    try {
      const res = await api.patch('/auth/profile', updates);
      if (res.success && res.data.user) {
        setUser(res.data.user);
        success('Profile updated successfully.');
        return { success: true, user: res.data.user };
      }
    } catch (err) {
      error(err.message);
      return { success: false, error: err.message };
    }
  };

  const toggleBookmark = async (campaignId) => {
    if (!user) {
      error('Please login to bookmark campaigns');
      return false;
    }
    try {
      const res = await api.post(`/auth/bookmarks/${campaignId}`);
      if (res.success) {
        setUser((prev) => ({
          ...prev,
          bookmarks: res.data.bookmarks,
        }));
        success(res.message);
        return res.data.isBookmarked;
      }
    } catch (err) {
      error(err.message);
      return false;
    }
  };

  const isBookmarked = (campaignId) => {
    if (!user || !user.bookmarks) return false;
    return user.bookmarks.some((b) => (typeof b === 'string' ? b === campaignId : b._id === campaignId));
  };

  const getDashboardPath = (role = user?.role) => {
    if (role === 'admin') return '/admin/dashboard';
    if (role === 'creator') return '/creator/dashboard';
    return '/dashboard';
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile,
        toggleBookmark,
        isBookmarked,
        getDashboardPath,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
