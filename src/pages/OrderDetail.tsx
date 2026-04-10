import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin, Star, X } from "lucide-react";
import type { OrderItem } from "../services/orders.service";
import { createReview } from "../services/products.service";
import { useOrderDetail } from "../hooks/useOrderDetail";
import { formatDate } from "../lib/utils";
import StatusBadge from "../components/common/StatusBadge";
import BackButton from "../components/common/BackButton";
import DataNotFound from "../components/common/DataNotFound";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import OrderDetailLoading from "../components/common/OrderDetailLoading";
import OrderItems from "../components/common/OrderItems";
import Layout from "../components/layout";

interface ReviewModalProps {
  item: OrderItem;
  currency: string;
  onClose: () => void;
  onSubmitted: (itemId: number) => void;
}

const ReviewModal = ({
  item,
  currency,
  onClose,
  onSubmitted,
}: ReviewModalProps) => {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (rating === 0) {
      setError("Please select a star rating.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      await createReview(item.product.id, { rating, body: body.trim() });
      onSubmitted(item.id);
    } catch {
      setError("Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            aria-label="Close"
            className="
    absolute top-4 right-4
    text-gray-400 hover:text-gray-700
    p-0 m-0
    hover:bg-transparent
    rounded-none
    w-auto h-auto
    min-w-0
  "
          >
            <X size={18} />
          </Button>

          <h2 className="text-base font-bold text-gray-900 mb-1">
            Rate & Review
          </h2>

          <div className="flex gap-3 items-center mb-5 mt-3 bg-gray-50 rounded-xl px-3 py-2.5">
            <img
              src={item.product_image_url}
              alt={item.product_name}
              className="w-12 h-12 rounded-lg object-cover bg-gray-100 shrink-0"
            />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 line-clamp-1">
                {item.product_name}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {currency} {item.unit_price} × {item.quantity}
              </p>
            </div>
          </div>

          <p className="text-xs font-semibold text-gray-700 mb-2">
            Your Rating
          </p>
          <div className="flex gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHovered(star)}
                onMouseLeave={() => setHovered(0)}
                className="p-0.5 transition-transform hover:scale-110"
                aria-label={`${star} star`}
              >
                <Star
                  size={28}
                  className={
                    star <= (hovered || rating)
                      ? "fill-[#feee00] stroke-[#d4c200]"
                      : "fill-gray-200 stroke-gray-300"
                  }
                />
              </button>
            ))}
          </div>

          <p className="text-xs font-semibold text-gray-700 mb-1.5">
            Review <span className="font-normal text-gray-400">(optional)</span>
          </p>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={3}
            placeholder="Share your experience with this product…"
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-[#feee00] focus:ring-2 focus:ring-[#feee00]/40 transition resize-none"
          />

          {error && <p className="text-xs text-red-600 mt-2">{error}</p>}

          <div className="flex gap-2 mt-4">
            <Button
              variant="outline"
              size="lg"
              fullWidth
              type="button"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="lg"
              fullWidth
              type="button"
              disabled={submitting}
              onClick={handleSubmit}
            >
              {submitting ? "Submitting…" : "Submit Review"}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { order, loading, error } = useOrderDetail(id);
  const [reviewItem, setReviewItem] = useState<OrderItem | null>(null);
  const [reviewedItemIds, setReviewedItemIds] = useState<Set<number>>(
    new Set(),
  );

  const handleReviewSubmitted = (itemId: number) => {
    setReviewedItemIds((prev) => new Set(prev).add(itemId));
    setReviewItem(null);
  };

  if (loading) {
    return <OrderDetailLoading />;
  }

  if (error || !order) {
    return (
      <DataNotFound
        text="Order not found or failed to load."
        routeBack="orders"
        backLabel="Back to Orders"
      />
    );
  }

  const addr = order.delivery_address;
  const isDelivered = order.status === "delivered";

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 lg:px-8 py-8 space-y-6">
        <BackButton
          label="Back to Orders"
          onClick={() => navigate("/orders")}
        />

        <Card
          rounded="2xl"
          className="px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
        >
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h1 className="text-lg font-bold text-gray-900">
                Order #{order.id}
              </h1>
              <StatusBadge status={order.status} />
            </div>
            <p className="text-xs text-gray-400">
              Placed on {formatDate(order.created_at)}
            </p>
          </div>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          <Card rounded="2xl" className="md:col-span-1 px-6 py-5">
            <div className="flex items-center gap-2 mb-3">
              <MapPin size={15} className="text-gray-400" />
              <h2 className="text-sm font-bold text-gray-900">
                Delivery Address
              </h2>
            </div>
            <div className="text-sm text-gray-700 space-y-0.5">
              <p className="font-semibold">{addr.full_name}</p>
              <p>{addr.phone}</p>
              <p>{addr.street}</p>
              <p>
                {addr.city}
                {addr.state ? `, ${addr.state}` : ""}
              </p>
              <p>
                {addr.country}
                {addr.postal_code ? ` ${addr.postal_code}` : ""}
              </p>
            </div>
            {order.notes && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-500 font-medium mb-1">Notes</p>
                <p className="text-sm text-gray-600">{order.notes}</p>
              </div>
            )}
          </Card>

          <Card rounded="2xl" className="md:col-span-2 px-6 py-5">
            <h2 className="text-sm font-bold text-gray-900 mb-4">
              Items ({order.items.length})
            </h2>

            <div className="space-y-4">
              {order.items.map((item) => {
                const reviewed = reviewedItemIds.has(item.id);
                return (
                  <OrderItems
                    item={item}
                    order={order}
                    isDelivered={isDelivered}
                    reviewed={reviewed}
                    setReviewItem={setReviewItem}
                  />
                );
              })}
            </div>

            <div className="border-t border-gray-100 mt-5 pt-4 flex justify-between items-center">
              <span className="text-sm font-semibold text-gray-700">Total</span>
              <span className="text-xl font-black text-gray-900">
                {order.currency} {order.total_price}
              </span>
            </div>
          </Card>
        </div>
      </div>

      {reviewItem && (
        <ReviewModal
          item={reviewItem}
          currency={order.currency}
          onClose={() => setReviewItem(null)}
          onSubmitted={handleReviewSubmitted}
        />
      )}
    </div>
  );
};

export default OrderDetail;
