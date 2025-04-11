import { motion } from "framer-motion";
import { useEffect } from "react";
import Title from "../components/Title";
import NewsLetter from "../components/NewsLetter";
import contactImg from "../assets/contact_img.png";

function Contact() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className=" text-white">
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Title
            text1="CONTACT"
            text2="US"
            className="text-4xl md:text-5xl font-bold"
          />
          <p className="text-gray-400 max-w-2xl mx-auto mt-4">
            Get in touch with our team for any inquiries or support
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="w-full lg:w-1/2 overflow-hidden rounded-xl shadow-2xl"
          >
            <img
              src={contactImg}
              alt="contact-img"
              className="object-cover w-full h-full rounded-xl border border-gray-800"
            />
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 space-y-8"
          >
            {/* Office Info */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 hover:border-[#605DFF]/50 transition-all duration-300">
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#605DFF] to-[#908EFF] mb-6">
                Our Office
              </h3>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start gap-3">
                  <span className="text-[#605DFF]">📍</span>
                  <div>
                    <strong className="text-white">Location:</strong>
                    <p>Kathmandu, Nepal</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#605DFF]">📞</span>
                  <div>
                    <strong className="text-white">Phone:</strong>
                    <p>+977-9800000000</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#605DFF]">📧</span>
                  <div>
                    <strong className="text-white">Email:</strong>
                    <p>support@reeleiic.com</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Careers Section */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 hover:border-[#605DFF]/50 transition-all duration-300">
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#605DFF] to-[#908EFF] mb-6">
                Join Our Team
              </h3>
              <p className="text-gray-400 mb-6">
                We are always looking for passionate individuals to join
                Reeleiic. Check out our current openings and be part of our
                journey to revolutionize bike rentals.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-[#605DFF] to-[#908EFF] text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                Explore Job Opportunities
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 md:p-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#605DFF] to-[#908EFF]">
              Send Us a Message
            </span>
          </h2>

          <form className="max-w-2xl mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#605DFF] text-white"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#605DFF] text-white"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#605DFF] text-white"
                placeholder="What's this about?"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Your Message
              </label>
              <textarea
                id="message"
                rows="5"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#605DFF] text-white"
                placeholder="How can we help you?"
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full px-6 py-4 bg-gradient-to-r from-[#605DFF] to-[#908EFF] text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </section>

      <NewsLetter />
    </div>
  );
}

export default Contact;
