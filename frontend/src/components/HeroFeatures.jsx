import { featuresData } from "../data/Landing";

function HeroFeatures() {
  return (
    <section className="flex flex-col items-center justify-center w-full px-4 mb-20 md:mt-32">
      <h1 className="text-2xl text-center font-bold mb-8">
        Explore Our Bike Rental & Purchase Features
      </h1>
      <div className="flex flex-col gap-6 md:flex-row md:flex-wrap md:items-center md:justify-center">
        {featuresData &&
          featuresData.length > 0 &&
          featuresData.map((feature, index) => (
            <div
              key={index}
              className="card bg-base-100 py-3 w-full sm:w-96 md:w-80 lg:w-96 shadow-xl rounded-lg"
            >
              <div className="flex justify-center ">
                <div className="text-4xl">{feature.icon}</div>
              </div>
              <div className="card-body py-2 text-center">
                <p className="font-bold text-lg mb-2">{feature.title}</p>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

export default HeroFeatures;
