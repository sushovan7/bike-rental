import { motion } from "framer-motion";

function Accordion() {
  const faqs = [
    {
      question: "How do I rent a bike?",
      answer:
        "Simply browse our bike selection, choose your preferred model, and select the rental duration. Complete your booking through our secure payment process, and your bike will be ready for pickup or delivery.",
    },
    {
      question: "Can I buy a bike through the app?",
      answer:
        "Yes! You can easily browse our collection of bikes available for purchase. Once you find the one you like, you can make a secure payment and have it delivered to your doorstep.",
    },
    {
      question: "How are the bikes maintained?",
      answer:
        "All our bikes are regularly inspected and maintained by professional technicians to ensure they are in top condition. Each bike is thoroughly cleaned, checked for safety, and tuned before being rented or sold.",
    },
    {
      question: "What types of bikes are available for rent or purchase?",
      answer:
        "We offer a wide range of bikes, including mountain bikes, road bikes, city bikes, and electric bikes. Whether you're looking to rent for a day or buy for the long term, we have the perfect bike for you.",
    },
    {
      question: "Are there any delivery or pick-up options?",
      answer:
        "Yes! We offer both delivery and pick-up options for your convenience. You can choose your preferred method during checkout, and we'll make sure your bike arrives or is picked up at the designated time and location.",
    },
  ];

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
            Frequently Asked Questions
          </span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Everything you need to know about our services
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <div className="collapse collapse-plus bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg hover:border-[#605DFF]/50 transition-all duration-300">
              <input type="radio" name="my-accordion" />
              <div className="collapse-title text-lg font-medium">
                {faq.question}
              </div>
              <div className="collapse-content">
                <p className="text-gray-400">{faq.answer}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Accordion;
