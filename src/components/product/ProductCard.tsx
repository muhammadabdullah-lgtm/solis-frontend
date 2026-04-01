import type { Product } from "../../types";

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
}

function ProductCard({ product, addToCart }: ProductCardProps) {
  return (
    <div className="border rounded-lg p-3 shadow-sm hover:shadow-md transition">
      

      <img
        src={product.image}
        alt={product.title}
        className="w-full h-40 object-cover rounded-md"
      />


      <h2 className="text-sm font-medium mt-2 line-clamp-2">
        {product.title}
      </h2>


      <p className="text-lg font-bold mt-1">${product.price}</p>


      <button
        onClick={() => addToCart(product)}
        className="mt-3 w-full bg-yellow-400 py-2 rounded-md hover:bg-yellow-500 transition"
      >
        Add to Cart
      </button>

    </div>
  );
}

export default ProductCard;