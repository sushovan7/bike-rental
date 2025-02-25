import aboutImg from "../assets/about-img.jpg";
import Title from "./Title";

function OurMission() {
  return (
    <div className="flex flex-col items-center px-6 py-10 lg:flex-row lg:items-center lg:gap-16">
      <div className="lg:w-1/2 w-full overflow-hidden">
        <img
          src={aboutImg}
          alt="about-us"
          className="object-cover w-full h-full rounded-lg shadow-lg"
        />
      </div>
      <div className="lg:w-1/2 w-full mt-10 lg:mt-0  space-y-6 text-gray-400">
        <Title
          text1="ABOUT"
          text2="US"
          className="text-3xl md:text-4xl text-white font-mono tracking-tight"
        />
        <p>
          At Reeleiic, we strive to revolutionize the bike rental experience by
          making mobility more accessible, affordable, and convenient. Our
          platform is designed to provide users with a seamless way to rent or
          purchase high-quality bikes, whether for daily commutes, leisure
          rides, or long adventures.
        </p>
        <p>
          Since our inception, we have been committed to curating a diverse
          selection of bikes that cater to different needs and preferences. From
          city bikes and mountain bikes to electric options, we ensure that
          every ride is reliable, well-maintained, and ready for the road.
        </p>
        <h1 className="font-mono text-white text-lg tracking-tighter font-bold">
          Our Mission
        </h1>
        <p>
          Our mission is to empower customers by offering flexibility,
          confidence, and a hassle-free rental experience. We prioritize user
          satisfaction by providing an intuitive booking system, transparent
          pricing, and dedicated customer support. Whether you&apos;re exploring
          new routes or simply commuting, Reeleiic is here to make your journey
          smooth, enjoyable, and unforgettable.
        </p>
      </div>
    </div>
  );
}

export default OurMission;
