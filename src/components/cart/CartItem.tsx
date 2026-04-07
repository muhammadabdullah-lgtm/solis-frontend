import { useState } from "react";
import { Trash2 } from "lucide-react";
import type { ApiCartItem } from "../../services/cart.service";

interface Props {
  item: ApiCartItem;
  removeFromCart: (itemId: number) => Promise<void>;
  updateQuantity: (itemId: number, quantity: number) => Promise<void>;
}

const CartItemRow = ({ item, removeFromCart, updateQuantity }: Props) => {
  const [busy, setBusy] = useState(false);

  const handleUpdate = async (newQty: number) => {
    if (newQty < 1 || busy) return;
    setBusy(true);
    try {
      await updateQuantity(item.id, newQty);
    } finally {
      setBusy(false);
    }
  };

  const handleRemove = async () => {
    if (busy) return;
    setBusy(true);
    try {
      await removeFromCart(item.id);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      className={`bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex gap-4 transition-opacity ${busy ? "opacity-60 pointer-events-none" : ""}`}
    >

      <img
        src={item.product.image_url}
        alt={item.product.name}
        className="w-24 h-24 object-cover rounded-lg shrink-0 bg-gray-50"
      />

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2">
          {item.product.name}
        </h3>

        <span
          className={`inline-block mt-1 text-xs font-medium ${
            item.product.in_stock ? "text-green-600" : "text-red-500"
          }`}
        >
          {item.product.in_stock ? "In Stock" : "Out of Stock"}
        </span>

        <p className="mt-0.5 text-sm text-gray-500">
          {item.product.price} / unit
        </p>

        {/* Controls */}
        <div className="mt-3 flex items-center gap-4">
          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden select-none">
            <button
              onClick={() => handleUpdate(item.quantity - 1)}
              className="w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors font-medium text-lg"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="w-10 text-center text-sm font-semibold border-x border-gray-300 py-1">
              {item.quantity}
            </span>
            <button
              onClick={() => handleUpdate(item.quantity + 1)}
              disabled={item.quantity >= item.product.stock_quantity}
              className="w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors font-medium text-lg disabled:opacity-40"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <button
            onClick={handleRemove}
            className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 transition-colors font-medium"
          >
            <Trash2 size={13} />
            Remove
          </button>
        </div>
      </div>

      {/* Line total */}
      <div className="shrink-0 text-right self-start pt-1">
        <p className="text-lg font-bold text-gray-900">{item.subtotal}</p>
      </div>
    </div>
  );
}

export default CartItemRow;
