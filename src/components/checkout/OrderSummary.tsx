import Button from "../ui/Button";
// import type { Cart } from "../../features/cart/context/CartContext"; // adjust path as needed
// import type {Cart} from "../../features/cart/context/CartContext"

type OrderSummaryProps = {
  cart: any;
  subtotal: number;
  isSubmitting: boolean;
};

export const OrderSummary = ({ cart, subtotal, isSubmitting }: OrderSummaryProps) => {
  return (
    <div className="lg:col-span-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-[120px]">
      <h2 className="text-base font-bold text-gray-900 mb-4">Order Summary</h2>

      <ul className="space-y-3 mb-4">
        {cart.items.map((item:any) => (
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
  );
};