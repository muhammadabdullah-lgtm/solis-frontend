import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  addCartItem,
  clearCartApi,
  getCart,
  removeCartItem,
  updateCartItem,
} from "../../../services/cart.service";
import type { ApiCart } from "../../../services/cart.service";
import {
  fetchCartError,
  fetchCartStart,
  fetchCartSuccess,
  setCart,
} from "../store/cart.actions";

export function useCart() {
  const dispatch = useAppDispatch();
  const { cart, cartCount, loading } = useAppSelector((state) => state.cart);

  const refreshCart = async () => {
    dispatch(fetchCartStart());

    try {
      const data = await getCart();
      dispatch(fetchCartSuccess(data));
    } catch {
      dispatch(fetchCartError());
    }
  };

  const optimistic = async (
    updater: (prev: ApiCart) => ApiCart,
    apiCall: () => Promise<unknown>,
  ) => {
    if (!cart) return;

    const snapshot = cart;
    dispatch(setCart(updater(cart)));

    try {
      await apiCall();
      const fresh = await getCart();
      dispatch(fetchCartSuccess(fresh));
    } catch {
      dispatch(setCart(snapshot));
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

    const removedItem = cart.items.find((item) => item.id === itemId);
    if (!removedItem) return;

    await optimistic(
      (prev) => ({
        ...prev,
        items: prev.items.filter((item) => item.id !== itemId),
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

    const item = cart.items.find((entry) => entry.id === itemId);
    if (!item) return;

    const qtyDiff = quantity - item.quantity;

    await optimistic(
      (prev) => ({
        ...prev,
        items: prev.items.map((entry) =>
          entry.id === itemId
            ? {
                ...entry,
                quantity,
                subtotal: (Number(entry.unit_price) * quantity).toFixed(2),
              }
            : entry,
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

  return {
    cart,
    cartCount,
    loading,
    refreshCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
}
