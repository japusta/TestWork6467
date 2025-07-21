import { persist } from 'zustand/middleware';
import create from 'zustand';
import api from '@/lib/api';
import { AuthResponse, User } from '@/lib/types';

interface AuthState {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      loading: false,
      error: null,

      login: async (username, password) => {
        set({ loading: true, error: null });
        try {
          // добавляем expiresInMins, типизируем под AuthResponse
          const { data } = await api.post<AuthResponse>('/auth/login', {
            username,
            password,
            expiresInMins: 60, //\в примере есть
          });

          set({
            token: data.accessToken,
            user: {
              id: data.id,
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
            },
            loading: false,
          });
        } catch (err: any) {
          set({
            error: err.response?.data?.message || 'Login failed',
            loading: false,
          });
          throw err;
        }
      },

      logout: () => {
        set({ token: null, user: null });
      },
    }),
    {
      name: 'dummyjson-auth',
      getStorage: () => localStorage,
    }
  )
);