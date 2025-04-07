import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminLogin() {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: ["admin-login"],
    mutationFn: async (loginData) => {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/admin/signin`,
        loginData
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Admin login successful!");
        localStorage.setItem("token", data.token);
        reset();
        navigate("/");
      }
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message ||
        "Admin login failed. Please try again.";
      toast.error(errorMessage);
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data) {
    mutation.mutate(data);
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-lg w-full p-6 bg-base-200 rounded-xl shadow-lg">
        <div className="flex justify-center mb-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-4 text-center">Admin Portal</h2>
        <p className="text-gray-500 text-sm mb-6 text-center">
          Secure access to your administration dashboard
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-400">Email</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email address",
                },
              })}
              type="email"
              placeholder="admin@example.com"
              className="input input-bordered w-full"
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-400">Password</label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
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
              "Login"
            )}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            © {new Date().getFullYear()} Admin Portal. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
