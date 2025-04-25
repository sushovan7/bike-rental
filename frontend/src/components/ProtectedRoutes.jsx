import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoutes({ children, requireKyc = false }) {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireKyc && !user?.kycVerified) {
    return <Navigate to="/kyc" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoutes;
