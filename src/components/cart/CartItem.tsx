import { Trash2 } from "lucide-react";
import type { CartItem } from "../../types";

interface Props {
  item: CartItem;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, amount: number) => void;
}

function CartItemRow({ item, removeFromCart, updateQuantity }: Props) {
  const lineTotal = item.product.price * item.quantity;

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex gap-4">
      {/* Image */}
      <img
        src={item.product.image}
        alt={item.product.title}
        className="w-24 h-24 object-cover rounded-lg shrink-0 bg-gray-50"
      />

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2">
          {item.product.title}
        </h3>

        <span className="inline-block mt-1 text-xs font-medium text-green-600">
          In Stock
        </span>

        <p className="mt-0.5 text-sm text-gray-500">
          ${item.product.price.toFixed(2)} / unit
        </p>

        {/* Controls */}
        <div className="mt-3 flex items-center gap-4">
          {/* Quantity stepper */}
          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden select-none">
            <button
              onClick={() => updateQuantity(item.product.id, -1)}
              className="w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors font-medium text-lg"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="w-10 text-center text-sm font-semibold border-x border-gray-300 py-1">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.product.id, 1)}
              className="w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors font-medium text-lg"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          {/* Remove */}
          <button
            onClick={() => removeFromCart(item.product.id)}
            className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 transition-colors font-medium"
          >
            <Trash2 size={13} />
            Remove
          </button>
        </div>
      </div>

      {/* Line total */}
      <div className="shrink-0 text-right self-start pt-1">
        <p className="text-lg font-bold text-gray-900">${lineTotal.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default CartItemRow;
