import axios from 'axios';
import { getStorageItem, STORAGE_KEYS } from '../utils/storage';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor to attach appropriate JWT token (Admin token takes precedence on /admin routes)
apiClient.interceptors.request.use(
  (config) => {
    const isAdminRequest =
      config.url?.startsWith('/admin') ||
      config.url?.startsWith('admin') ||
      (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin'));

    const adminToken = getStorageItem(STORAGE_KEYS.ADMIN_TOKEN);
    const userToken = getStorageItem(STORAGE_KEYS.AUTH_TOKEN);

    // Prioritize adminToken for administrative endpoints, userToken for public/taxpayer endpoints
    const token = isAdminRequest ? (adminToken || userToken) : (userToken || adminToken);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response?.status;
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'Something went wrong with the request';

    // Auto-logout from admin portal if admin token is invalid, expired, or forbidden
    if (status === 401 || status === 403) {
      if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin') && !window.location.pathname.includes('/admin/login')) {
        try {
          localStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
          localStorage.removeItem(STORAGE_KEYS.ADMIN_USER);
        } catch {
          // ignore storage error
        }
      }
    }

    const customError = {
      message,
      status,
      errors: error.response?.data?.errors,
    };
    return Promise.reject(customError);
  }
);

export default apiClient;
