import { testimonialsData } from "../data/Landing";
import { motion } from "framer-motion";

function HeroTestimonial() {
  return (
    <section className="container mx-auto px-4 mb-32">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#605DFF] to-[#908EFF]">
            Rider Testimonials
          </span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Hear what our customers say about their experiences
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonialsData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-[#605DFF]/50 transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img src={item.image} alt={item.name} />
                </div>
              </div>
              <div>
                <p className="font-bold text-lg">{item.name}</p>
                <p className="text-sm text-[#605DFF]">{item.role}</p>
              </div>
            </div>
            <p className="text-gray-400 italic">{item.quote}</p>
            <div className="flex mt-4 text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
export default HeroTestimonial;
