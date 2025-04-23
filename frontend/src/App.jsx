import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import LoadingScreen from "./components/LoadingScreen";
import ProtectedRoutes from "./components/ProtectedRoutes";
import EditReview from "./pages/EditReview";
import VerifyEmail from "./pages/VerifyEmail";

const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const PlaceOrder = lazy(() => import("./pages/PlaceOrder"));
const KycForm = lazy(() => import("./pages/KycForm"));
const RootLayout = lazy(() => import("./pages/RootLayout"));
const Inventory = lazy(() => import("./pages/Inventory"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Notifications = lazy(() => import("./pages/Notifications"));
const VerifyStripe = lazy(() => import("./pages/VerifyStripe"));
const VerifyKhalti = lazy(() => import("./pages/VerifyKhalti"));
const Profile = lazy(() => import("./pages/Profile"));
const Orders = lazy(() => import("./pages/Orders"));
const Favourites = lazy(() => import("./pages/Favourites"));
const Error = lazy(() => import("./pages/Error"));

function App() {
  return (
    <>
      <Toaster
        position="top-center"
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

            {/* protected routes */}

            <Route
              path="notifications"
              element={
                <ProtectedRoutes>
                  {" "}
                  <Notifications />
                </ProtectedRoutes>
              }
            />
            <Route
              path="profile"
              element={
                <ProtectedRoutes>
                  <Profile />
                </ProtectedRoutes>
              }
            />
            <Route
              path="orders"
              element={
                <ProtectedRoutes>
                  <Orders />
                </ProtectedRoutes>
              }
            />
            <Route
              path="favourites"
              element={
                <ProtectedRoutes>
                  <Favourites />
                </ProtectedRoutes>
              }
            />
            <Route
              path="product-details/:productId"
              element={
                <ProtectedRoutes>
                  <ProductDetails />
                </ProtectedRoutes>
              }
            />

            <Route
              path="product-details/:productId/review/:reviewId"
              element={
                <ProtectedRoutes>
                  <EditReview />
                </ProtectedRoutes>
              }
            />
            <Route
              path="kyc"
              element={
                <ProtectedRoutes>
                  <KycForm />
                </ProtectedRoutes>
              }
            />
            <Route
              path="place-order/:bikeId"
              element={
                <ProtectedRoutes>
                  <PlaceOrder />
                </ProtectedRoutes>
              }
            />
            <Route
              path="verify-stripe"
              element={
                <ProtectedRoutes>
                  <VerifyStripe />
                </ProtectedRoutes>
              }
            />
            <Route
              path="verify-khalti"
              element={
                <ProtectedRoutes>
                  <VerifyKhalti />
                </ProtectedRoutes>
              }
            />
            <Route path="verify-email" element={<VerifyEmail />} />

            {/* error routes */}
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
