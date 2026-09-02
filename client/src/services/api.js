import axios from 'axios';

// Deployed backend URL
const API_URL = 'https://evsec-sl2j.vercel.app/api';

// Create Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Login
export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/auth/login', {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Register
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);

    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

// Get latest sensor data
export const getLatestSensorData = async () => {
  try {
    const response = await api.get('/sensors/latest');

    return response.data;
  } catch (error) {
    console.error('Error fetching latest sensor data:', error);
    throw error;
  }
};

// Get alerts
export const getAlerts = async () => {
  try {
    const response = await api.get('/sensors/alerts');

    return response.data;
  } catch (error) {
    console.error('Error fetching alerts:', error);
    throw error;
  }
};

// Get sensor history
export const getHistory = async () => {
  try {
    const response = await api.get('/sensors/history');

    return response.data;
  } catch (error) {
    console.error('Error fetching sensor history:', error);
    throw error;
  }
};

// Export Axios instance
export default api;
