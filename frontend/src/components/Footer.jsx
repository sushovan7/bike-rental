import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.webp";

function Footer() {
  const location = useLocation();

  // Function to scroll the page to the top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="mt-28 sm:flex sm:gap-8 p-4 sm:flex-row w-full flex flex-col gap-12 min-h-[20vh]">
        <div className="flex items-start sm:w-[45%] flex-col gap-6">
          <Link
            to={"/"}
            className=" flex gap-2 sm:text-3xl text-2xl items-center  font-bold italic overflow-hidden"
          >
            <img
              src={logo}
              alt=""
              width={40}
              height={40}
              className="rounded-full"
            />
            REELEIIC
          </Link>
          <p className="w-full text-sm md:w-[75%] text-gray-400">
            Rent a bike and embark on an exciting journey through your city.
            Whether you&apos;re exploring scenic routes, cruising along coastal
            roads, or navigating through bustling streets, our wide selection of
            bikes ensures that you&apos;ll find the perfect ride for your
            adventure. From lightweight road bikes to rugged mountain bikes, we
            offer a variety of options designed for all levels of riders.
            Experience the freedom of cycling, stay fit, and explore hidden gems
            in your city like never before. Choose the bike that suits your
            style and start your adventure today!
          </p>
        </div>
        <div className="sm:flex sm:w-[55%] flex flex-col gap-12 sm:flex-row sm:justify-between">
          <div className="flex items-start flex-col gap-6">
            <h1 className="text-xl font-bold font-mono">COMPANY</h1>
            <ul className="flex flex-col gap-1 text-gray-400">
              <Link
                className={`hover:text-white ${
                  location.pathname === "/"
                    ? "pointer-events-none text-white font-bold"
                    : ""
                }`}
                to={"/"}
              >
                Home
              </Link>
              <Link
                className={`hover:text-white ${
                  location.pathname === "/inventory"
                    ? "pointer-events-none text-white font-bold"
                    : ""
                }`}
                to={"/inventory"}
              >
                Inventory
              </Link>
              <Link
                className={`hover:text-white ${
                  location.pathname === "/about"
                    ? "pointer-events-none text-white font-bold"
                    : null
                }`}
                to={"/about"}
              >
                About
              </Link>
              <Link
                className={`hover:text-white ${
                  location.pathname === "/contact"
                    ? "pointer-events-none text-white font-bold"
                    : null
                }`}
                to={"/contact"}
              >
                Contact
              </Link>
            </ul>
          </div>
          <div className="flex items-start flex-col gap-6">
            <h1 className="text-xl font-bold font-mono">GET IN TOUCH</h1>
            <div className="flex flex-col gap-1 text-gray-400">
              <Link
                className="hover:text-white"
                to="https://www.instagram.com/sushovanbhattarai/"
                target="_blank"
              >
                Instagram
              </Link>
              <Link
                className="hover:text-white"
                to="https://github.com/sushovan7"
                target="_blank"
              >
                Github
              </Link>
              <Link
                className="hover:text-white"
                to="https://www.linkedin.com/in/sushovan-bhattarai-dev/"
                target="_blank"
              >
                Linkedin
              </Link>
            </div>
          </div>
        </div>
      </div>
      <hr className="w-full mt-10 h-[1px] bg-gray-400" />
      <div className="py-4 text-white text-md text-center w-full font-bold">
        Copyright {new Date().getFullYear()}@REELEIIC - All Right Reserved.
      </div>

      {/* Scroll-to-top button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-[#605DFF] text-white rounded-full p-2 shadow-md  focus:outline-none"
        aria-label="Scroll to top"
      >
        ↑
      </button>
    </>
  );
}

export default Footer;
