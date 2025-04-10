import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.webp";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const logoutMutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/admin/logout`,
        {},
        {
          headers: {
            token: token,
          },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Logout successful!");
        localStorage.removeItem("token");
        setToken(null);
        navigate("/login");
      }
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "User logout failed.";
      toast.error(errorMessage);
    },
  });

  function handleLogout() {
    logoutMutation.mutate();
  }

  return (
    <div className="navbar bg-base-100 flex items-center justify-between border-b mb-5 border-gray-600 px-4">
      <div className="flex items-center gap-2  w-[60vw]">
        {" "}
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
            <Link to={"/"}>Dashboard</Link>
            <Link to={"/add-product"}>Add Product</Link>
            <Link to={"/product-display"}> All Products</Link>
            <Link to={"/users"}>All Users</Link>
            <Link to={"/kyc-request"}>Kyc-Request</Link>
            <Link to="/orders">All Orders</Link>
            <Link to="/add-message">Add Message</Link>
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
      </div>

      {token ? (
        <>
          <button onClick={handleLogout} className="btn btn-primary">
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to={"/login"} className="btn btn-primary">
            Login
          </Link>
        </>
      )}
    </div>
  );
}

export default Navbar;
