// src/components/BestsellerProducts.js
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Card from "./Card";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function BestsellerProducts() {
  const { data, isError, isPending } = useQuery({
    queryKey: ["bestseller-products"],
    queryFn: fetchBestsellerProducts,
  });

  async function fetchBestsellerProducts() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/product/user/products`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching bestseller products:", error);
      throw new Error("Failed to fetch bestseller products");
    }
  }

  if (isPending)
    return (
      <div className="container mx-auto px-4 py-20 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#605DFF]"></div>
      </div>
    );

  if (isError)
    return (
      <div className="container mx-auto px-4 py-20 text-center text-red-400">
        Error loading products
      </div>
    );

  if (!data) {
    return <p>Please ait ...</p>;
  }

  const bestsellerProducts = (data?.products || [])
    .filter((product) => product.bestSeller === true)
    .slice(0, 4);

  return (
    <section className="container mx-auto px-4 mb-32">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#605DFF] to-[#908EFF]">
              Bestseller Bikes
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover our most popular rides loved by customers worldwide
          </p>
        </div>

        {bestsellerProducts && bestsellerProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestsellerProducts.map((product) => (
              <motion.div
                key={product._id}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Card product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-900/50 rounded-xl border border-gray-800">
            <p className="text-gray-400">No bestseller products available</p>
          </div>
        )}

        <div className="text-center mt-16">
          <Link
            to="/inventory"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gray-800 hover:bg-gray-700 rounded-full text-white font-medium transition-colors"
          >
            View All Bikes
            <ArrowRight size={18} />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

export default BestsellerProducts;
