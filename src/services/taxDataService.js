import apiClient from './api';

export const getTaxYearsApi = async () => {
  return await apiClient.get('/rules/years');
};

export const getTaxRulesByYearApi = async (year = '2024-2025') => {
  return await apiClient.get(`/rules/${year}`);
};

export const getTaxSourcesByYearApi = async (year = '2024-2025') => {
  return await apiClient.get('/rules/sources');
};

export const getAdminTaxRulesOverviewApi = async () => {
  return await apiClient.get('/admin/overview');
};

export const updateTaxYearStatusApi = async (year, status) => {
  return await apiClient.patch(`/admin/tax-rules/${year}/status`, { status });
};

export const verifyTaxYearApi = async (year, note) => {
  return await apiClient.post(`/admin/tax-rules/${year}/verify`, { note });
};

