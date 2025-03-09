import { Heart, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { createFavourite } from "../features/favouriteSlice";

function Card({ product }) {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const favouriteData = useSelector((state) => state.favourite.favouriteData);
  const isFavourite = favouriteData.some((fav) => fav.bikeId === product._id);

  const queryClient = useQueryClient();

  const createFavouriteMutation = useMutation({
    mutationFn: async (id) => {
      const response = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_BASE_URL
        }/favourite/products/${id}/favourite`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message || "Added to favourite successfully");

        queryClient.invalidateQueries(["getFavourites"]);
        dispatch(createFavourite({ favouriteData: data.favourite }));
      }
    },
    onError: (error) => {
      if (error.response) {
        const errorMessage =
          error.response.data?.message || "Failed to add in favourite";
        toast.error(errorMessage);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    },
  });

  function addToFavourite() {
    createFavouriteMutation.mutate(product._id);
  }

  return (
    <div className="card bg-base-100 shadow-sm w-full border border-gray-600">
      <div className="relative">
        <button
          onClick={addToFavourite}
          className="absolute top-1 right-1 btn btn-ghost btn-sm"
          disabled={createFavouriteMutation.isLoading}
        >
          {createFavouriteMutation.isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin mr-1" />
          ) : (
            <Heart
              className={`h-7 w-7 ${
                isFavourite ? "text-blue-500 fill-blue-500" : "text-gray-500"
              }`}
            />
          )}
        </button>

        <figure>
          <img
            src={product.images[0] || "https://via.placeholder.com/300"}
            alt={product.bikeName || "Product Image"}
            className="w-full h-48 sm:h-56 md:h-64 object-cover"
          />
        </figure>
      </div>

      <div className="card-body p-4">
        <h1 className="text-white text-lg font-bold">{product.bikeName}</h1>
        <div className="flex gap-2 mb-2">
          {product.condition === "New" ? (
            <div className="badge badge-sm badge-success text-sm">New</div>
          ) : (
            <div className="badge badge-sm badge-info text-sm">Used</div>
          )}
          {product.category === "Electric" ? (
            <div className="badge badge-sm bg-accent bg-opacity-50">
              {product.category}
            </div>
          ) : (
            <div className="badge badge-sm bg-primary bg-opacity-50">
              {product.category}
            </div>
          )}
        </div>

        <p className="text-xs text-gray-400 mb-4">
          {product.description
            ? product.description.length > 60
              ? `${product.description.slice(0, 120)} ...`
              : product.description
            : "No description available"}
        </p>

        <div className="card-actions justify-end">
          <Link
            to={`/product-details/${product._id}`}
            className="btn btn-primary btn-md"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Card;
