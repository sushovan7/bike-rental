import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { CheckCircle, Loader2, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const mutation = useMutation({
    mutationFn: async (resetPassworddata) => {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/forgot-password`,
        resetPassworddata
      );
      console.log(response.data);
      return response.data;
    },
    onSuccess: (response) => {
      toast.success(
        response.success ? response.message : "Reset link is sent to your email"
      );
      reset();
    },
    onError: () => {
      toast.error("Failed to send reset link");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data) {
    mutation.mutate(data);
  }

  return (
    <div className="flex items-center justify-center h-screen  px-4">
      <div className="card bg-gray-800 shadow-xl rounded-lg p-6 w-full max-w-sm text-center">
        <h2 className="text-2xl font-bold text-white">Forgot Password</h2>

        {mutation.isSuccess ? (
          <div className="mt-4">
            <CheckCircle className="text-green-500 w-12 h-12 mx-auto" />
            <p className="text-gray-300 mt-3">
              If an account exists with this email, you will receive a password
              reset link shortly in your email.
            </p>
            <Link to="/" className="btn btn-primary w-full mt-4">
              Go to Home
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <p className="text-gray-300 mt-2 mb-5">
              Enter your email to receive a reset link.
            </p>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full pl-10 bg-gray-700 text-white border-gray-600 focus:border-primary focus:ring-primary"
                required
              />
              {errors.email && (
                <p className="mt-1 text-red-500 text-xs">
                  {errors.email.message}
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
                "Sent reset link"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
