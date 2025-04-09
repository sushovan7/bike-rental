import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { ArrowLeft, ArrowRight, Heart } from "lucide-react";
import FavouriteCard from "../components/FavouriteCard";

function Favourites() {
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const { data, isError, error, isPending } = useQuery({
    queryKey: ["getFavourites"],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/favourite/favourites`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
  });

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#605DFF]"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-red-400">
        {error.message}
      </div>
    );
  }

  return (
    <div className=" text-white min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#605DFF] to-[#908EFF]">
              Your Favourites
            </span>
          </h1>
          <p className="text-gray-400">Your saved bikes for easy access</p>
        </motion.div>

        {data?.favourites && data.favourites.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {data.favourites.map((product) => (
                <motion.div
                  key={product._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FavouriteCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-20 bg-gray-900/50 rounded-xl border border-gray-800"
          >
            <Heart className="h-12 w-12 mx-auto text-gray-500 mb-4" />
            <h3 className="text-xl font-medium mb-2">No favourites yet</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              You haven&apos;t saved any bikes to your favourites. Start
              exploring!
            </p>
          </motion.div>
        )}

        {data?.favourites && data.favourites.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center mt-12"
          >
            <div className="join flex gap-2 ">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="join-item btn btn-outline border-gray-700 hover:bg-gray-800 hover:border-gray-600"
              >
                <ArrowLeft className="h-5 w-5" />
              </motion.button>
              <button className="join-item btn bg-[#605DFF] border-[#605DFF] hover:bg-[#5654E7] hover:border-[#5654E7]">
                Page 1
              </button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="join-item btn btn-outline border-gray-700 hover:bg-gray-800 hover:border-gray-600"
              >
                <ArrowRight className="h-5 w-5" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Favourites;
