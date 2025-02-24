import React from "react";
import { Routes, Route } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Inventory from "./pages/Inventory";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Error from "./pages/Error";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="error" element={<Error />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
