import FaboraHeader from "@/components/FaboraHeader";
import HeroFullImage from "@/components/HeroFullImage";
import BoldFashionGrid from "@/components/BoldFashionGrid";
import ProductLooksCarousel from "@/components/ProductLooksCarousel";
import NewCollectionGrid from "@/components/NewCollectionGrid";
import WinterSaleBanner from "@/components/WinterSaleBanner";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedProducts from "@/components/FeaturedProducts";
import NewArrivals from "@/components/NewArrivals";
import LookbookGrid from "@/components/LookbookGrid";
import WhyChooseUs from "@/components/WhyChooseUs";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <FaboraHeader />
      <main>
        <HeroFullImage />
        <BoldFashionGrid />
        <ProductLooksCarousel />
        <NewCollectionGrid />
        <WinterSaleBanner />
        <CategoryGrid />
        <NewArrivals />
        <FeaturedProducts />
        <LookbookGrid />
        <WhyChooseUs />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
