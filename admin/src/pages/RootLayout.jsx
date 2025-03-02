import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function RootLayout() {
  return (
    <div className="container mx-auto pt-4">
      <Navbar />
      <div className="flex gap-4 mt-4">
        <div className="md:w-[20vw] hidden   md:block">
          <Sidebar />
        </div>
        <main className="md:w-[80vw] w-full px-6 py-4 md:border-l border-gray-400">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default RootLayout;
