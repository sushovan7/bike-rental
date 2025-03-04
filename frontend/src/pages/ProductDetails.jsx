function ProductDetails() {
  // Dummy data for bike details
  const bikeDetails = {
    name: "Yamaha MT-15",
    model: "MT-15 V2",
    cc: "155 cc",
    year: "2023",
    category: "Sports Bike",
    color: "Metallic Black",
    gears: "6 Gears",
    abs: "Yes",
    condition: "Brand New",
    description:
      "The Yamaha MT-15 is a sporty naked bike with a powerful 155cc liquid-cooled engine, designed for agility and performance. It features a lightweight chassis, aggressive styling, and advanced technology for an exhilarating ride.",
    weight: "139 kg",
  };

  // Dummy images for the slider
  const bikeImages = [
    "https://images.pexels.com/photos/2607554/pexels-photo-2607554.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/1191109/pexels-photo-1191109.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg?auto=compress&cs=tinysrgb&w=1200",
  ];

  return (
    <div className="p-4 md:p-8">
      {/* Image Slider */}
      <div className="carousel w-full rounded-lg shadow-md mb-8">
        {bikeImages.map((image, index) => (
          <div
            key={index}
            id={`slide${index + 1}`}
            className="carousel-item relative w-full"
          >
            <img
              src={image}
              className="w-full object-cover"
              alt={`Slide ${index + 1}`}
            />
            {/* Navigation Buttons */}
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a
                href={`#slide${index === 0 ? bikeImages.length : index}`}
                className="btn btn-circle btn-ghost"
              >
                ❮
              </a>
              <a
                href={`#slide${
                  index === bikeImages.length - 1 ? 1 : index + 2
                }`}
                className="btn btn-circle btn-ghost"
              >
                ❯
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Bike Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Bike Details */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{bikeDetails.name}</h1>
          <p className="text-gray-600">{bikeDetails.description}</p>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Model</p>
              <p className="font-semibold">{bikeDetails.model}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Engine</p>
              <p className="font-semibold">{bikeDetails.cc}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Year</p>
              <p className="font-semibold">{bikeDetails.year}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Category</p>
              <p className="font-semibold">{bikeDetails.category}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Color</p>
              <p className="font-semibold">{bikeDetails.color}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Gears</p>
              <p className="font-semibold">{bikeDetails.gears}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">ABS</p>
              <p className="font-semibold">{bikeDetails.abs}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Condition</p>
              <p className="font-semibold">{bikeDetails.condition}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Weight</p>
              <p className="font-semibold">{bikeDetails.weight}</p>
            </div>
          </div>
        </div>

        {/* Buy Button */}
        <div className="flex justify-center items-center">
          <button className="btn btn-primary btn-lg w-full md:w-64">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
