import contactImg from "../assets/contact_img.png";
import Title from "../components/Title";
import NewsLetter from "../components/NewsLetter";
import { useEffect } from "react";

function Contact() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="w-full px-4 md:px-10">
      {/* Section Title */}
      <div className="mt-10 flex justify-center">
        <Title
          text1="CONTACT"
          text2="US"
          className="text-3xl md:text-4xl font-mono tracking-tight text-white"
        />
      </div>

      <div className="flex flex-col lg:flex-row items-center lg:min-h-[40vh] lg:gap-20 mt-10">
        <div className="w-full lg:w-[50%] overflow-hidden">
          <img
            src={contactImg}
            alt="contact-img"
            className="object-cover w-full h-auto lg:h-full rounded-lg shadow-md"
          />
        </div>

        <div className="flex flex-col gap-6 text-gray-400 mt-10 lg:mt-0 lg:w-[50%]">
          <h1 className="font-mono text-lg text-white tracking-tight font-bold">
            Our Office
          </h1>
          <p className="text-base">
            📍 <strong>Location:</strong> Kathmandu, Nepal <br />
            📞 <strong>Phone:</strong> +977-9800000000 <br />
            📧 <strong>Email:</strong> support@reeleiic.com
          </p>

          {/* Careers Section */}
          <div className="flex flex-col gap-6">
            <h1 className="font-mono text-white text-lg tracking-tight font-bold">
              Join Our Team
            </h1>
            <p>
              We are always looking for passionate individuals to join Reeleiic.
            </p>
            <button className=" text-white bg-[#605DFF] px-6 py-3 max-w-[300px] w-[60%] rounded-lg hover:hover:bg-[#635ee8] transition-all">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
      <NewsLetter />
    </div>
  );
}

export default Contact;
