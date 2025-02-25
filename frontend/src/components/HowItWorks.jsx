import { howItWorksData } from "../data/Landing";

function HowItWorks() {
  return (
    <section className="mt-32 mb-20 px-6 py-16 flex flex-col items-center justify-center gap-8">
      <h1 className="text-2xl font-bold text-center mb-8">How It Works</h1>
      <div className="flex flex-col md:flex-row gap-12 md:gap-20 justify-center items-center">
        {howItWorksData &&
          howItWorksData.length > 0 &&
          howItWorksData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-4 justify-center"
            >
              <div className="flex  items-center bg-gray-800 rounded-full h-12 w-12 justify-center">
                <p className="text-xl">{item.icon}</p>
              </div>
              <p className="text-lg font-bold text-center">{item.title}</p>
              <p className="text-center text-gray-400">{item.description}</p>
            </div>
          ))}
      </div>
    </section>
  );
}

export default HowItWorks;
