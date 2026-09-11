import apiClient from './api';

export const fetchAllRulesApi = async () => {
  return await apiClient.get('/rules');
};

export const fetchRuleByYearApi = async (year) => {
  return await apiClient.get(`/rules/${year}`);
};
