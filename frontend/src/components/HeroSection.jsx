import { Check } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <div className="container mx-auto h-[80vh] mb-20 items-center  flex pt-20 p-4">
      <div className="w-full flex items-center  flex-col gap-6 ">
        <div className="flex flex-col gap-2">
          <h1 className="text-6xl tracking-tighter text-center font-mono">
            Adventure on
          </h1>
          <h1 className="text-6xl text-center font-bold text-[#605DFF] font-mono">
            Two wheels
          </h1>
        </div>
        <div className="flex items-center justify-center w-[70vw]">
          <p className=" text-sm text-center text-gray-400">
            Looking to rent or buy? Find the perfect bike for your needs.
            Experience <span className="text-white font-bold">convenience</span>
            , <span className="text-white font-bold">affordability</span>, and{" "}
            <span className="text-white font-bold">quality </span> with our{" "}
            <span className="text-white font-bold">hassle-free</span> bike
            rentals and purchases.
          </p>
        </div>

        <ul className="text-gray-400 text-sm">
          <li className="flex items-center gap-2">
            <span>
              <Check size={"15"} />
            </span>
            <p>Flexible Rentals & Purchases</p>
          </li>
          <li className="flex items-center gap-2">
            <span>
              <Check size={"15"} />
            </span>
            <p>Premium, Well-Maintained Bikes</p>
          </li>
          <li className="flex items-center gap-2">
            <span>
              <Check size={"15"} />
            </span>
            <p>Affordable, Transparent Pricing</p>
          </li>
          <li className="flex items-center gap-2">
            <span>
              <Check size={"15"} />
            </span>
            <p>Seamless Booking & Delivery</p>
          </li>
        </ul>
        <Link to={"/inventory"} className="btn btn-accent btn-lg mt-5">
          Explore Products
        </Link>
      </div>
    </div>
  );
}

export default HeroSection;
