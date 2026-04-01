import type { CartItem } from "../types";
import CartItemRow from "../components/cart/CartItem";
import EmptyCart from "../components/cart/EmptyCart";

interface CartProps {
  cart: CartItem[];
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, amount: number) => void;
}

function Cart({ cart, removeFromCart, updateQuantity }: CartProps) {


     if (cart.length === 0) {
    return <EmptyCart />;
  }

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <CartItemRow
                key={item.product.id}
                item={item}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
              />
            ))}
          </div>

          <div className="mt-6 text-right text-xl font-semibold">
            Total: ${total}
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;