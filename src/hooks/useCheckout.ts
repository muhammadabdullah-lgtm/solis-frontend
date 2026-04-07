import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCart } from "../features/cart/hooks/useCart";
import { placeOrder } from "../services/orders.service";
import { ApiError } from "../lib/ApiError";
import { checkoutSchema } from "../lib/schemas";
import type { CheckoutFormValues } from "../lib/schemas";

export function useCheckout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [apiErrors, setApiErrors] = useState<string[]>([]);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      full_name: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      country: "UAE",
      postal_code: "",
      notes: "",
    },
  });

  // Redirect if cart is empty
  useEffect(() => {
    if (cart !== null && cart.items.length === 0) {
      navigate("/cart", { replace: true });
    }
  }, [cart, navigate]);

  const handleSubmit = async (values: CheckoutFormValues) => {
    setApiErrors([]);
    try {
      const order = await placeOrder(values);
      await clearCart();
      navigate(`/orders/${order.id}`, { replace: true });
    } catch (err) {
      if (err instanceof ApiError) {
        setApiErrors(err.errors.length > 0 ? err.errors : [err.message]);
      } else {
        setApiErrors(["Something went wrong. Please try again."]);
      }
    }
  };

  return {
    cart,
    apiErrors,
    form,
    isSubmitting: form.formState.isSubmitting,
    errors: form.formState.errors,
    register: form.register,
    onSubmit: form.handleSubmit(handleSubmit),
    isCartEmpty: !cart || cart.items.length === 0,
    subtotal: cart ? Number(cart.total_price) : 0,
  };
}
