import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUserApi, loginUserApi, registerUserApi } from '../services/authService';
import { getStorageItem, setStorageItem, removeStorageItem, STORAGE_KEYS } from '../utils/storage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getStorageItem(STORAGE_KEYS.USER_DATA));
  const [token, setToken] = useState(() => getStorageItem(STORAGE_KEYS.AUTH_TOKEN));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = getStorageItem(STORAGE_KEYS.AUTH_TOKEN);
      if (storedToken) {
        try {
          const res = await getCurrentUserApi();
          if (res?.data?.user) {
            setUser(res.data.user);
            setStorageItem(STORAGE_KEYS.USER_DATA, res.data.user);
          }
        } catch {
          // Token invalid or offline
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    const res = await loginUserApi({ email, password });
    if (res?.data) {
      const { user: userData, token: userToken } = res.data;
      setUser(userData);
      setToken(userToken);
      setStorageItem(STORAGE_KEYS.AUTH_TOKEN, userToken);
      setStorageItem(STORAGE_KEYS.USER_DATA, userData);
      return userData;
    }
  };

  const register = async (userData) => {
    const res = await registerUserApi(userData);
    if (res?.data) {
      const { user: newUser, token: userToken } = res.data;
      setUser(newUser);
      setToken(userToken);
      setStorageItem(STORAGE_KEYS.AUTH_TOKEN, userToken);
      setStorageItem(STORAGE_KEYS.USER_DATA, newUser);
      return newUser;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    removeStorageItem(STORAGE_KEYS.AUTH_TOKEN);
    removeStorageItem(STORAGE_KEYS.USER_DATA);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        loading,
        login,
        register,
        logout,
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
