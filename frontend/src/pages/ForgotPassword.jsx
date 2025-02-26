import { CheckCircle, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  return (
    <div className="flex items-center justify-center h-screen  px-4">
      <div className="card bg-gray-800 shadow-xl rounded-lg p-6 w-full max-w-sm text-center">
        <h2 className="text-2xl font-bold text-white">Forgot Password</h2>

        {isSubmitted ? (
          <div className="mt-4">
            <CheckCircle className="text-green-500 w-12 h-12 mx-auto" />
            <p className="text-gray-300 mt-3">
              If an account exists with this email, you will receive a password
              reset link shortly.
            </p>
            <Link to="/" className="btn btn-primary w-full mt-4">
              Go to Home
            </Link>
          </div>
        ) : (
          <form className="">
            <p className="text-gray-300 mt-2 mb-5">
              Enter your email to receive a reset link.
            </p>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full pl-10 bg-gray-700 text-white border-gray-600 focus:border-primary focus:ring-primary"
                required
              />
            </div>
            <button
              type="submit"
              onClick={() => setIsSubmitted(true)}
              className="btn btn-primary w-full mt-4"
            >
              Send Reset Link
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
