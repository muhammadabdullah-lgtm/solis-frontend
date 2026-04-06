import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import type { ApiProduct } from "../../api/productsApi";

function ApiProductCard({ product }: { product: ApiProduct }) {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const discount =
    product.compare_at_price !== null
      ? Math.round(
          (1 - Number(product.price) / Number(product.compare_at_price)) * 100,
        )
      : null;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate("/sign-in");
      return;
    }
    await addToCart(product.id);
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer flex flex-col relative overflow-hidden"
    >
      {!product.in_stock && (
        <div className="absolute inset-0 bg-white/70 z-10 flex items-center justify-center rounded-xl pointer-events-none">
          <span className="bg-gray-200 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">
            Out of Stock
          </span>
        </div>
      )}
      {discount !== null && (
        <span className="absolute top-2 left-2 z-10 bg-[#feee00] text-black text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
          -{discount}%
        </span>
      )}

      <div className="overflow-hidden rounded-t-xl">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-3 flex flex-col flex-1">
        {product.brand && (
          <p className="text-xs text-gray-400 mb-0.5">{product.brand.name}</p>
        )}

        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-snug flex-1">
          {product.name}
        </h3>

        <div className="mt-1.5">
          {product.average_rating !== null ? (
            <StarRating
              rating={product.average_rating}
              count={product.reviews_count}
            />
          ) : (
            <span className="text-xs text-gray-400">No reviews</span>
          )}
        </div>

        <div className="mt-2 flex items-baseline gap-2 flex-wrap">
          <span className="text-base font-bold text-gray-900">
            AED {product.price}
          </span>
          {product.compare_at_price !== null && (
            <span className="text-xs text-gray-400 line-through">
              AED {product.compare_at_price}
            </span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!product.in_stock}
          className="mt-3 w-full flex items-center justify-center gap-2 bg-[#feee00] text-black text-sm font-semibold py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ShoppingCart size={14} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

function StarRating({ rating, count }: { rating: number; count: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;

  return (
    <div className="flex items-center gap-1">
      <div
        className="flex items-center gap-px"
        aria-label={`${rating} out of 5`}
      >
        {[1, 2, 3, 4, 5].map((s) => (
          <span
            key={s}
            className={`text-xs leading-none ${
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
      <span className="text-xs text-gray-500 font-medium">{rating}</span>
      {count > 0 && (
        <span className="text-xs text-gray-400">
          ({count.toLocaleString()})
        </span>
      )}
    </div>
  );
}

export default ApiProductCard;
