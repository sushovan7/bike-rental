import React, { useState } from "react";
import uploadImg from "../assets/uploadimg.png";

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
  return (
    <div className="max-w-3xl mx-auto p-6  rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add New Bike</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="form-control w-full">
          <span className="label-text">Bike Name</span>
          <input
            type="text"
            placeholder="Enter bike name"
            className="input input-bordered w-full"
            required
          />
        </label>
        <label className="form-control w-full">
          <span className="label-text">Year of Manufacture</span>
          <input
            type="number"
            placeholder="YYYY"
            className="input input-bordered w-full"
            required
          />
        </label>
        <label className="form-control w-full">
          <span className="label-text">Model</span>
          <input
            type="text"
            placeholder="Enter model"
            className="input input-bordered w-full"
            required
          />
        </label>
        <label className="form-control w-full">
          <span className="label-text">Brand Name</span>
          <input
            type="text"
            placeholder="Enter brand name"
            className="input input-bordered w-full"
            required
          />
        </label>
        <label className="form-control w-full">
          <span className="label-text">Category</span>
          <select className="select select-bordered w-full" required>
            <option disabled selected>
              Select Category
            </option>
            {BikeCategories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </label>
        <label className="form-control w-full">
          <span className="label-text">Price</span>
          <input
            type="number"
            placeholder="Enter price"
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control w-full">
          <span className="label-text">Odometer</span>
          <input
            type="number"
            placeholder="Enter kilometers"
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control w-full">
          <span className="label-text">Colors</span>
          <select className="select select-bordered w-full" required>
            <option disabled selected>
              Select Colors
            </option>
            {BikeColors.map((color) => (
              <option key={color}>{color}</option>
            ))}
          </select>
        </label>
        <label className="form-control w-full">
          <span className="label-text">Gears</span>
          <input
            type="number"
            placeholder="Enter number of gears"
            className="input input-bordered w-full"
            required
          />
        </label>
        <label className="form-control w-full">
          <span className="label-text">CC</span>
          <input
            type="number"
            placeholder="Enter engine capacity"
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control w-full">
          <span className="label-text">ABS</span>
          <select className="select select-bordered w-full" required>
            <option disabled selected>
              Select Abs
            </option>
            {ABSOptions.map((abs) => (
              <option key={abs}>{abs}</option>
            ))}
          </select>
        </label>
        <label className="form-control w-full">
          <span className="label-text">Frame Size</span>
          <select className="select select-bordered w-full">
            <option disabled selected>
              Select Frame Size
            </option>
            {FrameSizes.map((size) => (
              <option key={size}>{size}</option>
            ))}
          </select>
        </label>
        <label className="form-control w-full">
          <span className="label-text">Rental Price</span>
          <input
            type="number"
            placeholder="Enter rental price"
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control w-full">
          <span className="label-text">Condition</span>

          <select className="select select-bordered w-full" required>
            <option disabled selected>
              Select Condition
            </option>
            {BikeCondition.map((condition) => (
              <option key={condition}>{condition}</option>
            ))}
          </select>
        </label>
        <label className="form-control w-full">
          <span className="label-text">Weight</span>
          <input
            type="text"
            placeholder="Enter weight"
            className="input input-bordered w-full"
          />
        </label>
        <br />
        <span className="label-text">Product images:</span>
        <br />
        <div className="flex gap-2">
          <label htmlFor="image1" className="cursor-pointer overflow-hidden">
            <img
              width="100px"
              height="100px"
              src={image1 ? URL.createObjectURL(image1) : uploadImg}
              alt="profile_image"
              className="object-cover"
            />{" "}
            <input type="file" id="image1" hidden />
          </label>
          <label htmlFor="image2" className="cursor-pointer overflow-hidden">
            <img
              width="100px"
              height="100px"
              src={image2 ? URL.createObjectURL(image2) : uploadImg}
              alt="profile_image"
              className="object-cover"
            />{" "}
            <input type="file" id="image2" hidden />
          </label>
          <label htmlFor="image3" className="cursor-pointer overflow-hidden">
            <img
              width="100px"
              height="100px"
              src={image3 ? URL.createObjectURL(image3) : uploadImg}
              alt="profile_image"
              className="object-cover"
            />{" "}
            <input type="file" id="image3" hidden />
          </label>
          <label htmlFor="image4" className="cursor-pointer overflow-hidden">
            <img
              width="100px"
              height="100px"
              src={image4 ? URL.createObjectURL(image4) : uploadImg}
              alt="profile_image"
              className="object-cover"
            />{" "}
            <input type="file" id="image4" hidden />
          </label>
          <label htmlFor="image5" className="cursor-pointer overflow-hidden">
            <img
              width="100px"
              height="100px"
              src={image5 ? URL.createObjectURL(image5) : uploadImg}
              alt="profile_image"
              className="object-cover"
            />{" "}
            <input type="file" id="image5" hidden />
          </label>
        </div>

        <label className="form-control w-full md:col-span-2">
          <span className="label-text">Description</span>
          <textarea
            placeholder="Enter bike details"
            className="textarea textarea-bordered w-full"
            required
          ></textarea>
        </label>
        <button className="btn btn-primary md:col-span-2">Add Bike</button>
      </form>
    </div>
  );
}

export default AddProduct;
