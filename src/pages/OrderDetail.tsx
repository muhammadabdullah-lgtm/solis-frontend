import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ChevronLeft, MapPin, Star, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getOrder } from "../api/ordersApi";
import type { OrderDetail as IOrderDetail, OrderItem } from "../api/ordersApi";
import { createReview } from "../api/productsApi";
import { StatusBadge } from "./Orders";

// ─── Review Modal ─────────────────────────────────────────────────────────────

interface ReviewModalProps {
  item: OrderItem;
  currency: string;
  onClose: () => void;
  onSubmitted: (itemId: number) => void;
}

function ReviewModal({ item, currency, onClose, onSubmitted }: ReviewModalProps) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <h2 className="text-base font-bold text-gray-900 mb-1">Rate & Review</h2>

        {/* Product */}
        <div className="flex gap-3 items-center mb-5 mt-3 bg-gray-50 rounded-xl px-3 py-2.5">
          <img
            src={item.product_image_url}
            alt={item.product_name}
            className="w-12 h-12 rounded-lg object-cover bg-gray-100 shrink-0"
          />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 line-clamp-1">{item.product_name}</p>
            <p className="text-xs text-gray-400 mt-0.5">
              {currency} {item.unit_price} × {item.quantity}
            </p>
          </div>
        </div>

        {/* Stars */}
        <p className="text-xs font-semibold text-gray-700 mb-2">Your Rating</p>
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

        {/* Body */}
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

        {error && (
          <p className="text-xs text-red-600 mt-2">{error}</p>
        )}

        <div className="flex gap-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="flex-1 py-2.5 rounded-xl bg-[#feee00] text-black text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {submitting ? "Submitting…" : "Submit Review"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Order Detail Page ────────────────────────────────────────────────────────

function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [order, setOrder] = useState<IOrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reviewItem, setReviewItem] = useState<OrderItem | null>(null);
  const [reviewedItemIds, setReviewedItemIds] = useState<Set<number>>(new Set());

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

  const handleReviewSubmitted = (itemId: number) => {
    setReviewedItemIds((prev) => new Set(prev).add(itemId));
    setReviewItem(null);
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
  const isDelivered = order.status === "delivered";

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
              {order.items.map((item) => {
                const reviewed = reviewedItemIds.has(item.id);
                return (
                  <div key={item.id} className="flex gap-4 items-start">
                    <Link to={`/product/${item.product.id}`}>
                      <img
                        src={item.product_image_url}
                        alt={item.product_name}
                        className="w-16 h-16 rounded-xl object-cover bg-gray-50 shrink-0 hover:opacity-90 transition-opacity"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/product/${item.product.id}`}
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
                      {isDelivered && (
                        reviewed ? (
                          <p className="text-xs text-green-600 font-medium mt-2 flex items-center gap-1">
                            <Star size={11} className="fill-green-500 stroke-green-500" />
                            Review submitted
                          </p>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setReviewItem(item)}
                            className="mt-2 flex items-center gap-1 text-xs font-semibold text-gray-700 border border-gray-200 rounded-lg px-2.5 py-1 hover:border-[#feee00] hover:bg-[#feee00]/10 transition-colors"
                          >
                            <Star size={12} className="fill-[#feee00] stroke-[#d4c200]" />
                            Rate & Review
                          </button>
                        )
                      )}
                    </div>
                    <p className="text-sm font-bold text-gray-900 shrink-0">
                      {order.currency} {item.subtotal}
                    </p>
                  </div>
                );
              })}
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
}

export default OrderDetail;
