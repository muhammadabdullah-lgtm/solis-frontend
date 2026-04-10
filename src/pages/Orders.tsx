import { Link } from "react-router-dom";
import { useOrders } from "../hooks/useOrders";
import { formatDate, pluralise } from "../lib/utils";
import SectionError from "../components/ui/SectionError";
import SectionEmpty from "../components/ui/SectionEmpty";
import StatusBadge from "../components/common/StatusBadge";
import Card from "../components/ui/Card";
import Layout from "../components/layout";

const Orders = () => {
  const { orders, loading, error, retry } = useOrders();

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h1>

          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-gray-100 h-24 animate-pulse"
                />
              ))}
            </div>
          ) : error ? (
            <SectionError onRetry={retry} />
          ) : orders.length === 0 ? (
            <Card rounded="2xl">
              <SectionEmpty
                icon="📦"
                message="You haven't placed any orders yet."
              />
            </Card>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <Card
                  key={order.id}
                  rounded="2xl"
                  className="px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0"
                >
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-gray-900">
                        Order #{order.id}
                      </span>
                      <StatusBadge status={order.status} />
                    </div>
                    <p className="text-xs text-gray-400">
                      {formatDate(order.created_at)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {pluralise(order.total_items, "item")}
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
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
