import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import Button from "../components/ui/Button";
import { useCart } from "../features/cart/context/CartContext";
import { useAuth } from "../features/auth/context/AuthContext";
import { useProduct } from "../hooks/useProduct";
import { calcDiscount } from "../lib/utils";
import StarRating from "../components/common/StartRating";
import ReviewsSection from "../components/common/ReviewSection";
import SectionTitle from "../components/common/SectionTitle";
import DataNotFound from "../components/common/DataNotFound";
import QuantityStepper from "../components/common/QuantityStepper";
import StockBadge from "../components/common/StockBadge";
import BackButton from "../components/common/BackButton";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const { product, reviews, loading, error } = useProduct(id);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (error || !product) {
    return (
      <DataNotFound
        text="Product not found or failed to load."
        routeBack="products"
        backLabel="Back to Products"
      />
    );
  }

  const discount = calcDiscount(product.price, product.compare_at_price);

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
      <div className="mx-auto px-4 lg:px-8 py-8">
        <div className="mb-6">
          <BackButton onClick={() => navigate(-1)} />
        </div>

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
                <StarRating
                  rating={Number(product.average_rating)}
                  count={product.reviews_count}
                  size="sm"
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

            <StockBadge
              inStock={product.in_stock}
              stockQuantity={product.stock_quantity}
              size="sm"
            />

            {product.in_stock && (
              <div className="flex items-center gap-3 flex-wrap">
                <QuantityStepper
                  quantity={quantity}
                  max={product.stock_quantity}
                  onChange={setQuantity}
                />

                <Button
                  variant="primary"
                  size="md"
                  className="flex-1 min-w-[160px] px-6"
                  onClick={handleAddToCart}
                  disabled={addingToCart}
                >
                  <ShoppingCart size={16} />
                  {addedFeedback ? "Added!" : addingToCart ? "Adding…" : "Add to Cart"}
                </Button>
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

          <div className={product.description ? "lg:col-span-1" : "lg:col-span-3"}>
            <SectionTitle>
              Reviews{reviews && reviews.total > 0 ? ` (${reviews.total})` : ""}
            </SectionTitle>
            <ReviewsSection reviews={reviews} />
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductDetailSkeleton = () => (
  <div className="bg-gray-50 min-h-screen">
    <div className="mx-auto px-4 lg:px-8 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl aspect-square animate-pulse" />
        <div className="space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-5 bg-gray-200 rounded animate-pulse w-3/4" />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default ProductDetail;
