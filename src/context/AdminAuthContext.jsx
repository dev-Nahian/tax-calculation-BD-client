import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getStorageItem, setStorageItem, removeStorageItem, STORAGE_KEYS } from '../utils/storage';
import apiClient from '../services/api';

const ALLOWED_ADMIN_ROLES = ['admin', 'super_admin', 'tax_officer'];

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState(() => {
    return getStorageItem(STORAGE_KEYS.ADMIN_USER, null);
  });

  const [token, setToken] = useState(() => {
    return getStorageItem(STORAGE_KEYS.ADMIN_TOKEN, null);
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedToken = getStorageItem(STORAGE_KEYS.ADMIN_TOKEN, null);
    const storedUser = getStorageItem(STORAGE_KEYS.ADMIN_USER, null);
    return !!(storedToken && storedUser && ALLOWED_ADMIN_ROLES.includes(storedUser.role));
  });

  const [checkingAuth, setCheckingAuth] = useState(true);

  const logout = useCallback(() => {
    setToken(null);
    setAdminUser(null);
    setIsAuthenticated(false);
    removeStorageItem(STORAGE_KEYS.ADMIN_TOKEN);
    removeStorageItem(STORAGE_KEYS.ADMIN_USER);
  }, []);

  // Validate stored session on mount
  useEffect(() => {
    const verifySession = async () => {
      const storedToken = getStorageItem(STORAGE_KEYS.ADMIN_TOKEN, null);
      const storedUser = getStorageItem(STORAGE_KEYS.ADMIN_USER, null);

      if (storedToken && storedUser && ALLOWED_ADMIN_ROLES.includes(storedUser.role)) {
        setIsAuthenticated(true);
        setAdminUser(storedUser);
        setToken(storedToken);
      } else {
        logout();
      }
      setCheckingAuth(false);
    };

    verifySession();
  }, [logout]);

  const login = async (email, password) => {
    try {
      const res = await apiClient.post('/auth/login', { email, password });
      const data = res?.data || res;

      if (!data?.token || !data?.user) {
        return {
          success: false,
          message: 'Invalid response format from authentication server.',
        };
      }

      const user = data.user;

      // Strict Role-Based Access Control: Regular users cannot access Admin Suite
      if (!ALLOWED_ADMIN_ROLES.includes(user.role)) {
        logout();
        return {
          success: false,
          message: `Access Denied: Account '${email}' is registered with role '${user.role}'. Only authorized tax administrators and officers can access the Admin Portal.`,
        };
      }

      setToken(data.token);
      setAdminUser(user);
      setIsAuthenticated(true);
      setStorageItem(STORAGE_KEYS.ADMIN_TOKEN, data.token);
      setStorageItem(STORAGE_KEYS.ADMIN_USER, user);

      return { success: true, user };
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'Authentication failed. Please verify your admin credentials.';

      return {
        success: false,
        message: errorMessage,
      };
    }
  };

  return (
    <AdminAuthContext.Provider
      value={{
        adminUser,
        token,
        isAuthenticated,
        checkingAuth,
        login,
        logout,
        allowedRoles: ALLOWED_ADMIN_ROLES,
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

