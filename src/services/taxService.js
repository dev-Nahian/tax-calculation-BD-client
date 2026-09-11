import apiClient from './api';

export const calculateTaxEstimateApi = async (payload) => {
  return await apiClient.post('/tax/estimate', payload);
};

export const getTaxHistoryApi = async () => {
  return await apiClient.get('/tax/history');
};
