import ProductSection from "../components/home/ProductSection";
import { mockProducts } from "../data/mockProduct";
import HeroCarousel from "../components/home/HeroCarousel";
import CategoriesMenu from "../components/home/CategoriesMenu";
import CategoriesBar from "../components/home/CategoriesBar";
import { useCart } from "../context/CartContext";

function Home() {
  const { addToCart } = useCart();

  return (
    <div className="px-4">
      <CategoriesMenu />
      <HeroCarousel />
      <CategoriesBar />
      <ProductSection title="Trending Products" products={mockProducts} addToCart={addToCart} />
      <ProductSection title="Best Deals" products={mockProducts} addToCart={addToCart} />
    </div>
  );
}

export default Home;
