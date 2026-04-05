import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ChevronLeft, MapPin } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getOrder, cancelOrder } from "../api/ordersApi";
import type { OrderDetail as IOrderDetail } from "../api/ordersApi";
import { StatusBadge } from "./Orders";

function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [order, setOrder] = useState<IOrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/sign-in", { replace: true });
      return;
    }
    if (!id) return;
    setLoading(true);
    setError(false);
    getOrder(Number(id))
      .then((data) => setOrder(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id, isAuthenticated]);

  const handleCancel = async () => {
    if (!order) return;
    setCancelling(true);
    try {
      const updated = await cancelOrder(order.id);
      setOrder(updated);
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 py-8 space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 h-24 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center space-y-3">
          <p className="text-4xl">😕</p>
          <p className="text-gray-500 text-sm">Order not found or failed to load.</p>
          <button
            onClick={() => navigate("/orders")}
            className="text-sm font-medium text-gray-700 hover:text-black underline underline-offset-2"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  const addr = order.delivery_address;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 lg:px-8 py-8 space-y-6">
        {/* Back */}
        <button
          onClick={() => navigate("/orders")}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-black transition-colors"
        >
          <ChevronLeft size={15} /> Back to Orders
        </button>

        {/* Header */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h1 className="text-lg font-bold text-gray-900">Order #{order.id}</h1>
              <StatusBadge status={order.status} />
            </div>
            <p className="text-xs text-gray-400">
              Placed on{" "}
              {new Date(order.created_at).toLocaleDateString("en-AE", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          {order.status === "pending" && (
            <button
              onClick={handleCancel}
              disabled={cancelling}
              className="text-sm font-semibold px-4 py-2 border border-red-300 text-red-500 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-60"
            >
              {cancelling ? "Cancelling…" : "Cancel Order"}
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Delivery address */}
          <div className="md:col-span-1 bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5">
            <div className="flex items-center gap-2 mb-3">
              <MapPin size={15} className="text-gray-400" />
              <h2 className="text-sm font-bold text-gray-900">Delivery Address</h2>
            </div>
            <div className="text-sm text-gray-700 space-y-0.5">
              <p className="font-semibold">{addr.full_name}</p>
              <p>{addr.phone}</p>
              <p>{addr.street}</p>
              <p>
                {addr.city}
                {addr.state ? `, ${addr.state}` : ""}
              </p>
              <p>{addr.country}{addr.postal_code ? ` ${addr.postal_code}` : ""}</p>
            </div>
            {order.notes && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-500 font-medium mb-1">Notes</p>
                <p className="text-sm text-gray-600">{order.notes}</p>
              </div>
            )}
          </div>

          {/* Items */}
          <div className="md:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5">
            <h2 className="text-sm font-bold text-gray-900 mb-4">
              Items ({order.items.length})
            </h2>

            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4 items-start">
                  <Link to={`/products/${item.product.id}`}>
                    <img
                      src={item.product_image_url}
                      alt={item.product_name}
                      className="w-16 h-16 rounded-xl object-cover bg-gray-50 shrink-0 hover:opacity-90 transition-opacity"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/products/${item.product.id}`}
                      className="text-sm font-semibold text-gray-900 hover:text-black line-clamp-2"
                    >
                      {item.product_name}
                    </Link>
                    <p className="text-xs text-gray-400 mt-0.5">
                      SKU: {item.product_sku}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {order.currency} {item.unit_price} × {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-bold text-gray-900 shrink-0">
                    {order.currency} {item.subtotal}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 mt-5 pt-4 flex justify-between items-center">
              <span className="text-sm font-semibold text-gray-700">Total</span>
              <span className="text-xl font-black text-gray-900">
                {order.currency} {order.total_price}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
