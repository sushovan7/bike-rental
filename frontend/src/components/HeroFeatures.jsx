import { featuresData } from "../data/Landing";
import { motion } from "framer-motion";

function HeroFeatures() {
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
            Our Premium Features
          </span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Everything you need for the perfect riding experience
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuresData.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 flex flex-col items-center text-center hover:border-[#605DFF]/50 transition-all duration-300"
          >
            <div className="text-5xl mb-6 text-[#605DFF]">{feature.icon}</div>
            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default HeroFeatures;
