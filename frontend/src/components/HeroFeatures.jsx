import { featuresData } from "../data/landing";

function HeroFeatures() {
  return (
    <section className="flex px-4 w-full gap-10 mb-20 items-center justify-center flex-col md:mt-32 ">
      <h1 className="text-2xl text-center font-bold">
        Explore Our Bike Rental & Purchase Features
      </h1>
      <div className="flex flex-col gap-6 md:flex-row md:flex-wrap md:items-center md:justify-center">
        {featuresData &&
          featuresData.length > 0 &&
          featuresData.map((feature, index) => (
            <div key={index} className="card bg-base-100 w-96 shadow-xl">
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <div className="card-body">
                <p className="font-bold text-lg">{feature.title}</p>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

export default HeroFeatures;
