import axios from 'axios';
import { useAuth } from '@/hooks/useAuth';

const api = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// токен в заголовок Authorization
api.interceptors.request.use((config) => {
  const token = useAuth.getState().token;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// перехват 401  обновляем токен и повторяем запрос
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        await useAuth.getState().refreshAccessToken();
        const token = useAuth.getState().token;
        if (token && error.config) {
          error.config.headers.Authorization = `Bearer ${token}`;
          return api.request(error.config);
        }
      } catch {
        useAuth.getState().logout();
      }
    }
    return Promise.reject(error);
  },
);

export default api;
