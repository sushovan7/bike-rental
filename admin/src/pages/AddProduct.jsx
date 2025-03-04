import React, { useState } from "react";
import uploadImg from "../assets/uploadimg.png";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";

const BikeCategories = [
  "Dirt",
  "Adventure",
  "Street",
  "Cruiser",
  "Sports",
  "Scooter",
  "Electric",
];

const BikeColors = [
  "Black",
  "White",
  "Red",
  "Blue",
  "Green",
  "Yellow",
  "Orange",
  "Gray",
  "Silver",
  "Maroon",
  "Matte Black",
];

const ABSOptions = ["ABS", "Non-ABS", "Dual-Channel ABS"];

const FrameSizes = ["Small", "Medium", "Large"];

const BikeCondition = ["New", "Perfect", "Good"];

function AddProduct() {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [image5, setImage5] = useState(null);

  const {
    register,
    watch,
    reset,
    handleSubmit,

    formState: { errors },
  } = useForm({
    defaultValues: {
      bikeName: "",
      yearOfManufacture: 1990,
      model: "",
      brandName: "",
      category: "",
      price: 0,
      odometer: 0,
      gears: "",
      cc: 0,
      abs: "",
      frameSize: "",
      rentalPrice: 0,
      condition: "",
      weight: 0,
      description: "",
      bestSeller: false,
      imahes: [],
      colors: [],
    },
  });

  const condition = watch("condition");
  const category = watch("category");

  const isPriceDisabled = condition !== "New";
  const isRentalDisabled = condition === "New";

  const isGearDisabled = category === "Electric";
  const isCCDisabled = category === "Electric";

  function onSubmit(data) {
    console.log(data);

    const formData = new FormData();

    formData.append("bikeName", data.bikeName);
    formData.append("yearOfManufacture", data.yearOfManufacture); //
    formData.append("model", data.model);
    formData.append("brandName", data.brandName);
    formData.append("category", data.category);
    formData.append("condition", data.condition);

    if (data.rentalPrice) {
      formData.append("rentalPrice", parseFloat(data.rentalPrice).toFixed(2));
    }
    if (data.price) {
      formData.append("price", parseFloat(data.price).toFixed(2));
    }
    formData.append("odometer", data.odometer);
    formData.append("gears", data.gears);
    formData.append("cc", data.cc);
    formData.append("abs", data.abs);
    formData.append("frameSize", data.frameSize);
    formData.append("weight", data.weight);
    formData.append("description", data.description);
    data.colors.forEach((color, index) => {
      formData.append(`colors[${index}]`, color);
    });
    formData.append("bestSeller", data.bestSeller);

    image1 && formData.append("image1", image1);
    image1 && formData.append("image2", image2);
    image1 && formData.append("image3", image3);
    image1 && formData.append("image4", image4);
    image1 && formData.append("image5", image5);

    mutation.mutate(formData);
  }

  const mutation = useMutation({
    mutationFn: async (formData) => {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/product/add-product`,
        formData,
        {
          headers: {
            token: localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Product added successfully!");
        reset();
      } else {
        toast.error(data.message || "Failed to add product.");
      }
    },
    onError: (error) => {
      if (error.response) {
        const errorMessage =
          error.response.data?.message ||
          "Failed to add product. Please try again.";
        toast.error(errorMessage);
      } else if (error.request) {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    },
  });

  return (
    <div className="max-w-3xl mx-auto rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-6">Add New Bike</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Bike Name */}
        <div>
          <label className="form-control w-full">
            <span className="label-text">Bike Name</span>
            <input
              {...register("bikeName", { required: "Bike name is required" })}
              type="text"
              placeholder="Enter bike name"
              className="input input-bordered w-full"
            />
          </label>
          {errors.bikeName && (
            <p className="mt-1 text-xs text-red-500">
              {errors.bikeName.message}
            </p>
          )}
        </div>

        {/* Year of Manufacture */}
        <div>
          <label className="form-control w-full">
            <span className="label-text">Year of Manufacture</span>
            <input
              {...register("yearOfManufacture", {
                required: "Year of Manufacture is required",
                min: {
                  value: 1990,
                  message: "Year of manufacture must be above 1989",
                },
                max: {
                  value: new Date().getFullYear(),
                  message: `Year of manufacture must not be greater that year ${new Date().getFullYear()}`,
                },
              })}
              type="number"
              placeholder="YYYY"
              className="input input-bordered w-full"
            />
          </label>
          {errors.yearOfManufacture && (
            <p className="mt-1 text-xs text-red-500">
              {errors.yearOfManufacture.message}
            </p>
          )}
        </div>

        {/* Model */}
        <div>
          <label className="form-control w-full">
            <span className="label-text">Model</span>
            <input
              {...register("model", { required: "Model name is required" })}
              type="text"
              placeholder="Enter model"
              className="input input-bordered w-full"
            />
          </label>
          {errors.model && (
            <p className="mt-1 text-xs text-red-500">{errors.model.message}</p>
          )}
        </div>

        {/* Brand Name */}
        <div>
          <label className="form-control w-full">
            <span className="label-text">Brand Name</span>
            <input
              {...register("brandName", { required: "Brand name is required" })}
              type="text"
              placeholder="Enter brand name"
              className="input input-bordered w-full"
            />
          </label>
          {errors.brandName && (
            <p className="mt-1 text-xs text-red-500">
              {errors.brandName.message}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="form-control w-full">
            <span className="label-text">Category</span>
            <select
              {...register("category", { required: "Category is required" })}
              className="select select-bordered w-full"
              defaultValue=""
            >
              <option value="" disabled>
                Select Category
              </option>
              {BikeCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
          {errors.category && (
            <p className="mt-1 text-xs text-red-500">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Condition */}
        <div>
          <label className="form-control w-full">
            <span className="label-text">Condition</span>
            <select
              {...register("condition", {
                required: "Condition is required",
              })}
              defaultValue=""
              className="select select-bordered w-full"
            >
              <option disabled value="">
                Select Condition
              </option>
              {BikeCondition.map((condition) => (
                <option key={condition} value={condition}>
                  {condition}
                </option>
              ))}
            </select>
          </label>
          {errors.condition && (
            <p className="text-red-500 text-xs mt-1">
              {errors.condition.message}
            </p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="form-control w-full">
            <span className="label-text">Price</span>
            <input
              {...register("price", {
                required: isPriceDisabled ? false : "Price is required",
              })}
              type="number"
              disabled={isPriceDisabled}
              placeholder="Enter price"
              className="input input-bordered w-full"
            />
          </label>
          {errors.price && (
            <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>
          )}
        </div>

        {/* Rental Price */}
        <div>
          <label className="form-control w-full">
            <span className="label-text">Rental Price</span>
            <input
              {...register("rentalPrice", {
                required: isRentalDisabled ? false : "Rental price is required",
              })}
              type="number"
              disabled={isRentalDisabled}
              placeholder="Enter rental price"
              className="input input-bordered w-full"
            />
          </label>
          {errors.rentalPrice && (
            <p className="text-red-500 text-xs mt-1">
              {errors.rentalPrice.message}
            </p>
          )}
        </div>

        {/* Odometer */}
        <div>
          <label className="form-control w-full">
            <span className="label-text">Odometer</span>
            <input
              {...register("odometer")}
              type="number"
              placeholder="Enter kilometers"
              className="input input-bordered w-full"
            />
          </label>
        </div>

        {/* Gears */}
        <div>
          <label className="form-control w-full">
            <span className="label-text">Gears</span>
            <input
              {...register("gears", {
                required: isGearDisabled ? false : "Gear value is required",
                min: { value: 0, message: "Gear value should be at least 0" },
                max: { value: 6, message: "Gear value should not be above 6" },
                pattern: {
                  value: /^\d+$/,
                  message: "Gear value must be a whole number",
                },
              })}
              type="number"
              disabled={isGearDisabled}
              placeholder="Enter number of gears"
              className="input input-bordered w-full"
            />
          </label>
          {errors.gears && (
            <p className="text-red-500 text-xs mt-1">{errors.gears.message}</p>
          )}
        </div>

        {/* CC */}
        <div>
          <label className="form-control w-full">
            <span className="label-text">CC</span>
            <input
              {...register("cc", {
                required: isCCDisabled ? false : "CC value is required",
                min: { value: 0, message: "CC value should be at least 0" },
              })}
              type="number"
              disabled={isCCDisabled}
              placeholder="Enter engine capacity"
              className="input input-bordered w-full"
            />
          </label>
          {errors.cc && (
            <p className="text-red-500 text-xs mt-1">{errors.cc.message}</p>
          )}
        </div>

        {/* ABS */}
        <div>
          <label className="form-control w-full">
            <span className="label-text">ABS</span>
            <select
              {...register("abs", { required: "ABS is required" })}
              defaultValue=""
              className="select select-bordered w-full"
            >
              <option disabled value="">
                Select ABS
              </option>
              {ABSOptions.map((abs) => (
                <option key={abs} value={abs}>
                  {abs}
                </option>
              ))}
            </select>
          </label>
          {errors.abs && (
            <p className="text-red-500 text-xs mt-1">{errors.abs.message}</p>
          )}
        </div>

        {/* Frame Size */}
        <div>
          <label className="form-control w-full">
            <span className="label-text">Frame Size</span>
            <select
              {...register("frameSize")}
              defaultValue=""
              className="select select-bordered w-full"
            >
              <option disabled value="">
                Select Frame Size
              </option>
              {FrameSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Weight */}
        <div>
          <label className="form-control w-full">
            <span className="label-text">Weight</span>
            <input
              {...register("weight")}
              type="number"
              placeholder="Enter weight"
              className="input input-bordered w-full"
            />
          </label>
        </div>

        {/* Product Images */}
        <div className="md:col-span-2">
          <span className="label-text font-semibold">Product Images:</span>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mt-2">
            <label htmlFor="image1" className="cursor-pointer">
              <img
                src={image1 ? URL.createObjectURL(image1) : uploadImg}
                alt="product_image"
                className="w-24 h-24 object-cover border rounded-lg"
              />
              <input
                type="file"
                onChange={(e) => setImage1(e.target.files[0])}
                id="image1"
                hidden
              />
            </label>
            <label htmlFor="image2" className="cursor-pointer">
              <img
                src={image2 ? URL.createObjectURL(image2) : uploadImg}
                alt="product_image"
                className="w-24 h-24 object-cover border rounded-lg"
              />
              <input
                type="file"
                onChange={(e) => setImage2(e.target.files[0])}
                id="image2"
                hidden
              />
            </label>
            <label htmlFor="image3" className="cursor-pointer">
              <img
                src={image3 ? URL.createObjectURL(image3) : uploadImg}
                alt="product_image"
                className="w-24 h-24 object-cover border rounded-lg"
              />
              <input
                type="file"
                onChange={(e) => setImage3(e.target.files[0])}
                id="image3"
                hidden
              />
            </label>
            <label htmlFor="image4" className="cursor-pointer">
              <img
                src={image4 ? URL.createObjectURL(image4) : uploadImg}
                alt="product_image"
                className="w-24 h-24 object-cover border rounded-lg"
              />
              <input
                type="file"
                onChange={(e) => setImage4(e.target.files[0])}
                id="image4"
                hidden
              />
            </label>
            <label htmlFor="image5" className="cursor-pointer">
              <img
                src={image5 ? URL.createObjectURL(image5) : uploadImg}
                alt="product_image"
                className="w-24 h-24 object-cover border rounded-lg"
              />
              <input
                type="file"
                onChange={(e) => setImage5(e.target.files[0])}
                id="image5"
                hidden
              />
            </label>
          </div>
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="form-control">
            <span className="label-text font-semibold">Description</span>
            <textarea
              {...register("description", {
                required: "Description is required",
                min: {
                  value: 20,
                  message: "Description should be at leatt 20 characters long",
                },
              })}
              placeholder="Enter bike details"
              className="textarea textarea-bordered w-full"
            ></textarea>
          </label>
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Colors */}
        <div className="md:col-span-2">
          <label className="form-control">
            <span className="label-text font-semibold">Colors</span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
              {BikeColors.map((color) => (
                <label
                  key={color}
                  className="flex items-center gap-2 p-2 border rounded-lg cursor-pointer"
                >
                  <input
                    {...register("colors", {
                      required: "At least one color is required",
                    })}
                    type="checkbox"
                    value={color}
                    className="checkbox"
                    aria-label={color}
                  />
                  <span className="text-sm">{color}</span>
                </label>
              ))}
            </div>
          </label>
          {errors.colors && (
            <p className="text-red-500 text-xs mt-1">{errors.colors.message}</p>
          )}
        </div>

        {/* Bestseller */}
        <div className="md:col-span-2">
          <label className="flex items-center gap-3">
            <input
              {...register("bestSeller")}
              type="checkbox"
              className="w-5 h-5"
            />
            <span className="label-text font-semibold">Bestseller</span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          disabled={mutation.isPending}
          type="submit"
          className="btn btn-primary md:col-span-2"
        >
          {mutation.isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Add Bike"
          )}
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
