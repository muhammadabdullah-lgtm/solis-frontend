import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ShoppingCart, ChevronLeft, Minus, Plus } from "lucide-react";
import type { ApiReview, ReviewsResponse } from "../services/products.service";
import { useCart } from "../features/cart/context/CartContext";
import { useAuth } from "../features/auth/context/AuthContext";
import { useProduct } from "../hooks/useProduct";

function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const { product, reviews, loading: productLoading, error: productError } = useProduct(id);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);

  if (productLoading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className=" mx-auto px-4 lg:px-8 py-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl aspect-square animate-pulse" />
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-5 bg-gray-200 rounded animate-pulse w-3/4"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (productError || !product) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center space-y-3">
          <p className="text-4xl">😕</p>
          <p className="text-gray-500 text-sm">
            Product not found or failed to load.
          </p>
          <button
            onClick={() => navigate("/products")}
            className="text-sm font-medium text-gray-700 hover:text-black underline underline-offset-2"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const discount =
    product.compare_at_price !== null
      ? Math.round(
          (1 - Number(product.price) / Number(product.compare_at_price)) * 100,
        )
      : null;

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate("/sign-in");
      return;
    }
    setAddingToCart(true);
    try {
      await addToCart(product.id, quantity);
      setAddedFeedback(true);
      setTimeout(() => setAddedFeedback(false), 2000);
    } finally {
      setAddingToCart(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className=" mx-auto px-4 lg:px-8 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-black mb-6 transition-colors"
        >
          <ChevronLeft size={15} />
          Back
        </button>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full aspect-square object-cover"
            />
          </div>

          <div className="flex flex-col gap-4">
            {product.brand && (
              <Link
                to={`/products?brand_id=${product.brand.id}`}
                className="text-sm font-semibold text-gray-500 hover:text-black transition-colors w-fit"
              >
                {product.brand.name}
              </Link>
            )}
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-snug">
              {product.name}
            </h1>

            <div>
              {product.average_rating != null ? (
                <StarRow
                  rating={Number(product.average_rating)}
                  count={product.reviews_count}
                />
              ) : (
                <span className="text-sm text-gray-400">No reviews yet</span>
              )}
            </div>

            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="text-3xl font-bold text-gray-900">
                {product.currency} {product.price}
              </span>
              {product.compare_at_price && (
                <>
                  <span className="text-base text-gray-400 line-through">
                    {product.currency} {product.compare_at_price}
                  </span>
                  {discount !== null && (
                    <span className="bg-[#feee00] text-black text-sm font-bold px-2 py-0.5 rounded-full">
                      -{discount}%
                    </span>
                  )}
                </>
              )}
            </div>

            <p
              className={`text-sm font-medium ${
                product.in_stock ? "text-green-600" : "text-red-500"
              }`}
            >
              {product.in_stock
                ? `In Stock (${product.stock_quantity} available)`
                : "Out of Stock"}
            </p>

            {product.in_stock && (
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden select-none">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-12 text-center text-sm font-semibold border-x border-gray-300">
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity((q) =>
                        Math.min(product.stock_quantity, q + 1),
                      )
                    }
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    disabled={quantity >= product.stock_quantity}
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={addingToCart}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#feee00] text-black font-semibold py-2.5 px-6 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60 min-w-[160px]"
                >
                  <ShoppingCart size={16} />
                  {addedFeedback
                    ? "Added!"
                    : addingToCart
                      ? "Adding…"
                      : "Add to Cart"}
                </button>
              </div>
            )}
            {product.short_description && (
              <p className="text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                {product.short_description}
              </p>
            )}
            <p className="text-xs text-gray-400">SKU: {product.sku}</p>
          </div>
        </div>

        <div className="mt-12 grid lg:grid-cols-3 gap-8">
          {product.description && (
            <div className="lg:col-span-2">
              <SectionTitle>Description</SectionTitle>
              <div
                className="prose prose-sm max-w-none text-gray-700 bg-white rounded-xl border border-gray-100 shadow-sm p-6"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          )}

          <div
            className={product.description ? "lg:col-span-1" : "lg:col-span-3"}
          >
            <SectionTitle>
              Reviews{reviews && reviews.total > 0 ? ` (${reviews.total})` : ""}
            </SectionTitle>
            <ReviewsSection reviews={reviews} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewsSection({ reviews }: { reviews: ReviewsResponse | null }) {
  if (!reviews) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 text-sm text-gray-400 text-center">
        Reviews unavailable.
      </div>
    );
  }

  const reviewList = Array.isArray(reviews.reviews) ? reviews.reviews : [];
  const total = reviews.total ?? reviewList.length;
  const avgRating =
    reviews.average_rating != null ? Number(reviews.average_rating) : null;

  if (total === 0 && reviewList.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 text-center">
        <p className="text-3xl mb-2">💬</p>
        <p className="text-sm text-gray-400">No reviews yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {avgRating !== null && !isNaN(avgRating) && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-4xl font-black text-gray-900">
                {avgRating.toFixed(1)}
              </p>
              <StarRow rating={avgRating} />
              <p className="text-xs text-gray-400 mt-1">
                {total} reviews
              </p>
            </div>
            <div className="flex-1 space-y-1">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = Number(reviews.rating_breakdown?.[String(star)] ?? 0);
                const pct = total > 0 ? (count / total) * 100 : 0;
                return (
                  <div key={star} className="flex items-center gap-2 text-xs">
                    <span className="w-3 text-right text-gray-500">{star}</span>
                    <span className="text-amber-400 leading-none">★</span>
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="w-5 text-gray-400">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {reviewList.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}

function ReviewCard({ review }: { review: ApiReview }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <p className="text-sm font-semibold text-gray-900">
            {review.user_name}
          </p>
          <StarRow rating={review.rating} />
        </div>
        <time className="text-xs text-gray-400 shrink-0">
          {new Date(review.created_at).toLocaleDateString("en-AE", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </time>
      </div>
      {review.body && (
        <p className="text-sm text-gray-600 leading-relaxed">{review.body}</p>
      )}
    </div>
  );
}

function StarRow({ rating, count }: { rating: number; count?: number }) {
  const r = Number(rating);
  const full = Math.floor(r);
  const half = r - full >= 0.5;
  return (
    <div className="flex items-center gap-1">
      <div
        className="flex items-center gap-px"
        aria-label={`${r} out of 5`}
      >
        {[1, 2, 3, 4, 5].map((s) => (
          <span
            key={s}
            className={`text-sm leading-none ${
              s <= full
                ? "text-amber-400"
                : s === full + 1 && half
                  ? "text-amber-300"
                  : "text-gray-200"
            }`}
          >
            ★
          </span>
        ))}
      </div>
      <span className="text-sm text-gray-500 font-medium">
        {r.toFixed(1)}
      </span>
      {count !== undefined && count > 0 && (
        <span className="text-xs text-gray-400">
          ({count.toLocaleString()})
        </span>
      )}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-bold text-gray-900">{children}</h2>
      <div className="h-0.5 w-10 bg-[#feee00] mt-1 rounded-full" />
    </div>
  );
}

export default ProductDetail;
