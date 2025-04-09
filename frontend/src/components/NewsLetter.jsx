import { motion } from "framer-motion";

function NewsLetter() {
  return (
    <section className="container mx-auto px-4 mb-32">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-[#605DFF]/10 to-[#908EFF]/10 border border-gray-800 rounded-2xl p-8 md:p-12 text-center"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl md:text-5xl font-bold mb-4"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#605DFF] to-[#908EFF]">
            Get 10% Off Your First Ride
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-gray-400 max-w-2xl mx-auto mb-8"
        >
          Join our newsletter and enjoy 10% off your first bike rental or
          purchase! Stay updated on the latest deals, new arrivals, and
          exclusive offers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-grow px-6 py-3 bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-[#605DFF] text-white"
            required
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-[#605DFF] to-[#908EFF] text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            Subscribe
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default NewsLetter;
