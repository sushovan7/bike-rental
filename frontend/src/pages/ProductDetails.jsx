import axios from "axios";
import {
  Ban,
  Bike,
  Bitcoin,
  CalendarRange,
  CircleGauge,
  Cog,
  Dumbbell,
  Frame,
  Fuel,
  SquareMenu,
  ThumbsUp,
  Wrench,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ReviewSection from "../components/ReviewSection";
import { useEffect } from "react";
import BestsellerProducts from "../components/BestSellerProducts";
import RecentProducts from "../components/RecentProducts";

function ProductDetails() {
  const { token } = useSelector((state) => state.auth);
  const { productId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  async function fetchProducts() {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_BASE_URL
        }/product/user/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
    queryKey: ["products", productId],
    queryFn: fetchProducts,
  });

  if (isPending) {
    return <div>...Loading</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  if (!data || !data.product) {
    return <div>No product data available.</div>;
  }

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="container mx-auto p-4 flex flex-col">
      <div className="flex flex-col items-start justify-start">
        <h1 className="text-3xl font-mono font-bold">
          {data.product.bikeName}
        </h1>
        <p className="">
          Your dream BIKE for{" "}
          {data.product.condition === "New" ? "sale" : "rent"}
        </p>
        <div className="rating rating-xs mt-2">
          <input
            type="radio"
            name="rating-5"
            className="mask mask-star-2 bg-orange-400"
            aria-label="1 star"
          />
          <input
            type="radio"
            name="rating-5"
            className="mask mask-star-2 bg-orange-400"
            aria-label="2 star"
            defaultChecked
          />
          <input
            type="radio"
            name="rating-5"
            className="mask mask-star-2 bg-orange-400"
            aria-label="3 star"
          />
          <input
            type="radio"
            name="rating-5"
            className="mask mask-star-2 bg-orange-400"
            aria-label="4 star"
          />
          <input
            type="radio"
            name="rating-5"
            className="mask mask-star-2 bg-orange-400"
            aria-label="5 star"
          />
        </div>
      </div>

      <div className="flex items-start gap-4 mt-5 flex-wrap">
        <div className="badge badge-soft badge-primary px-3 py-5 rounded-full">
          <CalendarRange /> {data.product.yearOfManufacture}
        </div>
        <div className="badge badge-soft badge-primary px-3 py-5 rounded-full">
          <Bike /> {data.product.category}
        </div>
        <div className="badge badge-soft badge-primary px-3 py-5 rounded-full">
          <CircleGauge /> {data.product.odometer}
        </div>
        <div className="badge badge-soft badge-primary px-3 py-5 rounded-full">
          <Fuel />{" "}
          {data.product.category !== "Electric" ? "Petrol" : "Electric"}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="md:col-span-2">
          <Carousel
            responsive={responsive}
            containerClass="w-full"
            itemClass="w-full"
            infinite={true}
          >
            {data.product.images.map((image, i) => (
              <div
                key={i}
                className="w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-lg"
              >
                <img
                  src={image}
                  alt={`${data.product.bikeName} - Image ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </Carousel>

          <div className="mt-6 p-6 border rounded-lg border-gray-600 shadow">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-400 text-sm">{data.product.description}</p>
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="p-6 rounded-lg border border-gray-600 shadow">
            <h2 className="text-xl font-semibold mb-4">Our Price</h2>
            <div className="text-2xl font-bold text-primary">
              <p>
                {data.product.condition === "New" ? (
                  <span>
                    Rs{" "}
                    {data.product.discountPrice
                      ? data.product.price - data.product.discountPrice
                      : data.product.price}
                  </span>
                ) : (
                  <span>
                    Rs{" "}
                    {data.product.discountRentalPrice
                      ? data.product.rentalPrice -
                        data.product.discountRentalPrice
                      : data.product.rentalPrice}
                    /day
                  </span>
                )}
              </p>
              <p className="text-sm line-through decoration-2 decoration-gray-900 text-gray-300">
                {data.product.condition === "New" &&
                  data.product.discountPrice && (
                    <span>Rs {data.product.price}</span>
                  )}
                {data.product.condition !== "New" &&
                  data.product.discountRentalPrice && (
                    <span>Rs {data.product.rentalPrice}</span>
                  )}
              </p>
            </div>
            <button
              onClick={() => navigate(`/place-order/${productId}`)}
              className="mt-4 text-lg cursor-pointer w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transitionn font-bold"
            >
              {data.product.condition === "New" ? "Buy Bike" : "Rent Bike"}
            </button>
          </div>

          <div className="mt-6 rounded-lg p-6 border border-gray-600 shadow">
            <h2 className="text-xl font-semibold mb-4">Specifications</h2>
            <ul className="space-y-2">
              <li className="flex  items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="badge flex items-center justify-center h-10 w-10 rounded-full badge-soft badge-primary">
                    <Bike size={20} />
                  </div>
                  <p> Category</p>
                </div>
                <p>{data.product.category}</p>
              </li>
              <li className="flex  items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="badge flex items-center justify-center h-10 w-10 rounded-full badge-soft badge-primary">
                    <ThumbsUp size={20} />
                  </div>
                  <p> Contition</p>
                </div>
                <p>{data.product.condition === "New" ? "New" : "Used"}</p>
              </li>
              <li className="flex  items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="badge flex items-center justify-center h-10 w-10 rounded-full badge-soft badge-primary">
                    <SquareMenu size={20} />
                  </div>
                  <p>Name</p>
                </div>
                <p>{data.product.bikeName}</p>
              </li>
              <li className="flex  items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="badge flex items-center justify-center h-10 w-10 rounded-full badge-soft badge-primary">
                    <Bitcoin size={20} />
                  </div>
                  <p>Brand name</p>
                </div>
                <p>{data.product.brandName}</p>
              </li>
              <li className="flex  items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="badge flex items-center justify-center h-10 w-10 rounded-full badge-soft badge-primary">
                    <Bike size={20} />
                  </div>
                  <p>Model</p>
                </div>
                <p>{data.product.model}</p>
              </li>
              <li className="flex  items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="badge flex items-center justify-center h-10 w-10 rounded-full badge-soft badge-primary">
                    <CalendarRange size={20} />
                  </div>
                  <p> Year</p>
                </div>
                <p>{data.product.yearOfManufacture}</p>
              </li>
              <li className="flex  items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="badge flex items-center justify-center h-10 w-10 rounded-full badge-soft badge-primary">
                    <Fuel size={20} />
                  </div>
                  <p>Fuel Type</p>
                </div>
                <p>
                  {data.product.category === "Electric" ? "Electric" : "Petrol"}
                </p>
              </li>
              <li className="flex  items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="badge flex items-center justify-center h-10 w-10 rounded-full badge-soft badge-primary">
                    <CircleGauge size={20} />
                  </div>
                  <p>Odometer</p>
                </div>
                <p>{data.product.odometer}</p>
              </li>
              <li className="flex  items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="badge flex items-center justify-center h-10 w-10 rounded-full badge-soft badge-primary">
                    <Wrench size={20} />
                  </div>
                  <p>CC</p>
                </div>
                <p>{data.product.cc}</p>
              </li>

              <li className="flex  items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="badge flex items-center justify-center h-10 w-10 rounded-full badge-soft badge-primary">
                    <Frame size={20} />
                  </div>
                  <p>Frame size</p>
                </div>
                <p>{data.product.frameSize}</p>
              </li>
              <li className="flex  items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="badge flex items-center justify-center h-10 w-10 rounded-full badge-soft badge-primary">
                    <Ban size={20} />
                  </div>
                  <p>ABS</p>
                </div>
                <p>{data.product.abs}</p>
              </li>
              <li className="flex  items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="badge flex items-center justify-center h-10 w-10 rounded-full badge-soft badge-primary">
                    <Cog size={20} />
                  </div>
                  <p>Gears</p>
                </div>
                <p>{data.product.gears}</p>
              </li>
              <li className="flex  items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="badge flex items-center justify-center h-10 w-10 rounded-full badge-soft badge-primary">
                    <Dumbbell size={20} />
                  </div>
                  <p>Dry weight</p>
                </div>
                <p>{data.product.weight}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <ReviewSection productId={productId} />
      <BestsellerProducts />
      <RecentProducts />
    </div>
  );
}

export default ProductDetails;
