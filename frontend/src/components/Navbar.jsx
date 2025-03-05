import logo from "../assets/logo.webp";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { Bell, Heart, LogOut } from "lucide-react";
import axios from "axios";

function Navbar() {
  const [isKycVerified, setIsKycVerified] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const mutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: async (logoutData) => {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/logout`,
        logoutData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        dispatch(logout());
        toast.success("Logout successful!");
        navigate("/");
      }
    },
    onError: (error) => {
      if (error.response) {
        const errorMessage =
          error.response.data?.message || "User Logout failed.";
        toast.error(errorMessage);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    },
  });

  function handleLogout(data = {}) {
    mutation.mutate(data);
  }

  return (
    <div className="navbar bg-base-100 border-b mb-5 border-gray-600 px-4">
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm flex flex-col gap-4 dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2  pb-4 shadow-lg"
        >
          <Link to={"/"}>Home</Link>
          <Link to={"/inventory"}>Inventory</Link>
          <Link to={"/about"}>About</Link>
          <Link to={"/contact"}>Contact</Link>
        </ul>
      </div>
      <div className="navbar-start">
        <Link
          to={"/"}
          className=" flex gap-2 sm:text-2xl items-center  font-bold italic overflow-hidden"
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
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal flex gap-8 px-4 py-2">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-white font-bold underline"
                : "text-gray-400 hover:text-gray-200 transition-colors duration-200"
            }
            to={"/"}
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-white font-bold underline"
                : "text-gray-400 hover:text-gray-200 transition-colors duration-200"
            }
            to={"/inventory"}
          >
            Inventory
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-white font-bold underline"
                : "text-gray-400 hover:text-gray-200 transition-colors duration-200"
            }
            to={"/about"}
          >
            About
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-white font-bold underline"
                : "text-gray-400 hover:text-gray-200 transition-colors duration-200"
            }
            to={"/contact"}
          >
            Contact
          </NavLink>
        </ul>
      </div>

      <div className="navbar-end flex items-center gap-4">
        {token ? (
          <>
            <Link to={"/notifications"} className="relative">
              <div className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-[#5753E8] flex items-center justify-center text-xs">
                1
              </div>
              <Bell size={24} />
            </Link>
            <Link to={"/favourites"} className="relative">
              <div className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-[#5753E8] flex items-center justify-center text-xs">
                2
              </div>
              <Heart size={24} />
            </Link>
            <div
              className="dropdown dropdown-end ml-2"
              onClick={() => setOpen(true)}
            >
              <div tabIndex={0} role="button" className="avatar">
                {isKycVerified ? (
                  <>
                    <div className="avatar">
                      <div className="avatar online ">
                        <div className="w-12 rounded-full">
                          <img
                            src={
                              user?.avatar ||
                              "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="avatar offline">
                      <div className="w-12 rounded-full">
                        <img
                          src={
                            user?.avatar ||
                            "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                          }
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
              {open && (
                <ul
                  tabIndex={0}
                  className="menu dropdown-content z-50 bg-base-100 rounded-lg shadow-lg w-48 p-4 mt-3"
                >
                  <li>
                    <Link
                      to={"profile"}
                      className="hover:bg-[#5753E8] rounded-lg"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/orders"
                      className="hover:bg-[#5753E8] rounded-lg"
                    >
                      Orders
                    </Link>
                  </li>
                  <li>
                    <a className="hover:bg-[#5753E8] rounded-lg">Verify Kyc</a>
                  </li>
                  <li>
                    <button
                      className="hover:bg-[#5753E8] rounded-lg"
                      onClick={() => handleLogout()}
                    >
                      <LogOut size={18} className="mr-1" /> Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </>
        ) : (
          <Link to={"/login"} className="btn btn-primary">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
