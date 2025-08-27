import { persist } from 'zustand/middleware';
import create from 'zustand';
import api from '@/lib/api';
import { AuthResponse, User } from '@/lib/types';

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  refreshAccessToken: () => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      refreshToken: null,
      user: null,
      loading: false,
      error: null,

      login: async (username, password) => {
        set({ loading: true, error: null });
        try {
          const { data } = await api.post<AuthResponse>('/auth/login', {
            username,
            password,
            expiresInMins: 60,
          });

          set({
            token: data.accessToken,
            refreshToken: data.refreshToken,
            user: {
              id: data.id,
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
            },
            loading: false,
          });
        } catch (err: unknown) {
          let message = 'Login failed';
          if (typeof err === 'object' && err !== null) {
            const axiosErr = err as { response?: { data?: { message?: string } } };
            if (axiosErr.response?.data?.message) {
              message = axiosErr.response.data.message;
            }
          }

          set({
            error: message,
            loading: false,
          });
          throw err;
        }
      },

      refreshAccessToken: async () => {
        const { refreshToken } = get();
        if (!refreshToken) return;

        try {
          const { data } = await api.post<AuthResponse>('/auth/refresh', {
            refreshToken,
          });

          set({
            token: data.accessToken,
            refreshToken: data.refreshToken ?? refreshToken,
          });
        } catch (err) {
          set({ token: null, refreshToken: null, user: null });
          throw err;
        }
      },

      logout: () => {
        set({ token: null, refreshToken: null, user: null });
      },
    }),
    {
      name: 'dummyjson-auth',
      getStorage: () => localStorage,
    },
  ),
);
