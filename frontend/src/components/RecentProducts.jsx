import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Card from "./Card";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

function RecentProducts() {
  const { data, isError, isPending } = useQuery({
    queryKey: ["recent-products"],
    queryFn: fetchRecentProducts,
  });

  async function fetchRecentProducts() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/product/user/products`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching recent products:", error);
      throw new Error("Failed to fetch recent products");
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
        Error loading recent products
      </div>
    );

  if (!data) {
    return <p>please wait ...</p>;
  }

  const recentProducts = (data?.products || [])
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

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
            New Arrivals
          </span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Check out our latest additions to the collection
        </p>
      </motion.div>

      {recentProducts && recentProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {recentProducts.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <Card product={product} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-900/50 rounded-xl border border-gray-800">
          <p className="text-gray-400">No recent products available</p>
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
    </section>
  );
}

export default RecentProducts;
