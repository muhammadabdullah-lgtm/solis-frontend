import { useState } from "react";
import { Trash2 } from "lucide-react";
import type { ApiCartItem } from "../../services/cart.service";
import QuantityStepper from "../common/QuantityStepper";
import StockBadge from "../common/StockBadge";
import Button from "../ui/Button";

interface Props {
  item: ApiCartItem;
  removeFromCart: (itemId: number) => Promise<void>;
  updateQuantity: (itemId: number, quantity: number) => Promise<void>;
}

const CartItemRow = ({ item, removeFromCart, updateQuantity }: Props) => {
  const [busy, setBusy] = useState(false);

  const withBusy = async (action: () => Promise<void>) => {
    if (busy) return;
    setBusy(true);
    try {
      await action();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      className={`bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex gap-4 transition-opacity ${
        busy ? "opacity-60 pointer-events-none" : ""
      }`}
    >
      <img
        src={item.product.image_url}
        alt={item.product.name}
        className="w-24 h-24 object-cover rounded-lg shrink-0 bg-gray-50"
      />

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2">
          {item.product.name}
        </h3>

        <div className="mt-1">
          <StockBadge inStock={item.product.in_stock} />
        </div>

        <p className="mt-0.5 text-sm text-gray-500">{item.product.price} / unit</p>

        <div className="mt-3 flex items-center gap-4">
          <QuantityStepper
            quantity={item.quantity}
            max={item.product.stock_quantity}
            size="sm"
            onChange={(qty) => withBusy(() => updateQuantity(item.id, qty))}
          />

          <Button
            variant="danger"
            size="sm"
            onClick={() => withBusy(() => removeFromCart(item.id))}
          >
            <Trash2 size={13} />
            Remove
          </Button>
        </div>
      </div>

      <div className="shrink-0 text-right self-start pt-1">
        <p className="text-lg font-bold text-gray-900">{item.subtotal}</p>
      </div>
    </div>
  );
};

export default CartItemRow;
