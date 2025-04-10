import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

function RootLayout() {
  return (
    <div className="container mx-auto">
      <Navbar />
      <main className="container ms-auto px-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default RootLayout;
