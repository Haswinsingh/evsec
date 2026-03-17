import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

export const loginUser = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const getLatestSensorData = async () => {
  const response = await api.get('/sensors/latest');
  return response.data;
};

export const getAlerts = async () => {
  const response = await api.get('/sensors/alerts');
  return response.data;
};

export const getHistory = async () => {
  const response = await api.get('/sensors/history');
  return response.data;
};

export default api;
