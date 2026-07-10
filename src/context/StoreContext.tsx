import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { CartItem } from '../types';

interface Toast { id: number; message: string; tone: 'success' | 'info' | 'error' }

interface StoreValue {
  cart: CartItem[];
  favorites: string[];
  cartOpen: boolean;
  toasts: Toast[];
  setCartOpen: (open: boolean) => void;
  addToCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  toggleFavorite: (productId: string) => void;
  notify: (message: string, tone?: Toast['tone']) => void;
}

const StoreContext = createContext<StoreValue | null>(null);

function readLocal<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) as T : fallback;
  } catch { return fallback; }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => readLocal('neko-cart', []));
  const [favorites, setFavorites] = useState<string[]>(() => readLocal('neko-favorites', []));
  const [cartOpen, setCartOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const persistCart = useCallback((next: CartItem[]) => {
    setCart(next);
    localStorage.setItem('neko-cart', JSON.stringify(next));
  }, []);

  const notify = useCallback((message: string, tone: Toast['tone'] = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((current) => [...current, { id, message, tone }]);
    window.setTimeout(() => setToasts((current) => current.filter((toast) => toast.id !== id)), 3500);
  }, []);

  const addToCart = useCallback((productId: string) => {
    setCart((current) => {
      const found = current.find((item) => item.productId === productId);
      const next = found
        ? current.map((item) => item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item)
        : [...current, { productId, quantity: 1 }];
      localStorage.setItem('neko-cart', JSON.stringify(next));
      return next;
    });
    notify('Item acolhido no seu pedido.');
  }, [notify]);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      persistCart(cart.filter((item) => item.productId !== productId));
      return;
    }
    persistCart(cart.map((item) => item.productId === productId ? { ...item, quantity } : item));
  }, [cart, persistCart]);

  const removeFromCart = useCallback((productId: string) => {
    persistCart(cart.filter((item) => item.productId !== productId));
    notify('Item removido do pedido.', 'info');
  }, [cart, notify, persistCart]);

  const clearCart = useCallback(() => persistCart([]), [persistCart]);

  const toggleFavorite = useCallback((productId: string) => {
    setFavorites((current) => {
      const isFavorite = current.includes(productId);
      const next = isFavorite ? current.filter((id) => id !== productId) : [...current, productId];
      localStorage.setItem('neko-favorites', JSON.stringify(next));
      notify(isFavorite ? 'Removido dos favoritos.' : 'Guardado nos favoritos.', 'info');
      return next;
    });
  }, [notify]);

  const value = useMemo(() => ({
    cart, favorites, cartOpen, toasts, setCartOpen, addToCart, updateQuantity,
    removeFromCart, clearCart, toggleFavorite, notify,
  }), [cart, favorites, cartOpen, toasts, addToCart, updateQuantity, removeFromCart, clearCart, toggleFavorite, notify]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore deve ser usado dentro de StoreProvider');
  return context;
}
