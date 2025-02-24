import React from "react";
import HeroSection from "../components/HeroSection";
import Accordion from "../components/Accordion";
import Stats from "../components/stats";
import HeroFeatures from "../components/HeroFeatures";
import HeroTestimonial from "../components/HeroTestimonial";
import HowItWorks from "../components/HowItWorks";
function Home() {
  return (
    <div>
      <HeroSection />
      <Stats />
      <HeroFeatures />
      <HowItWorks />
      <Accordion />
      <HeroTestimonial />
    </div>
  );
}

export default Home;
