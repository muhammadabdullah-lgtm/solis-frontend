import { Link } from "react-router-dom";
import type { OrderStatus } from "../services/orders.service";
import { useOrders } from "../hooks/useOrders";
import SectionError from "../components/ui/SectionError";
import SectionEmpty from "../components/ui/SectionEmpty";

const STATUS_STYLES: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const  Orders = () => {
  const { orders, loading, error, retry } = useOrders();

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h1>

        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 h-24 animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <SectionError onRetry={retry} />
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <SectionEmpty icon="📦" message="You haven't placed any orders yet." />
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0"
              >
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-gray-900">
                      Order #{order.id}
                    </span>
                    <StatusBadge status={order.status} />
                  </div>
                  <p className="text-xs text-gray-400">
                    {new Date(order.created_at).toLocaleDateString("en-AE", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-xs text-gray-500">
                    {order.total_items} {order.total_items === 1 ? "item" : "items"}
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-base font-bold text-gray-900">
                    {order.currency} {order.total_price}
                  </span>
                  <Link
                    to={`/orders/${order.id}`}
                    className="text-sm font-semibold px-4 py-2 bg-[#feee00] text-black rounded-lg hover:opacity-90 transition-opacity"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span
      className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${STATUS_STYLES[status]}`}
    >
      {status}
    </span>
  );
}

export default Orders;
