import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="px-4 border-r border-gray-400 min-h-[80vh] flex flex-col space-y-4 py-4">
      <NavItem to="/" label="Dashboard" />
      <NavItem to="/add-product" label="Add Product" />
      <NavItem to="/product-display" label="All Products" />
    </div>
  );
}

function NavItem({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block px-4 py-2 rounded-lg transition ${
          isActive
            ? "bg-[#5753E8] text-white font-semibold"
            : "hover:bg-[#5753E8]"
        }`
      }
    >
      {label}
    </NavLink>
  );
}

export default Sidebar;
