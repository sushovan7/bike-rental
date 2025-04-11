import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function HeroSection() {
  return (
    <div className="relative pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#605DFF]/10 via-[#605DFF]/5 to-transparent -z-10"></div>

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-20">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#605DFF]/10"
            style={{
              width: Math.random() * 200 + 50,
              height: Math.random() * 200 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <section className="container pt-32 md:min-h-[90vh] flex flex-col px-4 items-center md:justify-center mx-auto">
        <div className="flex mb-8 items-center justify-center gap-2 flex-col text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-7xl font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                Ride Your Way:
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-10"
          >
            <h1 className="text-4xl md:text-7xl font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#605DFF] to-[#908EFF]">
                <span className="inline-block mr-4">Rent</span>
                <span className="inline-block mx-4">Buy</span>
                <span className="inline-block ml-4">Explore</span>
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg md:w-[50vw] md:text-xl mb-10 text-gray-400 leading-relaxed"
          >
            Find the{" "}
            <span className="text-white font-medium underline decoration-[#5654E7] decoration-3">
              perfect bike
            </span>{" "}
            for every journey. Whether you need a{" "}
            <span className="text-white font-medium underline decoration-[#5654E7] decoration-3">
              quick rental
            </span>{" "}
            for an adventure or want to buy your{" "}
            <span className="text-white font-medium underline decoration-[#5654E7] decoration-3">
              dream ride
            </span>
            , we make it{" "}
            <span className="text-white font-medium underline decoration-[#5654E7] decoration-3">
              simple and hassle-free.
            </span>
          </motion.p>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
          >
            <motion.li
              whileHover={{ scale: 1.05 }}
              className="flex items-center justify-center gap-2 text-md bg-gray-900/50 backdrop-blur-sm border border-gray-800 px-6 py-3 rounded-xl"
            >
              <Check className="text-[#605DFF]" size={18} />
              <span>Rent bikes hassle-free</span>
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.05 }}
              className="flex items-center justify-center gap-2 text-md bg-gray-900/50 backdrop-blur-sm border border-gray-800 px-6 py-3 rounded-xl"
            >
              <Check className="text-[#605DFF]" size={18} />
              <span>Own the ride you love</span>
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.05 }}
              className="flex items-center justify-center gap-2 text-md bg-gray-900/50 backdrop-blur-sm border border-gray-800 px-6 py-3 rounded-xl"
            >
              <Check className="text-[#605DFF]" size={18} />
              <span>Explore with confidence</span>
            </motion.li>
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/inventory"
            className="relative bg-gradient-to-r from-[#605DFF] to-[#5654E7] hover:from-[#5654E7] hover:to-[#605DFF] text-white text-lg font-medium py-4 px-8 rounded-full flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            Get Started
            <ArrowRight
              className="group-hover:translate-x-1 transition-transform"
              size={18}
            />
            <span className="absolute -z-10 inset-0 rounded-full bg-[#605DFF] blur-md opacity-70 group-hover:opacity-90 transition-opacity"></span>
          </Link>
        </motion.div>

        <motion.img
          src="http://res.cloudinary.com/sushovanbhattarai/image/upload/v1741186988/d8peiwogdwjht6zqloem.avif"
          alt="Bike"
          className="absolute right-10 bottom-10 w-1/4 max-w-xs hidden lg:block rounded-lg shadow-2xl border-2 border-gray-800/50"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        />
      </section>
    </div>
  );
}

export default HeroSection;
