import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Search, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Inventory() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [filterByCategory, setFilterByCategory] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { data, isError, error, isPending } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  useEffect(() => {
    if (!data?.products || !Array.isArray(data.products)) return;

    let filtered = data.products;

    const trimmedSearch = searchInput.trim().toLowerCase();

    if (trimmedSearch.length >= 3) {
      filtered = filtered.filter(
        (product) =>
          product.bikeName.toLowerCase().includes(trimmedSearch) ||
          product.brandName.toLowerCase().includes(trimmedSearch)
      );
    } else {
      filtered = data.products;
    }

    if (filterType) {
      filtered = filtered.filter((product) =>
        filterType === "New"
          ? product.condition === "New"
          : product.condition !== "New"
      );
    }

    if (filterByCategory) {
      filtered = filtered.filter(
        (product) => product.category === filterByCategory
      );
    }

    setFilteredProducts(filtered);
  }, [searchInput, data, filterType, filterByCategory]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  async function fetchProducts() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/product/user/products`
      );

      if (!response.data) {
        throw new Error("Invalid response structure");
      }

      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error("Failed to fetch products");
    }
  }

  if (isPending) {
    return <div>...Loading</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  const itemPerPage = 8;
  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  const noOfPages = Math.ceil(data.products.length / itemPerPage);
  const productsToDisplay = filteredProducts.slice(startIndex, endIndex);

  function handleNext() {
    if (currentPage < noOfPages) setCurrentPage((prev) => prev + 1);
  }
  function handlePrevious() {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  }

  const categories = [
    "Dirt",
    "Adventure",
    "Street",
    "Cruiser",
    "Sports",
    "Scooter",
    "Electric",
    "Naked",
    "Touring",
    "Cafe Racers",
    "Off-Road",
  ];

  return (
    <div className="p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#605DFF] to-[#908EFF]">
            Bike Inventory
          </span>
        </h1>
        <p className="text-gray-400">Explore our wide range of bikes</p>
      </motion.div>

      <motion.div
        layout
        className="flex flex-col md:flex-row gap-4 mb-8 items-start"
      >
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchInput}
            placeholder="Search bikes..."
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#605DFF] text-white"
          />
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg hover:border-[#605DFF] transition-all"
          >
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </button>

          {(filterType || filterByCategory) && (
            <button
              onClick={() => {
                setFilterType("");
                setFilterByCategory("");
              }}
              className="px-4 py-3 text-sm bg-gray-900 border border-gray-800 rounded-lg hover:border-red-500 transition-all"
            >
              Clear Filters
            </button>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8 bg-gray-900 border border-gray-800 rounded-xl overflow-hidden"
          >
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-3">Condition</h3>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="condition"
                      checked={filterType === "New"}
                      onChange={() => setFilterType("New")}
                      className="radio radio-primary"
                    />
                    <span>For Sale</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="condition"
                      checked={filterType === "Used"}
                      onChange={() => setFilterType("Used")}
                      className="radio radio-primary"
                    />
                    <span>For Rent</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="condition"
                      checked={filterType === ""}
                      onChange={() => setFilterType("")}
                      className="radio radio-primary"
                    />
                    <span>All</span>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Category</h3>
                <select
                  value={filterByCategory}
                  onChange={(e) => setFilterByCategory(e.target.value)}
                  className="select w-full bg-gray-900 border-gray-800 focus:border-[#605DFF] focus:ring-[#605DFF]"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mb-6 text-gray-400">
        Showing {productsToDisplay.length} of {filteredProducts.length} bikes
        {(filterType || filterByCategory || searchInput) && (
          <span className="ml-2">(filtered)</span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productsToDisplay && productsToDisplay.length > 0
          ? productsToDisplay.map((product) => (
              <Card key={product._id} product={product} />
            ))
          : "No Products Available"}
      </div>

      <div className="join mt-6 flex gap-4">
        <button
          disabled={currentPage === 1}
          onClick={handlePrevious}
          className="join-item  btn btn-outline btn-primary"
        >
          <ArrowLeft />
        </button>
        <p className="join-item btn btn-primary">Page {currentPage}</p>
        <button
          disabled={currentPage === noOfPages}
          onClick={handleNext}
          className="join-item btn btn-outline btn-primary"
        >
          <ArrowRight />
        </button>
      </div>
    </div>
  );
}

export default Inventory;
