import { useEffect } from "react";
import HeroSection from "../components/HeroSection";
import Accordion from "../components/Accordion";
import Stats from "../components/stats";
import HeroFeatures from "../components/HeroFeatures";
import HeroTestimonial from "../components/HeroTestimonial";
import HowItWorks from "../components/HowItWorks";
import NewsLetter from "../components/NewsLetter";
import RecentProducts from "../components/RecentProducts";
import BestSellerProducts from "../components/BestSellerProducts";
function Home() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div>
      <HeroSection />
      <Stats />
      <BestSellerProducts />
      <HeroFeatures />
      <HowItWorks />
      <RecentProducts />
      <Accordion />
      <HeroTestimonial />
      <NewsLetter />
    </div>
  );
}

export default Home;
