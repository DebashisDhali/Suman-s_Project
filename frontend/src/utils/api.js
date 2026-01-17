import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const BASE_URL = API_URL.replace('/api', '');

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Plant APIs
export const plantAPI = {
  getAll: (params) => api.get('/plants', { params }),
  getById: (id) => api.get(`/plants/${id}`),
  getStats: () => api.get('/plants/stats'),
  getFamilies: () => api.get('/plants/families/list'),
};

// Admin APIs
export const adminAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (data) => api.post('/auth/register', data),
  getMe: () => api.get('/auth/me'),
  getDashboard: () => api.get('/admin/dashboard'),
  createPlant: (formData) => api.post('/admin/plants', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  updatePlant: (id, formData) => api.put(`/admin/plants/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  deletePlant: (id) => api.delete(`/admin/plants/${id}`),
};

export default api;
