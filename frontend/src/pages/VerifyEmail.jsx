import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const verifyEmailAPI = async (token) => {
  const response = await axios.post(
    `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/verify-email`,
    { emailVerifyToken: token }
  );
  return response.data;
};

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  console.log(token);

  const {
    mutate: verifyEmail,
    isLoading,
    isSuccess,
    isError,
    error,
    data,
  } = useMutation({
    mutationFn: verifyEmailAPI,
  });

  useEffect(() => {
    if (token) {
      verifyEmail(token);
    }
  }, [token, verifyEmail]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      {isLoading && <p className="text-blue-500">Verifying your email...</p>}

      {isSuccess && (
        <div className="text-center">
          <h1 className="text-green-600 text-xl font-semibold">
            Email Verified Successfully
          </h1>
          <p className="mt-2 text-white">{data?.message}</p>
          <button
            onClick={() => navigate("/login")}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Go to Login
          </button>
        </div>
      )}

      {isError && (
        <div className="text-center">
          <h1 className="text-red-600 text-xl font-semibold">
            Verification Failed
          </h1>
          <p className="mt-2 text-gray-700">
            {error.response?.data?.message || "Something went wrong"}
          </p>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
