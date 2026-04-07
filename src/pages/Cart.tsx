import CartItemRow from "../components/cart/CartItem";
import EmptyCart from "../components/cart/EmptyCart";
import OrderSummary from "../components/cart/OrderSummary";
import { useCart } from "../features/cart/context/CartContext";
import { useAuth } from "../features/auth/context/AuthContext";
import { pluralise } from "../lib/utils";
import Button from "../components/ui/Button";

const Cart = () => {
  const { cart, loading, removeFromCart, updateQuantity, clearCart } = useCart();
  const { isAuthenticated } = useAuth();

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
              ({pluralise(cart.total_items, "item")})
            </span>
          </h1>
          <Button variant="danger" size="sm" onClick={clearCart}>
            Clear cart
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 items-start">
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

          <div className="lg:col-span-1">
            <OrderSummary
              totalItems={cart.total_items}
              currency={cart.currency}
              totalPrice={cart.total_price}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
