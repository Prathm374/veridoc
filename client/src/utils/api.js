import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export const login = (email, password) => api.post('/auth/login', { email, password });

export const register = (name, email, password, studentId, dateOfBirth, course, batch, phoneNumber) => 
  api.post('/auth/register', { name, email, password, studentId, dateOfBirth, course, batch, phoneNumber });

export const getCurrentUser = () => api.get('/auth/me');

export const updateUser = (userData) => api.patch('/auth/updateMe', userData);

export const uploadCertificates = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return api.post('/certificates/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getCertificate = (id) => api.get(`/certificates/${id}`);

export const downloadCertificate = (id) => api.get(`/certificates/${id}/download`, { responseType: 'blob' });

export const getCertificates = () => api.get('/certificates');

export const deleteCertificate = (id) => api.delete(`/certificates/${id}`);

export const getVerificationHistory = () => api.get('/certificates/verification/history');

export default api;