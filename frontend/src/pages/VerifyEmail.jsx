import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    const token = searchParams.get("token");
    const id = searchParams.get("id");

    if (!token || !id) {
      setStatus("Invalid verification link.");
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/verify-email`,
          {
            params: { token, id },
          }
        );

        if (res.data.success) {
          setStatus("Email verified successfully! Redirecting...");
          setTimeout(() => navigate("/login"), 3000);
        } else {
          setStatus("Verification failed.");
        }
      } catch (error) {
        setStatus(
          error.response?.data?.message ||
            "Something went wrong during verification."
        );
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md text-center max-w-md">
        <h2 className="text-xl font-bold mb-4">Email Verification</h2>
        <p>{status}</p>
      </div>
    </div>
  );
};

export default VerifyEmail;
