import HeroCarousel from "../components/home/HeroCarousel";
import CategoriesBar from "../components/home/CategoriesBar";
import ProductSection from "../components/home/ProductSection";
import { mockProducts } from "../data/mockProduct";
import { useCart } from "../context/CartContext";

function Home() {
  const { addToCart } = useCart();

  // Split mock products into two sections for variety
  const trending = mockProducts.slice(0, 4);
  const deals = mockProducts.slice(4);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 space-y-2">
        {/* Hero */}
        <HeroCarousel />

        {/* Shop by Category */}
        <section>
          <div className="mb-2 mt-6">
            <h2 className="text-lg font-bold text-gray-900">Shop by Category</h2>
            <div className="h-0.5 w-10 bg-[#feee00] mt-1 rounded-full" />
          </div>
          <CategoriesBar />
        </section>

        {/* Product sections */}
        <ProductSection
          title="Trending Products"
          products={trending}
          addToCart={addToCart}
        />
        <ProductSection
          title="Best Deals"
          products={deals}
          addToCart={addToCart}
        />
      </div>
    </div>
  );
}

export default Home;
