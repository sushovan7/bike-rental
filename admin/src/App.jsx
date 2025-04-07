import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import RootLayout from "./pages/RootLayout";
import ProductDisplay from "./pages/ProductDisplay";
import AddProduct from "./pages/AddProduct";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import AllUsers from "./pages/AllUsers";
import KycRequest from "./pages/KycRequest";
import ReviewKycRequest from "./pages/ReviewKycRequest";
import AddMessage from "./pages/AddMessage";
import ProtectedRoute from "./components/ProtectedRoute";

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
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="product-display" element={<ProductDisplay />} />
            <Route path="users" element={<AllUsers />} />
            <Route path="kyc-request" element={<KycRequest />} />
            <Route path="add-message" element={<AddMessage />} />
            <Route
              path="review-kyc-request/:requestId"
              element={<ReviewKycRequest />}
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
