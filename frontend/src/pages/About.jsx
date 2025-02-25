import Title from "../components/Title";

import NewsLetter from "../components/NewsLetter";
import OurMission from "../components/OurMission";

import WhyUsContainer from "../components/WhyUsContainer";
import { useEffect } from "react";

function About() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="w-full px-4">
      <OurMission />
      <div className="mt-16">
        <Title
          text1="WHY"
          text2="CHOOSE US"
          className="text-2xl md:text-4xl font-mono tracking-tight text-gray-white"
        />
      </div>
      <WhyUsContainer />
      <NewsLetter />
    </div>
  );
}

export default About;
