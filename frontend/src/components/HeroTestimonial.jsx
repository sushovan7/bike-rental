import React from "react";
import { testimonialsData } from "../data/landing";

function HeroTestimonial() {
  return (
    <section className="flex px-4 mb-20 w-full gap-10 items-center justify-center flex-col ">
      <h1 className="text-2xl text-center font-bold">What ours users say</h1>
      <div className="flex flex-col md:flex-row gap-6 ">
        {" "}
        {testimonialsData &&
          testimonialsData.length > 0 &&
          testimonialsData.map((item, index) => {
            return (
              <div
                key={index}
                className="card bg-base-100 p-2 px-4 w-96 shadow-xl"
              >
                <div className="px-4">
                  {" "}
                  <div className="flex items-center gap-4">
                    {" "}
                    <div className="avatar">
                      <div className="w-10 rounded-full">
                        <img src={item.image} />
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-lg">{item.name}</p>
                      <p className="text-xs">{item.role}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm mt-3">{item.quote}</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
}

export default HeroTestimonial;
