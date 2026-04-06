import HeroCarousel from "../components/home/HeroCarousel";
import FeaturedCategories from "../components/home/FeaturedCategories";
import NewArrivals from "../components/home/NewArrivals";
import TopBrands from "../components/home/TopBrands";

function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto px-4 lg:px-8 py-6 space-y-10">
        <HeroCarousel />
        <FeaturedCategories />
        <NewArrivals />
        <TopBrands />
      </div>
    </div>
  );
}

export default Home;
