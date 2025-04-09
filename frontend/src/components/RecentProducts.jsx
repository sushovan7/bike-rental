import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Card from "./Card";

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

  if (isPending) return <div>...Loading</div>;
  if (isError) return <div>Error: {isError.message}</div>;

  // Get the top 5 most recent products by sorting by createdAt
  const recentProducts = data?.products
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  return (
    <div className="mb-20">
      <h2 className="text-2xl font-bold mb-4">Recent Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recentProducts && recentProducts.length > 0
          ? recentProducts.map((product) => (
              <Card key={product._id} product={product} />
            ))
          : "No Recent Products Available"}
      </div>
    </div>
  );
}

export default RecentProducts;
