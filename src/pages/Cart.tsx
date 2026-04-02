import CartItemRow from "../components/cart/CartItem";
import EmptyCart from "../components/cart/EmptyCart";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  if (cart.length === 0) return <EmptyCart />;

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
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
        Total: ${total.toFixed(2)}
      </div>
    </div>
  );
}

export default Cart;
