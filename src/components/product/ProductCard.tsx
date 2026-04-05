import { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import type { Product } from "../../types";

interface ProductCardProps {
  product: Product;
  addToCart: (productId: number) => void;
}

function ProductCard({ product, addToCart }: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 group flex flex-col">
      <div className="relative overflow-hidden rounded-t-xl">
        {product.badge && (
          <span className="absolute top-2 left-2 z-10 bg-[#feee00] text-black text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
            {product.badge}
          </span>
        )}

        <button
          onClick={() => setWishlisted((w) => !w)}
          className="absolute top-2 right-2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-1.5 hover:bg-white transition-colors"
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            size={14}
            className={
              wishlisted ? "text-red-500 fill-red-500" : "text-gray-400"
            }
          />
        </button>

        <img
          src={product.image}
          alt={product.title}
          className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-3 flex flex-col flex-1">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-snug flex-1">
          {product.title}
        </h3>

        {product.rating !== undefined && (
          <div className="flex items-center gap-1 mt-1.5">
            <StarRating rating={product.rating} />
            {product.reviewCount !== undefined && (
              <span className="text-xs text-gray-400">
                ({product.reviewCount.toLocaleString()})
              </span>
            )}
          </div>
        )}

        <div className="mt-2 flex items-baseline gap-2 flex-wrap">
          <span className="text-base font-bold text-gray-900">
            ${product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              ${product.originalPrice.toLocaleString()}
            </span>
          )}
          {product.discount && (
            <span className="text-xs font-semibold text-green-600">
              -{product.discount}%
            </span>
          )}
        </div>

        <button
          onClick={() => addToCart(product.id)}
          className="mt-3 w-full flex items-center justify-center gap-2 bg-[#feee00] text-black text-sm font-semibold py-2 rounded-lg hover:opacity-90 transition-opacity"
        >
          <ShoppingCart size={14} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;

  return (
    <div className="flex items-center gap-px" aria-label={`${rating} out of 5`}>
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
      <span className="text-xs text-gray-500 ml-0.5 font-medium">{rating}</span>
    </div>
  );
}

export default ProductCard;
