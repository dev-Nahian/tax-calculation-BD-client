import apiClient from './api';

export const registerUserApi = async (userData) => {
  return await apiClient.post('/auth/register', userData);
};

export const loginUserApi = async (credentials) => {
  return await apiClient.post('/auth/login', credentials);
};

export const getCurrentUserApi = async () => {
  return await apiClient.get('/auth/me');
};
