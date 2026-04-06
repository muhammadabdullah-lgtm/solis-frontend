import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
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

  const optimistic = async (
    updater: (prev: ApiCart) => ApiCart,
    apiCall: () => Promise<unknown>,
  ) => {
    if (!cart) return;

    const snapshot = cart;
    setCart(updater(cart));

    try {
      await apiCall();
      const fresh = await getCart();
      setCart(fresh);
    } catch {
      setCart(snapshot); // roll back on failure
    }
  };

  const addToCart = async (productId: number, quantity = 1) => {
    if (!cart) return;

    await optimistic(
      (prev) => ({ ...prev, total_items: prev.total_items + quantity }),
      () => addCartItem(productId, quantity),
    );
  };

  const removeFromCart = async (itemId: number) => {
    if (!cart) return;

    const removedItem = cart.items.find((i) => i.id === itemId);
    if (!removedItem) return;

    await optimistic(
      (prev) => ({
        ...prev,
        items: prev.items.filter((i) => i.id !== itemId),
        total_items: prev.total_items - removedItem.quantity,
        total_price: (
          Number(prev.total_price) -
          Number(removedItem.unit_price) * removedItem.quantity
        ).toFixed(2),
      }),
      () => removeCartItem(itemId),
    );
  };

  const updateQuantity = async (itemId: number, quantity: number) => {
    if (quantity < 1 || !cart) return;

    const item = cart.items.find((i) => i.id === itemId);
    if (!item) return;

    const qtyDiff = quantity - item.quantity;

    await optimistic(
      (prev) => ({
        ...prev,
        items: prev.items.map((i) =>
          i.id === itemId
            ? {
                ...i,
                quantity,
                subtotal: (Number(i.unit_price) * quantity).toFixed(2),
              }
            : i,
        ),
        total_items: prev.total_items + qtyDiff,
        total_price: (
          Number(prev.total_price) +
          Number(item.unit_price) * qtyDiff
        ).toFixed(2),
      }),
      () => updateCartItem(itemId, quantity),
    );
  };

  const clearCart = async () => {
    if (!cart) return;

    await optimistic(
      (prev) => ({ ...prev, items: [], total_items: 0, total_price: "0.00" }),
      () => clearCartApi(),
    );
  };

  const cartCount = cart?.total_items ?? 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
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
