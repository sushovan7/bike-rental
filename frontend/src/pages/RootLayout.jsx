import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
