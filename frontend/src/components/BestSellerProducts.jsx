// src/components/BestsellerProducts.js
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Card from "./Card";

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

  if (isPending) return <div>...Loading</div>;
  if (isError) return <div>Error: {isError.message}</div>;

  const bestsellerProducts = data?.products
    .filter((product) => product.bestSeller === true)
    .slice(0, 4);

  return (
    <div className=" mb-20">
      <h2 className="text-2xl font-bold mb-4">Bestseller Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {bestsellerProducts && bestsellerProducts.length > 0
          ? bestsellerProducts.map((product) => (
              <Card key={product._id} product={product} />
            ))
          : "No Bestseller Products Available"}
      </div>
    </div>
  );
}

export default BestsellerProducts;
