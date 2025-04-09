import aboutImg from "../assets/about-img.jpg";
import Title from "./Title";
import { motion } from "framer-motion";

function OurMission() {
  return (
    <section className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="lg:w-1/2 w-full overflow-hidden rounded-xl shadow-2xl"
        >
          <img
            src={aboutImg}
            alt="about-us"
            className="object-cover w-full h-full rounded-xl border border-gray-800"
          />
        </motion.div>

        <div className="lg:w-1/2 w-full space-y-6">
          <Title
            text1="ABOUT"
            text2="US"
            className="text-4xl md:text-5xl font-bold"
          />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400"
          >
            At Reeleiic, we strive to revolutionize the bike rental experience
            by making mobility more accessible, affordable, and convenient. Our
            platform is designed to provide users with a seamless way to rent or
            purchase high-quality bikes, whether for daily commutes, leisure
            rides, or long adventures.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-400"
          >
            Since our inception, we have been committed to curating a diverse
            selection of bikes that cater to different needs and preferences.
            From city bikes and mountain bikes to electric options, we ensure
            that every ride is reliable, well-maintained, and ready for the
            road.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#605DFF] to-[#908EFF] mb-4">
              Our Mission
            </h3>
            <p className="text-gray-400">
              Our mission is to empower customers by offering flexibility,
              confidence, and a hassle-free rental experience. We prioritize
              user satisfaction by providing an intuitive booking system,
              transparent pricing, and dedicated customer support. Whether
              you&apos;re exploring new routes or simply commuting, Reeleiic is
              here to make your journey smooth, enjoyable, and unforgettable.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
export default OurMission;
