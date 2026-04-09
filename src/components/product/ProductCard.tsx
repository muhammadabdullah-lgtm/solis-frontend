import { useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, Zap } from "lucide-react";
import { useState } from "react";
import { useCart } from "../../features/cart/hooks/useCart";
import { useAuth } from "../../features/auth/hooks/useAuth";
import type { ApiProduct } from "../../services/products.service";
import StarRating from "../common/StartRating";

const ProductCard = ({ product }: { product: ApiProduct }) => {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [wishlisted, setWishlisted] = useState(false);

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

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlisted((prev) => !prev);
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-200 cursor-pointer flex flex-col relative overflow-hidden w-[220px]"
    >
      {/* Out of Stock Overlay */}
      {!product.in_stock && (
        <div className="absolute inset-0 bg-white/70 z-20 flex items-center justify-center rounded-2xl pointer-events-none">
          <span className="bg-gray-200 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">
            Out of Stock
          </span>
        </div>
      )}

      {/* Image Area */}
      <div className="relative bg-[#F5F5F5] h-[270px] flex items-center justify-center overflow-hidden rounded-t-2xl">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {/* {discount !== null && (
          <span className="absolute top-2.5 left-2.5 z-10 bg-[#FEEE00] text-black text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
            -{discount}%
          </span>
        )} */}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute top-2.5 right-2.5 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm hover:scale-110 transition-transform duration-150"
        >
          <Heart
            size={15}
            className={wishlisted ? "fill-red-500 text-red-500" : "text-gray-400"}
          />
        </button>

        {/* Add (+) Button */}
        {/* <button
          onClick={handleAddToCart}
          disabled={!product.in_stock}
          className="absolute bottom-2.5 right-2.5 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-white shadow-sm hover:bg-gray-50 disabled:opacity-40 transition-colors duration-150 text-gray-600 font-bold text-lg leading-none"
        >
          +
        </button> */}
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-1 gap-1.5">
        {/* Brand */}
        {product.brand && (
          <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">
            {product.brand.name}
          </p>
        )}

        {/* Title */}
        <h3 className="text-[13px] font-medium text-gray-900 line-clamp-2 leading-snug flex-1">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="mt-0.5">
          {product.average_rating !== null ? (
            <StarRating
              rating={product.average_rating}
              count={product.reviews_count}
            />
          ) : (
            <span className="text-xs text-gray-400">No reviews</span>
          )}
        </div>

        {/* Pricing */}
        <div className="flex items-baseline gap-2 flex-wrap mt-0.5">
          <span className="text-[17px] font-bold text-gray-900">
            AED {product.price}
          </span>
          {product.compare_at_price !== null && (
            <>
              <span className="text-[12px] text-gray-400 line-through">
                AED {product.compare_at_price}
              </span>
              {discount !== null && (
                <span className="text-[11px] font-semibold text-orange-500">
                  {discount}%
                </span>
              )}
            </>
          )}
        </div>

        {/* Delivery CTA */}
        {/* <button
          onClick={handleAddToCart}
          disabled={!product.in_stock}
          className="mt-2 w-full bg-[#3B5BDB] hover:bg-[#2f4bc7] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-white text-[12px] font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all duration-150 shadow-sm"
        >
          <Zap size={13} className="fill-white" />
          <ShoppingCart size={13} />
          Add to Cart
        </button> */}
      </div>
    </div>
  );
};

export default ProductCard;