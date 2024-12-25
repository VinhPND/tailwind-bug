import axios from 'axios'

const API_URL = import.meta.env.VITE_APP_API_BASE_URL;

export const apiClient = axios.create({
  baseURL: API_URL,
});

// Interceptor để cập nhật Authorization header trước mỗi request
apiClient.interceptors.request.use(config => {
  const token = sessionStorage.getItem('TokenApi') || '';
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
}, error => {
  return Promise.reject(error);
});