import { Bike } from "lucide-react";
import React from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar bg-base-100 border-b border-gray-600 ">
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
          className="menu menu-sm flex flex-col gap-4 dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
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
          className=" flex gap-2 sm:text-2xl items-center font-mono font-bold "
        >
          <Bike size={"20px"} /> Bike Rental
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal flex gap-6 px-1">
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-white font-bold underline " : "text-gray-400"
            }
            to={"/"}
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-white font-bold underline " : "text-gray-400"
            }
            to={"/inventory"}
          >
            Inventory
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-white font-bold underline " : "text-gray-400"
            }
            to={"/about"}
          >
            About
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-white font-bold underline " : "text-gray-400"
            }
            to={"/contact"}
          >
            Contact
          </NavLink>
        </ul>
      </div>

      <div className="navbar-end">
        <Link to={"/login"} className="btn btn-primary">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
