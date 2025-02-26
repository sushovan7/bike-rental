import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/logo.webp";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

import { logout } from "../features/auth/authSlice";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);
  console.log(token, user);

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
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
  });

  function handleLogout(data = {}) {
    console.log(data);
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

      <div className="navbar-end">
        {token ? (
          <>
            <div
              className="dropdown dropdown-end"
              onClick={() => setOpen(true)}
            >
              <div tabIndex={0} role="button" className="avatar">
                <div className="ring-primary ring-offset-base-100 w-12 rounded-full ring ring-offset-2">
                  <img
                    className="object-cover"
                    src={user?.avatar || "https://via.placeholder.com/40"}
                    alt="Avatar"
                  />
                </div>
              </div>
              {open && (
                <ul
                  tabIndex={0}
                  className="menu dropdown-content z-50 bg-base-100 rounded-lg shadow-lg w-48 p-2 mt-3"
                >
                  <li>
                    <a className="hover:bg-[#5753E8] rounded-lg">Profile</a>
                  </li>
                  <li>
                    <a className="hover:bg-[#5753E8] rounded-lg">Settings</a>
                  </li>
                  <li>
                    <button
                      className="hover:bg-[#5753E8] rounded-lg"
                      onClick={() => handleLogout()}
                    >
                      Logout
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
