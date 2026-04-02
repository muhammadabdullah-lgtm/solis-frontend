import { useNavigate } from "react-router-dom";
import CartItemRow from "../components/cart/CartItem";
import EmptyCart from "../components/cart/EmptyCart";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) return <EmptyCart />;

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const deliveryFee = 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          My Cart{" "}
          <span className="text-gray-400 font-normal text-base">
            ({itemCount} {itemCount === 1 ? "item" : "items"})
          </span>
        </h1>

        <div className="grid lg:grid-cols-3 gap-6 items-start">
          {/* ── Left: Cart items ── */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <CartItemRow
                key={item.product.id}
                item={item}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
              />
            ))}
          </div>

          {/* ── Right: Order summary ── */}
          <div className="lg:col-span-1 bg-white rounded-xl border border-gray-100 shadow-sm p-5 sticky top-[130px]">
            <h2 className="text-base font-bold text-gray-900 mb-4">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})</span>
                <span className="font-semibold text-gray-900">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span className="font-semibold text-green-600">Free</span>
              </div>
            </div>

            <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between items-center font-bold text-gray-900">
              <span>Total</span>
              <span className="text-xl">${total.toFixed(2)}</span>
            </div>

            <button className="mt-5 w-full bg-[#feee00] text-black font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity text-sm">
              Proceed to Checkout
            </button>

            <button
              onClick={() => navigate("/")}
              className="mt-3 w-full text-center text-sm text-gray-500 hover:text-black transition-colors py-1"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
