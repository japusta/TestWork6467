// hooks/useAuth.ts
import { persist } from 'zustand/middleware';
import create from 'zustand';
import api from '@/lib/api';
import { AuthResponse, User } from '@/lib/types';
import { useCart } from '@/hooks/useCart';   // <-- импортируем

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
          const { data } = await api.post<AuthResponse>('/auth/login', {
            username,
            password,
            expiresInMins: 60,
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
        // сбрасываем токен и пользователя
        set({ token: null, user: null });
        // и очищаем корзину текущего пользователя
        // useCart.getState().clearCart();
      },
    }),
    {
      name: 'dummyjson-auth',
      getStorage: () => localStorage,
    }
  )
);
