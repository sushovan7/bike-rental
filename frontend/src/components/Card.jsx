import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

function Card({ product }) {
  return (
    <div className="card bg-base-100 shadow-sm w-full border border-gray-600">
      <div className="relative">
        <button className="absolute top-1 right-1 btn btn-primary btn-ghost btn-sm">
          <Heart className="h-7 w-7" />
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
            <div className="badge badge-sm badge-success text-sm">
              {product.condition}
            </div>
          ) : (
            <div className="badge badge-sm badge-info text-sm">
              {product.condition}
            </div>
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
            to={{
              pathname: `/product-details/${product._id}`,
              state: { product },
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

export default Card;
