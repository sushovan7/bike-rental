import { useEffect } from "react";
import NewsLetter from "../components/NewsLetter";
import OurMission from "../components/OurMission";
import WhyUsContainer from "../components/WhyUsContainer";
import BestsellerProducts from "../components/BestSellerProducts";

function About() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className=" text-white">
      <OurMission />
      <WhyUsContainer />
      <BestsellerProducts />
      <NewsLetter />
    </div>
  );
}

export default About;
