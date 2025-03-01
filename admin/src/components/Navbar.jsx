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
        navigate("/");
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
    <div className="navbar bg-base-100 flex items-center justify-between  border-b border-gray-400 shadow-sm">
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
      {token ? (
        <>
          <button onClick={handleLogout} className="btn btn-primary">
            Logout
          </button>
        </>
      ) : (
        <Link to={"/login"} className="btn btn-primary">
          Login
        </Link>
      )}
    </div>
  );
}

export default Navbar;
