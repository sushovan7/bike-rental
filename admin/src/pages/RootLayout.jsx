import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function RootLayout() {
  return (
    <div className="container mx-auto pt-4">
      <Navbar />
      <div className="flex gap-4 mt-4">
        <div className="w-1/4 ">
          <Sidebar />
        </div>
        <main className="w-3/4 px-4 py-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default RootLayout;
