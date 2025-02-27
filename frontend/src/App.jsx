import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import useAuthCheck from "../hooks/useAuthCheck";
import LoadingScreen from "./components/LoadingScreen";

// Lazy load pages for better performance
const RootLayout = lazy(() => import("./pages/RootLayout"));
const Inventory = lazy(() => import("./pages/Inventory"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Error = lazy(() => import("./pages/Error"));

function App() {
  useAuthCheck();

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
        }}
      />
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route
              path="reset-password/:resetToken"
              element={<ResetPassword />}
            />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
