import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Card from "../components/Card";
import { useEffect, useState } from "react";

function Inventory() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [filterByCategory, setFilterByCategory] = useState("");

  const { data, isError, error, isPending } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  useEffect(() => {
    if (!data?.products || !Array.isArray(data.products)) return;

    let filtered = data.products;
    console.log("Original products:", filtered);

    const trimmedSearch = searchInput.trim().toLowerCase();

    if (trimmedSearch.length >= 3) {
      filtered = filtered.filter(
        (product) =>
          product.bikeName.toLowerCase().includes(trimmedSearch) ||
          product.brandName.toLowerCase().includes(trimmedSearch)
      );
    } else {
      filtered = data.products; // Reset if search is cleared
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

    console.log("Filtered products:", filtered);
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

  const itemPerPage = 10;
  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  const noOfPages = Math.ceil(data.products.length / itemPerPage);
  const productsToDisplay = filteredProducts.slice(startIndex, endIndex);

  // filter code

  function handleNext() {
    if (currentPage < noOfPages) setCurrentPage((prev) => prev + 1);
  }
  function handlePrevious() {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  }

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Search Bar */}
        <input
          type="text"
          value={searchInput}
          placeholder="Search products..."
          onChange={(e) => setSearchInput(e.target.value)}
          className="input input-bordered w-full md:w-64"
        />

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="select select-bordered w-full md:w-48"
        >
          <option value="">Filter by Condition</option>
          <option value="New">New</option>
          <option value="Used">Used</option>
        </select>

        <select
          value={filterByCategory}
          onChange={(e) => setFilterByCategory(e.target.value)}
          className="select select-bordered w-full md:w-48"
        >
          <option value="">Filter by Category</option>
          <option value="Dirt">Dirt</option>
          <option value="Adventure">Adventure</option>
          <option value="Street">Street</option>
          <option value="Cruiser">Cruiser</option>
          <option value="Sports">Sports</option>
          <option value="Scooter">Scooter</option>
          <option value="Electric">Electric</option>
          <option value="Naked">Naked</option>
          <option value="Touring">Touring</option>
          <option value="Cafe Racers">Cafe Racers</option>
          <option value="Off-Road">Off-Road</option>
        </select>
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
