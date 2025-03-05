import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Card from "../components/Card";

function Inventory() {
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

  const { data, isError, error, isPending } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isPending) {
    return <div>...Loading</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search products..."
          className="input input-bordered w-full md:w-64"
        />

        <select className="select select-bordered w-full md:w-48">
          <option disabled selected>
            Filter by New
          </option>
          <option>New</option>
          <option>For rent</option>
        </select>

        <select className="select select-bordered w-full md:w-48">
          <option disabled selected>
            Filter by Price
          </option>
          <option>Low to High</option>
          <option>High to Low</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.products &&
          data.products.length > 0 &&
          data.products.map((product) => (
            <Card key={product._id} product={product} />
          ))}
      </div>
      <div className="join mt-6 flex gap-4">
        <button className="join-item  btn btn-outline btn-primary">
          <ArrowLeft />
        </button>
        <button className="join-item btn btn-primary">Page 22</button>
        <button className="join-item btn btn-outline btn-primary">
          <ArrowRight />
        </button>
      </div>
    </div>
  );
}

export default Inventory;
