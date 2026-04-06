import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import { useAuth } from "../../auth/context/AuthContext";
import {
  getCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
  clearCartApi,
} from "../../../services/cart.service";
import type { ApiCart } from "../../../services/cart.service";

interface CartContextValue {
  cart: ApiCart | null;
  cartCount: number;
  loading: boolean;
  addToCart: (productId: number, quantity?: number) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
  updateQuantity: (itemId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState<ApiCart | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getCart();
      setCart(data);
    } catch {
      setCart(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      setCart(null);
    }
  }, [isAuthenticated, fetchCart]);

  const addToCart = async (productId: number, quantity = 1) => {
    await addCartItem(productId, quantity);
    await fetchCart();
  };

  const removeFromCart = async (itemId: number) => {
    await removeCartItem(itemId);
    await fetchCart();
  };

  const updateQuantity = async (itemId: number, quantity: number) => {
    if (quantity < 1) return;
    await updateCartItem(itemId, quantity);
    await fetchCart();
  };

  const clearCart = async () => {
    await clearCartApi();
    await fetchCart();
  };

  const cartCount = cart?.total_items ?? 0;

  return (
    <CartContext.Provider
      value={{ cart, cartCount, loading, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
