// hooks/useAuth.ts
import { persist } from 'zustand/middleware';
import create from 'zustand';
import api from '@/lib/api';
import { AuthResponse, User } from '@/lib/types';
// удалили неиспользуемый импорт useCart

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
        } catch (err: unknown) {
          // аккуратно сузим тип и извлечём сообщение, если это AxiosError
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

      logout: () => {
        set({ token: null, user: null });
        // если нужно очищать корзину при логауте, раскомментируйте:
        // useCart.getState().clearCart();
      },
    }),
    {
      name: 'dummyjson-auth',
      getStorage: () => localStorage,
    },
  ),
);
