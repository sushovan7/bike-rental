import { testimonialsData } from "../data/Landing";

function HeroTestimonial() {
  return (
    <section className="px-6 mb-20 w-full flex flex-col items-center">
      <h1 className="text-2xl font-bold text-center mb-12">
        What Our Users Say
      </h1>
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-6 justify-center">
        {testimonialsData &&
          testimonialsData.length > 0 &&
          testimonialsData.map((item, index) => (
            <div
              key={index}
              className="card bg-base-100 p-4 w-full sm:w-96 shadow-xl rounded-lg"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img src={item.image} alt={item.name} />
                  </div>
                </div>
                <div>
                  <p className="font-bold text-lg">{item.name}</p>
                  <p className="text-xs text-gray-400">{item.role}</p>
                </div>
              </div>
              <p className="text-sm text-gray-400">{item.quote}</p>
            </div>
          ))}
      </div>
    </section>
  );
}

export default HeroTestimonial;
