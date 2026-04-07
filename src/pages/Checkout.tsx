import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCart } from "../features/cart/context/CartContext";
import { placeOrder } from "../services/orders.service";
import { ApiError } from "../lib/ApiError";
import { checkoutSchema } from "../lib/schemas";
import type { CheckoutFormValues } from "../lib/schemas";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import FormError from "../components/ui/FormError";

const  Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [apiErrors, setApiErrors] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
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

  useEffect(() => {
    if (cart !== null && cart.items.length === 0)
      navigate("/cart", { replace: true });
  }, [cart, navigate]);

  if (!cart || cart.items.length === 0) return null;

  const onSubmit = async (values: CheckoutFormValues) => {
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

  const subtotal = Number(cart.total_price);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* ── Left: address form ── */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
              <h2 className="text-base font-bold text-gray-900">
                Delivery Address
              </h2>

              <FormError errors={apiErrors} />

              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  required
                  placeholder="John Smith"
                  error={errors.full_name?.message}
                  {...register("full_name")}
                />
                <Input
                  label="Phone"
                  required
                  placeholder="+971 50 000 0000"
                  error={errors.phone?.message}
                  {...register("phone")}
                />
              </div>

              <Input
                label="Street Address"
                required
                placeholder="Building, street name"
                error={errors.street?.message}
                {...register("street")}
              />

              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  label="City"
                  required
                  placeholder="Dubai"
                  error={errors.city?.message}
                  {...register("city")}
                />
                <Input
                  label="State / Emirate"
                  placeholder="Optional"
                  {...register("state")}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  label="Country"
                  required
                  placeholder="UAE"
                  error={errors.country?.message}
                  {...register("country")}
                />
                <Input
                  label="Postal Code"
                  placeholder="Optional"
                  {...register("postal_code")}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Delivery Notes
                  <span className="ml-1 text-gray-400 font-normal">(optional)</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Special delivery instructions…"
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-[#feee00] focus:ring-2 focus:ring-[#feee00]/30 transition resize-none"
                  {...register("notes")}
                />
              </div>
            </div>

            {/* ── Right: order summary ── */}
            <div className="lg:col-span-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-[120px]">
              <h2 className="text-base font-bold text-gray-900 mb-4">
                Order Summary
              </h2>

              <ul className="space-y-3 mb-4">
                {cart.items.map((item) => (
                  <li key={item.id} className="flex gap-3 items-start">
                    <img
                      src={item.product.image_url}
                      alt={item.product.name}
                      className="w-12 h-12 rounded-lg object-cover bg-gray-50 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 line-clamp-1">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 shrink-0">
                      {cart.currency} {item.subtotal}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{cart.currency} {cart.total_price}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
              </div>

              <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between font-bold text-gray-900">
                <span>Total</span>
                <span className="text-lg">{cart.currency} {subtotal.toFixed(2)}</span>
              </div>

              <Button type="submit" fullWidth loading={isSubmitting} className="mt-5">
                {isSubmitting ? "Placing Order…" : "Place Order"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
