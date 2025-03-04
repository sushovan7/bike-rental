import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import RootLayout from "./pages/RootLayout";
import ProductDisplay from "./pages/ProductDisplay";
import AddProduct from "./pages/AddProduct";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import AllUsers from "./pages/AllUsers";

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
        }}
      />
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="product-display" element={<ProductDisplay />} />
          <Route path="users" element={<AllUsers />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
