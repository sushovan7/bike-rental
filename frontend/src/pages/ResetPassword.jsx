import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { CheckCircle, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";

const ResetPassword = () => {
  const { resetToken } = useParams();

  const mutation = useMutation({
    mutationFn: async (resetPasswordData) => {
      const response = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_BASE_URL
        }/auth/reset-password/${resetToken}`,
        resetPasswordData
      );
      return response.data;
    },
    onSuccess: (response) => {
      toast.success(
        response.success ? response.message : "Password changed successfully"
      );
      reset();
    },
    onError: () => {
      toast.error("Failed to reset password");
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data) {
    const { password } = data;
    mutation.mutate({ password });
  }

  return (
    <div className="flex items-center justify-center h-screen  px-4">
      <div className="card bg-gray-800 shadow-xl rounded-lg p-6 w-full max-w-sm text-center">
        <h2 className="text-2xl font-bold text-white">Reset Password</h2>

        {mutation.isSuccess ? (
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
              disabled={mutation.isPending}
              className="btn btn-primary w-full mt-4"
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ...Please wait
                </>
              ) : (
                "Reset password"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
