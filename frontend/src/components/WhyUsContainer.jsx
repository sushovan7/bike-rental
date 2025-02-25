function WhyUsContainer() {
  const features = [
    {
      title: "Reliable & Well-Maintained Bikes",
      description:
        "We offer a wide range of high-quality, regularly serviced bikes to ensure a smooth and safe ride.",
    },
    {
      title: "Hassle-Free Rentals & Purchases",
      description:
        "Our seamless booking and purchasing process makes it easy to rent or buy your perfect bike in just a few clicks.",
    },
    {
      title: "Dedicated Customer Support",
      description:
        "Our team is always ready to assist you, whether you need help choosing a bike, understanding rental policies, or resolving any concerns.",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row justify-center gap-8 px-6 py-10">
      {features.map((feature, index) => (
        <div
          key={index}
          className="bg-gray-100 p-6 rounded-lg shadow-md w-full md:w-1/3 text-gray-700"
        >
          <h3 className="font-bold text-lg">{feature.title}</h3>
          <p className="mt-2">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}

export default WhyUsContainer;
