import { ArrowLeft, ArrowRight, Heart } from "lucide-react";

function Inventory() {
  return (
    <div className="p-4">
      {/* Search and Filters Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search products..."
          className="input input-bordered w-full md:w-64"
        />

        {/* New/Not New Dropdown */}
        <select className="select select-bordered w-full md:w-48">
          <option disabled selected>
            Filter by New
          </option>
          <option>New</option>
          <option>For rent</option>
        </select>

        {/* Price Range Dropdown */}
        <select className="select select-bordered w-full md:w-48">
          <option disabled selected>
            Filter by Price
          </option>
          <option>Low to High</option>
          <option>High to Low</option>
        </select>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Card */}
        <div className="card bg-base-100 shadow-sm w-full">
          <div className="relative">
            {/* Heart Icon */}
            <button className="absolute top-2 right-2 btn btn-circle btn-ghost btn-sm">
              <Heart className="h-5 w-5" />
            </button>

            {/* Image */}
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Product"
                className="w-full h-48 sm:h-56 md:h-64 object-cover"
              />
            </figure>
          </div>

          {/* Card Body */}
          <div className="card-body p-4">
            {/* Badges */}
            <div className="flex gap-2 mb-2">
              <div className="badge badge-sm badge-secondary text-sm">New</div>
              <div className="badge badge-sm badge-outline text-sm">
                Fashion
              </div>
            </div>

            {/* Short Description */}
            <p className="text-xs text-gray-400 mb-4">
              This is a short description of the product. It provides a brief
              overview of what the product is about.
            </p>

            {/* View Details Button */}
            <div className="card-actions justify-end">
              <button className="btn btn-primary btn-sm">View Details</button>
            </div>
          </div>
        </div>

        {/* Repeat the card for demonstration */}
        {/* Card 2 */}
        <div className="card bg-base-100 shadow-sm w-full">
          <div className="relative">
            <button className="absolute top-2 right-2 btn btn-circle btn-ghost btn-sm">
              <Heart className="h-5 w-5" />
            </button>
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Product"
                className="w-full h-48 sm:h-56 md:h-64 object-cover"
              />
            </figure>
          </div>
          <div className="card-body p-4">
            <div className="flex gap-2 mb-2">
              <div className="badge badge-sm badge-secondary text-sm">New</div>
              <div className="badge badge-sm badge-outline text-sm">
                Fashion
              </div>
            </div>
            <p className="text-xs text-gray-400 mb-4">
              This is a short description of the product. It provides a brief
              overview of what the product is about.
            </p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary btn-sm">View Details</button>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="card bg-base-100 shadow-sm w-full">
          <div className="relative">
            <button className="absolute top-2 right-2 btn btn-circle btn-ghost btn-sm">
              <Heart className="h-5 w-5" />
            </button>
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Product"
                className="w-full h-48 sm:h-56 md:h-64 object-cover"
              />
            </figure>
          </div>
          <div className="card-body p-4">
            <div className="flex gap-2 mb-2">
              <div className="badge badge-sm badge-secondary text-sm">New</div>
              <div className="badge badge-sm badge-outline text-sm">
                Fashion
              </div>
            </div>
            <p className="text-xs text-gray-400 mb-4">
              This is a short description of the product. It provides a brief
              overview of what the product is about.
            </p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary btn-sm">View Details</button>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="card bg-base-100 shadow-sm w-full">
          <div className="relative">
            <button className="absolute top-2 right-2 btn btn-circle btn-ghost btn-sm">
              <Heart className="h-5 w-5" />
            </button>
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Product"
                className="w-full h-48 sm:h-56 md:h-64 object-cover"
              />
            </figure>
          </div>
          <div className="card-body p-4">
            <div className="flex gap-2 mb-2">
              <div className="badge badge-sm badge-secondary text-sm">New</div>
              <div className="badge badge-sm badge-outline text-sm">
                Fashion
              </div>
            </div>
            <p className="text-xs text-gray-400 mb-4">
              This is a short description of the product. It provides a brief
              overview of what the product is about.
            </p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary btn-sm">View Details</button>
            </div>
          </div>
        </div>
      </div>
      <div className="join mt-6 flex gap-4">
        <button className="join-item  btn btn-outline btn-primary">
          <ArrowLeft />
        </button>
        <button className="join-item btn btn-primary">Page 22</button>
        <button className="join-item btn btn-outline btn-primary">
          <ArrowRight />
        </button>
      </div>
    </div>
  );
}

export default Inventory;
