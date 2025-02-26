import { CheckCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data) {
    console.log(data);
  }

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
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
            <div className="relative mb-3">
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be atleast 8 characters long",
                  },
                })}
                type="password"
                placeholder="New Password"
                className="input input-bordered w-full pl-10 bg-gray-700 text-white border-gray-600 focus:border-primary focus:ring-primary"
              />
              {errors.password && (
                <p className="text-xs text-red-500 mt-2">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="relative">
              <input
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                type="password"
                placeholder="Confirm Password"
                className="input input-bordered w-full pl-10 bg-gray-700 text-white border-gray-600 focus:border-primary focus:ring-primary"
              />
              {errors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              onClick={() => setIsSubmitted(false)}
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
