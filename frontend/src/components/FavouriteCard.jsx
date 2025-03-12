import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeFavourite } from "../features/favouriteSlice";

function FavouriteCard({ product }) {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const deleteFavouriteMutation = useMutation({
    mutationFn: async (id) => {
      if (!token) {
        throw new Error("Unauthorized");
      }
      const response = await axios.delete(
        `${
          import.meta.env.VITE_BACKEND_BASE_URL
        }/favourite/products/${id}/favourite`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message || "Removed from favourites successfully");
        queryClient.invalidateQueries(["getFavourites"]);
        dispatch(removeFavourite({ productId: product.bikeId._id }));
      }
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Failed to remove from favourites";
      toast.error(errorMessage);
    },
  });

  if (!product?.bikeId) {
    return null;
  }

  function deleteFromFavourite() {
    if (!token) {
      toast.error("You need to be logged in to remove favourites.");
      return;
    }
    deleteFavouriteMutation.mutate(product.bikeId._id);
  }

  return (
    <div className="card bg-base-100 shadow-sm w-full border border-gray-600">
      <div className="relative">
        <button
          onClick={deleteFromFavourite}
          className="absolute top-1 right-1 btn btn-ghost btn-sm"
        >
          <Heart className="h-7 w-7 text-blue-500 fill-blue-500" />
        </button>
        <figure>
          <img
            src={
              product.bikeId?.images?.[0] || "https://via.placeholder.com/300"
            }
            alt={product.bikeId?.bikeName || "Product Image"}
            className="w-full h-48 sm:h-56 md:h-64 object-cover"
          />
        </figure>
      </div>
      <div className="card-body p-4">
        <h1 className="text-white text-lg font-bold">
          {product.bikeId.bikeName}
        </h1>
        <div className="flex gap-2 mb-2">
          <div
            className={`badge badge-sm ${
              product.bikeId.condition === "New"
                ? "badge-success"
                : "badge-info"
            }`}
          >
            {product.bikeId.condition}
          </div>
          <div
            className={`badge badge-sm ${
              product.bikeId.category === "Electric"
                ? "bg-accent"
                : "bg-primary"
            } bg-opacity-50`}
          >
            {product.bikeId.category}
          </div>
        </div>
        <p className="text-xs text-gray-400 mb-4">
          {product.bikeId.description?.length > 120
            ? `${product.bikeId.description.slice(0, 120)} ...`
            : product.bikeId.description || "No description available"}
        </p>
        <div className="card-actions justify-end">
          <Link
            to={`/product-details/${product.bikeId._id}`}
            className="btn btn-primary btn-md"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FavouriteCard;
