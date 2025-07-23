// hooks/useCart.ts
import create from 'zustand';
import { useAuth } from '@/hooks/useAuth';
import { Product } from '@/lib/types';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
  totalCount: () => number;
  totalPrice: () => number;
}

const getStorageKey = (userId?: number) =>
  userId != null ? `dummyjson-cart-${userId}` : 'dummyjson-cart-guest';

export const useCart = create<CartState>((set, get) => ({
  items: [],

  addItem: (product) => {
    const items = [...get().items];
    const idx = items.findIndex((it) => it.product.id === product.id);
    if (idx > -1) {
      items[idx].quantity++;
    } else {
      items.push({ product, quantity: 1 });
    }
    set({ items });
  },

  removeItem: (productId) => {
    let items = [...get().items];
    const idx = items.findIndex((it) => it.product.id === productId);
    if (idx > -1) {
      items[idx].quantity--;
      if (items[idx].quantity <= 0) {
        items = items.filter((it) => it.product.id !== productId);
      }
    }
    set({ items });
  },

  clearCart: () => {
    set({ items: [] });
  },

  totalCount: () =>
    get().items.reduce((sum, it) => sum + it.quantity, 0),

  totalPrice: () =>
    get().items.reduce((sum, it) => sum + it.quantity * it.product.price, 0),
}));

// 1) Подписываемся на любые изменения items → сохраняем в localStorage
const saveCartToStorage = (items: CartItem[]) => {
  const userId = useAuth.getState().user?.id;
  const key = getStorageKey(userId);
  try {
    localStorage.setItem(key, JSON.stringify(items));
  } catch {}
};

// subscribe
useCart.subscribe((state) => {
  saveCartToStorage(state.items);
});
// ручной вызов сразу же после подписки (fireImmediately)
saveCartToStorage(useCart.getState().items);

// 2) Подписываемся на изменение user → подгружаем свою корзину из localStorage
const loadCartFromStorage = (userId?: number) => {
  const key = getStorageKey(userId);
  let items: CartItem[] = [];
  try {
    const raw = localStorage.getItem(key);
    if (raw) items = JSON.parse(raw);
  } catch {}
  useCart.setState({ items });
};

useAuth.subscribe((authState) => {
  loadCartFromStorage(authState.user?.id);
});
// и сразу один раз загрузим на старте
loadCartFromStorage(useAuth.getState().user?.id);
