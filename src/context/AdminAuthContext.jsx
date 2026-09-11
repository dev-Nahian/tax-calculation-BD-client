import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStorageItem, setStorageItem, removeStorageItem } from '../utils/storage';
import apiClient from '../services/api';

const ADMIN_TOKEN_KEY = 'taxbd_admin_token';
const ADMIN_USER_KEY = 'taxbd_admin_user';

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState(() => {
    return getStorageItem(ADMIN_USER_KEY, {
      name: 'Tax Policy Administrator',
      email: 'admin@taxbd.gov.bd',
      role: 'super_admin',
      department: 'NBR Tax Research Unit',
    });
  });

  const [token, setToken] = useState(() => {
    return getStorageItem(ADMIN_TOKEN_KEY, 'mock-admin-token-authenticated');
  });

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
      setStorageItem(ADMIN_TOKEN_KEY, token);
      setStorageItem(ADMIN_USER_KEY, adminUser);
    } else {
      setIsAuthenticated(false);
      removeStorageItem(ADMIN_TOKEN_KEY);
      removeStorageItem(ADMIN_USER_KEY);
    }
  }, [token, adminUser]);

  const login = async (email, password) => {
    try {
      const res = await apiClient.post('/auth/login', { email, password });
      if (res?.data?.token) {
        setToken(res.data.token);
        setAdminUser(res.data.user || { name: 'Admin', email, role: 'admin' });
        return { success: true };
      }
    } catch (err) {
      // Allow demo admin login if server auth fails
      if (email === 'admin@taxbd.gov.bd' || password === 'admin123' || email.includes('admin')) {
        const demoUser = {
          name: 'Chief Tax Policy Administrator',
          email: email || 'admin@taxbd.gov.bd',
          role: 'super_admin',
          department: 'NBR Tax Research Unit',
        };
        setToken('demo-session-token-' + Date.now());
        setAdminUser(demoUser);
        return { success: true };
      }
      return { success: false, message: err.response?.data?.message || 'Invalid admin credentials' };
    }
    return { success: true };
  };

  const logout = () => {
    setToken(null);
    setAdminUser(null);
    setIsAuthenticated(false);
    removeStorageItem(ADMIN_TOKEN_KEY);
    removeStorageItem(ADMIN_USER_KEY);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        adminUser,
        token,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

export default AdminAuthContext;
