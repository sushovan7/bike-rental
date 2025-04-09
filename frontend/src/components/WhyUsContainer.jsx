import { motion } from "framer-motion";
import Title from "./Title";

function WhyUsContainer() {
  const features = [
    {
      title: "Reliable & Well-Maintained Bikes",
      description:
        "We offer a wide range of high-quality, regularly serviced bikes to ensure a smooth and safe ride.",
      icon: "🚲",
    },
    {
      title: "Hassle-Free Rentals & Purchases",
      description:
        "Our seamless booking and purchasing process makes it easy to rent or buy your perfect bike in just a few clicks.",
      icon: "💳",
    },
    {
      title: "Dedicated Customer Support",
      description:
        "Our team is always ready to assist you, whether you need help choosing a bike, understanding rental policies, or resolving any concerns.",
      icon: "👨‍💼",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <Title
          text1="WHY"
          text2="CHOOSE US"
          className="text-4xl md:text-5xl font-bold"
        />
        <p className="text-gray-400 max-w-2xl mx-auto mt-4">
          Discover what makes us the preferred choice for bike rentals and
          purchases
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 hover:border-[#605DFF]/50 transition-all duration-300"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
export default WhyUsContainer;
