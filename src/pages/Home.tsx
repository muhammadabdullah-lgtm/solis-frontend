import HeroCarousel from "../components/home/HeroCarousel";
import FeaturedCategories from "../components/home/FeaturedCategories";
import NewArrivals from "../components/home/NewArrivals";
import TopBrands from "../components/home/TopBrands";
import Layout from "../components/layout";

const Home  =  () => {
  return (
    <Layout>


<div className="pt-[2px] px-4 md:px-[24px]  bg-white" >
  

      <HeroCarousel />
        <FeaturedCategories />
        <NewArrivals />
        <TopBrands />


</div>

  


      
    </Layout>

  );
}

export default Home;
