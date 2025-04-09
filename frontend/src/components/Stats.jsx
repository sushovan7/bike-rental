import { statsData } from "../data/Landing";
import { motion } from "framer-motion";

function Stats() {
  return (
    <section className="container mx-auto px-4 mb-20 mt-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-8 shadow-xl"
      >
        {statsData.map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center justify-center text-center"
          >
            <p className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#605DFF] to-[#908EFF] mb-2">
              {stat.value}
            </p>
            <p className="text-sm md:text-lg text-gray-300 font-medium">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default Stats;
