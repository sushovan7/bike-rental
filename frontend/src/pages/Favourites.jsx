import { useQuery } from "@tanstack/react-query";

import axios from "axios";
import { useSelector } from "react-redux";
import FavouriteCard from "../components/FavouriteCard";
import { useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
      console.log(response.data);
      return response.data;
    },
  });

  if (!data) {
    return <p>Please wait a moment ...</p>;
  }

  if (isPending) {
    return <p>Please wait ...</p>;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Favourites</h1>
      {data?.favourites && data.favourites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.favourites.map((product) => (
            <FavouriteCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center mt-4">
          No favourites have been added yet.
        </p>
      )}
      <div className="join mt-6 flex gap-4">
        <button className="join-item  btn btn-outline btn-primary">
          <ArrowLeft />
        </button>
        <p className="join-item btn btn-primary">Page 5</p>
        <button className="join-item btn btn-outline btn-primary">
          <ArrowRight />
        </button>
      </div>
    </div>
  );
}

export default Favourites;
