import { useNavigate } from "react-router-dom";
import CartItemRow from "../components/cart/CartItem";
import EmptyCart from "../components/cart/EmptyCart";
import { useCart } from "../features/cart/context/CartContext";
import { useAuth } from "../features/auth/context/AuthContext";

function Cart() {
  const { cart, loading, removeFromCart, updateQuantity, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) return <EmptyCart />;

  if (loading && !cart) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <p className="text-gray-400 text-sm animate-pulse">Loading cart…</p>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) return <EmptyCart />;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            My Cart{" "}
            <span className="text-gray-400 font-normal text-base">
              ({cart.total_items} {cart.total_items === 1 ? "item" : "items"})
            </span>
          </h1>
          <button
            onClick={clearCart}
            className="text-xs text-red-500 hover:text-red-600 font-medium transition-colors"
          >
            Clear cart
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 items-start">
          {/* Left: Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <CartItemRow
                key={item.id}
                item={item}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
              />
            ))}
          </div>

          {/* Right: Order summary */}
          <div className="lg:col-span-1 bg-white rounded-xl border border-gray-100 shadow-sm p-5 sticky top-[130px]">
            <h2 className="text-base font-bold text-gray-900 mb-4">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>
                  Subtotal ({cart.total_items}{" "}
                  {cart.total_items === 1 ? "item" : "items"})
                </span>
                <span className="font-semibold text-gray-900">
                  {cart.currency} {cart.total_price}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span className="font-semibold text-green-600">Free</span>
              </div>
            </div>

            <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between items-center font-bold text-gray-900">
              <span>Total</span>
              <span className="text-xl">
                {cart.currency} {cart.total_price}
              </span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="mt-5 w-full bg-[#feee00] text-black font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity text-sm"
            >
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
