function NewsLetter() {
  return (
    <div className="w-full py-10 mb-20 flex flex-col gap-6 items-center">
      <div className="text-2xl font-bold mb-4">
        <h1 className=" ">Subscribe Now & Get 10% Off</h1>
      </div>
      <p className="text-sm sm:w-[70%] text-center text-gray-400 mb-6">
        Join our newsletter and enjoy 10% off your first bike rental or
        purchase! Stay updated on the latest deals, new arrivals, and exclusive
        offers. Whether you&apos;re looking to rent for an adventure or buy your
        dream bike, we&apos;ve got you covered!
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:w-[80%]">
        <input
          className="px-4 py-2 border w-full sm:w-[60%] outline-none rounded-md"
          type="email"
          placeholder="Enter your email"
          required
        />
        <button className="btn btn-primary text-lg text-white py-2 px-6 mt-4 sm:mt-0">
          Subscribe
        </button>
      </div>
    </div>
  );
}

export default NewsLetter;
