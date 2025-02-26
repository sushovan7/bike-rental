import { Lock, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className="flex items-center justify-center h-screen  px-4">
      <div className="card bg-gray-800 shadow-xl rounded-lg p-6 w-full max-w-sm text-center">
        <h2 className="text-2xl font-bold text-white">Reset Password</h2>

        {isSubmitted ? (
          <div className="mt-4">
            <CheckCircle className="text-green-500 w-12 h-12 mx-auto" />
            <p className="text-gray-300 mt-3">
              Your password has been reset successfully.
            </p>
            <p className="text-gray-400">Please login to continue.</p>
            <Link to="/login" className="btn btn-primary w-full mt-4">
              Login
            </Link>
          </div>
        ) : (
          <form className="mt-4">
            <div className="relative mb-3">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="New Password"
                className="input input-bordered w-full pl-10 bg-gray-700 text-white border-gray-600 focus:border-primary focus:ring-primary"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="Confirm Password"
                className="input input-bordered w-full pl-10 bg-gray-700 text-white border-gray-600 focus:border-primary focus:ring-primary"
                required
              />
            </div>

            <button
              type="submit"
              onClick={() => setIsSubmitted(true)}
              className="btn btn-primary w-full mt-4"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
