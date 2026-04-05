import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { placeOrder } from "../api/ordersApi";
import type { CheckoutPayload } from "../api/ordersApi";
import { ApiError } from "../api/ApiError";

const EMPTY_FORM: CheckoutPayload = {
  full_name: "",
  phone: "",
  street: "",
  city: "",
  state: "",
  country: "UAE",
  postal_code: "",
  notes: "",
};

function Checkout() {
  const { cart, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState<CheckoutPayload>(EMPTY_FORM);
  const [errors, setErrors] = useState<
    Partial<Record<keyof CheckoutPayload | "general", string>>
  >({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) navigate("/sign-in", { replace: true });
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (cart !== null && cart.items.length === 0)
      navigate("/cart", { replace: true });
  }, [cart, navigate]);

  if (!cart || cart.items.length === 0) return null;

  const set =
    (field: keyof CheckoutPayload) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
      setErrors((er) => ({ ...er, [field]: undefined }));
    };

  const validate = (): boolean => {
    const e: typeof errors = {};
    if (!form.full_name.trim()) e.full_name = "Full name is required";
    if (!form.phone.trim()) e.phone = "Phone is required";
    if (!form.street.trim()) e.street = "Street address is required";
    if (!form.city.trim()) e.city = "City is required";
    if (!form.country.trim()) e.country = "Country is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const order = await placeOrder(form);
      await clearCart();
      navigate(`/orders/${order.id}`, { replace: true });
    } catch (err) {
      if (err instanceof ApiError && err.errors.length > 0) {
        setErrors({ general: err.errors.join(". ") });
      } else {
        setErrors({ general: "Something went wrong. Please try again." });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const subtotal = Number(cart.total_price);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* ── Left: address form ── */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
              <h2 className="text-base font-bold text-gray-900">
                Delivery Address
              </h2>

              {errors.general && (
                <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-600">
                  {errors.general}
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                <Field
                  label="Full Name"
                  required
                  value={form.full_name}
                  onChange={set("full_name")}
                  error={errors.full_name}
                  placeholder="John Smith"
                />
                <Field
                  label="Phone"
                  required
                  value={form.phone}
                  onChange={set("phone")}
                  error={errors.phone}
                  placeholder="+971 50 000 0000"
                />
              </div>

              <Field
                label="Street Address"
                required
                value={form.street}
                onChange={set("street")}
                error={errors.street}
                placeholder="Building, street name"
              />

              <div className="grid sm:grid-cols-2 gap-4">
                <Field
                  label="City"
                  required
                  value={form.city}
                  onChange={set("city")}
                  error={errors.city}
                  placeholder="Dubai"
                />
                <Field
                  label="State / Emirate"
                  value={form.state}
                  onChange={set("state")}
                  placeholder="Optional"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field
                  label="Country"
                  required
                  value={form.country}
                  onChange={set("country")}
                  error={errors.country}
                  placeholder="UAE"
                />
                <Field
                  label="Postal Code"
                  value={form.postal_code}
                  onChange={set("postal_code")}
                  placeholder="Optional"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Delivery Notes
                  <span className="ml-1 text-gray-400 font-normal">
                    (optional)
                  </span>
                </label>
                <textarea
                  value={form.notes}
                  onChange={set("notes")}
                  rows={3}
                  placeholder="Special delivery instructions…"
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-[#feee00] focus:ring-2 focus:ring-[#feee00]/30 transition resize-none"
                />
              </div>
            </div>

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
                      <p className="text-xs text-gray-400">
                        Qty: {item.quantity}
                      </p>
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
                  <span>
                    {cart.currency} {cart.total_price}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
              </div>

              <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between font-bold text-gray-900">
                <span>Total</span>
                <span className="text-lg">
                  {cart.currency} {subtotal.toFixed(2)}
                </span>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-5 w-full bg-[#feee00] text-black font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity text-sm disabled:opacity-60"
              >
                {submitting ? "Placing Order…" : "Place Order"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  value,
  onChange,
  error,
  placeholder,
}: {
  label: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-3 py-2.5 text-sm border rounded-xl outline-none transition focus:ring-2 focus:ring-[#feee00]/30 ${
          error
            ? "border-red-300 focus:border-red-400"
            : "border-gray-200 focus:border-[#feee00]"
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

export default Checkout;
