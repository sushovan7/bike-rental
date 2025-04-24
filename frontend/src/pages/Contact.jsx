import { motion } from "framer-motion";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Title from "../components/Title";
import NewsLetter from "../components/NewsLetter";
import contactImg from "../assets/contact_img.png";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { token } = useSelector((state) => state.auth);
  console.log(token);

  const contactMutation = useMutation({
    mutationFn: async (formData) => {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/contact/contact-message`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    },
    onSuccess: () => {
      reset();
      toast.success("Message sent successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to send message");
    },
  });

  const onSubmit = (data) => {
    contactMutation.mutate(data);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="text-white">
      <section className="container mx-auto px-4 py-20">
        {/* Header */}
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
          {/* Image */}
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

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 space-y-8"
          >
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8">
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
                    <p>support@reeliic.com</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8">
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#605DFF] to-[#908EFF] mb-6">
                Join Our Team
              </h3>
              <p className="text-gray-400 mb-6">
                We are always looking for passionate individuals to join
                Reeliic. Check out our current openings and be part of our
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
          className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 md:p-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#605DFF] to-[#908EFF]">
            Send Us a Message
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-2xl mx-auto space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name
                </label>
                <input
                  {...register("name", { required: "Name is required" })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#605DFF] text-white"
                  placeholder="Enter your name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Email
                </label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#605DFF] text-white"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Subject
              </label>
              <input
                {...register("subject", { required: "Subject is required" })}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#605DFF] text-white"
                placeholder="What's this about?"
              />
              {errors.subject && (
                <p className="text-red-500 text-sm">{errors.subject.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Your Message
              </label>
              <textarea
                {...register("message", { required: "Message is required" })}
                rows="5"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#605DFF] text-white"
                placeholder="How can we help you?"
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-sm">{errors.message.message}</p>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full px-6 py-4 bg-gradient-to-r from-[#605DFF] to-[#908EFF] text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              {contactMutation.isLoading ? "Sending..." : "Send Message"}
            </motion.button>
          </form>
        </motion.div>
      </section>

      <NewsLetter />
    </div>
  );
}

export default Contact;
