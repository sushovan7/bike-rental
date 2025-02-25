import { Check } from "lucide-react";

import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <div className="pb-20 ">
      <section className="container pt-20 md:h-[80vh]   flex flex-col px-4 items-center md:justify-center  mx-auto ">
        <div className="flex mb-8 items-center justify-center gap-2 flex-col">
          <h1 className="text-[5vh] md:text-[7vh] font-bold text-center font-mono">
            Ride Your Way:
          </h1>
          <h1 className="text-3xl md:text-[7vh] text-[#605DFF] font-mono font-bold  mb-10">
            <span>Rent</span>,<span>Buy</span>,<span>Explore</span>
          </h1>
          <p className="text-center text-lg md:w-[50vw] md:text-xl mb-10 text-gray-400">
            Find the{" "}
            <span className="text-white underline decoration-[#5654E7] decoration-3">
              perfect bike
            </span>{" "}
            for every journey. Whether you need a{" "}
            <span className="text-white underline decoration-[#5654E7] decoration-3">
              quick rental
            </span>{" "}
            for an adventure or want to,buy your
            <span className="text-white underline decoration-[#5654E7] decoration-3">
              {" "}
              dream ride
            </span>{" "}
            we make it {""}
            <span className="text-white underline decoration-[#5654E7] decoration-3">
              simple and hassle-free.
            </span>
          </p>
          <ul className="text-center  flex items-start justify-center flex-col">
            <li className="flex items-start md:text-lg gap-2 text-md ">
              <Check />
              Rent bikes hassle-free.
            </li>
            <li className="flex items-center md:text-lg gap-2 text-md ">
              <Check />
              Own the ride you love.
            </li>
            <li className="flex items-center md:text-lg gap-2 text-md justify-center">
              <Check />
              Explore with confidence.
            </li>
          </ul>
        </div>
        <Link
          to={"/inventory"}
          size="lg"
          className="bg-[#5753E8] hover:bg-[#635ee8] cursor-pointer text-white text-lg py-8 px-10 rounded-lg"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
}

export default HeroSection;
