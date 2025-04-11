import { motion } from "framer-motion";
import { howItWorksData } from "../data/Landing";

function HowItWorks() {
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
            How It Works
          </span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Get your perfect bike in just a few simple steps
        </p>
      </motion.div>

      <div className="relative">
        <div className="hidden md:block absolute left-1/2 top-0 h-full w-0.5 bg-gradient-to-b from-[#605DFF] to-[#908EFF] -translate-x-1/2"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {howItWorksData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`flex flex-col items-center text-center ${
                index % 2 === 0 ? "md:mt-0" : "md:mt-20"
              }`}
            >
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-[#605DFF] to-[#908EFF] rounded-full blur-md opacity-30"></div>
                <div className="relative flex items-center justify-center h-16 w-16 bg-gradient-to-br from-[#605DFF] to-[#908EFF] rounded-full text-white text-2xl font-bold">
                  {index + 1}
                </div>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 w-full hover:border-[#605DFF]/50 transition-all duration-300">
                <div className="text-3xl mb-4 text-[#605DFF]">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
