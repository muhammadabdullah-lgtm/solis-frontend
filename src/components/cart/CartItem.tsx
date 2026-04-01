import type { CartItem } from "../../types";

interface Props {
  item: CartItem;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, amount: number) => void;
}

function CartItemRow({ item, removeFromCart, updateQuantity }: Props) {


    

  return (
    <div className="flex items-center justify-between border p-4 rounded-md">
      
      {/* Left */}
      <div className="flex items-center gap-4">
        <img
          src={item.product.image}
          className="w-20 h-20 object-cover"
        />
        <div>
          <h2 className="font-medium">{item.product.title}</h2>
          <p>${item.product.price}</p>
        </div>
      </div>

      {/* Quantity */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQuantity(item.product.id, -1)}
          className="px-2 bg-gray-200"
        >
          -
        </button>

        <span>{item.quantity}</span>

        <button
          onClick={() => updateQuantity(item.product.id, 1)}
          className="px-2 bg-gray-200"
        >
          +
        </button>
      </div>

      {/* Remove */}
      <button
        onClick={() => removeFromCart(item.product.id)}
        className="text-red-500"
      >
        Remove
      </button>
    </div>
  );
}

export default CartItemRow;