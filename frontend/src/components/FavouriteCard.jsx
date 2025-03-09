import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Heart } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeFavourite } from "../features/favouriteSlice";

function FavouriteCard({ product }) {
  console.log(product);
  const [isFavourite, setIsFavourite] = useState(true);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const queryClient = useQueryClient();
  const deleteFavouriteMutation = useMutation({
    mutationFn: async (id) => {
      const response = await axios.delete(
        `${
          import.meta.env.VITE_BACKEND_BASE_URL
        }/favourite/products/${id}/favourite`,
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
        toast.success(data.message || "Removed from favourite successfully");
        setIsFavourite(!isFavourite);
        queryClient.invalidateQueries(["getFavourites"]);
        dispatch(removeFavourite({ productId: product.bikeId._id }));
      }
    },
    onError: (error) => {
      if (error.response) {
        const errorMessage =
          error.response.data?.message || "Failed to removed from favourite";
        toast.error(errorMessage);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    },
  });

  function deleteFromfavoutite() {
    deleteFavouriteMutation.mutate(product.bikeId._id);
  }

  return (
    <div className="card bg-base-100 shadow-sm w-full border border-gray-600">
      <div className="relative">
        <button
          onClick={deleteFromfavoutite}
          className="absolute top-1 right-1 btn btn-ghost btn-sm"
        >
          <Heart
            className={`h-7 w-7 ${
              isFavourite ? "text-blue-500 fill-blue-500" : "text-gray-500"
            }`}
          />
        </button>

        <figure>
          <img
            src={product.bikeId?.images[0] || "https://via.placeholder.com/300"}
            alt={product.bikeId.bikeName || "Product Image"}
            className="w-full h-48 sm:h-56 md:h-64 object-cover"
          />
        </figure>
      </div>

      <div className="card-body p-4">
        <h1 className="text-white text-lg font-bold">
          {product.bikeId.bikeName}
        </h1>
        <div className="flex gap-2 mb-2">
          {product.bikeId.condition === "New" ? (
            <div className="badge badge-sm badge-success text-sm">New</div>
          ) : (
            <div className="badge badge-sm badge-info text-sm">Used</div>
          )}
          {product.bikeId.category === "Electric" ? (
            <div className="badge badge-sm bg-accent bg-opacity-50">
              {product.bikeId.category}
            </div>
          ) : (
            <div className="badge badge-sm bg-primary bg-opacity-50">
              {product.bikeId.category}
            </div>
          )}
        </div>

        <p className="text-xs text-gray-400 mb-4">
          {product.bikeId.description
            ? product.bikeId.description.length > 60
              ? `${product.bikeId.description.slice(0, 120)} ...`
              : product.bikeId.description
            : "No description available"}
        </p>

        <div className="card-actions justify-end">
          <Link
            to={{
              pathname: `/product-details/${product.bikeId._id}`,
            }}
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
