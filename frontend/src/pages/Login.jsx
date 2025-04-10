import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setToken } from "../features/auth/authSlice";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async (loginData) => {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/signin`,
        loginData
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Login successful!");
        dispatch(setToken({ token: data.accessToken, user: data.data }));
      }
      reset();
      navigate("/");
    },
    onError: (error) => {
      if (error.response) {
        const errorMessage =
          error.response.data?.message || "User login failed.";
        toast.error(errorMessage);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
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
    <div className="max-w-lg mx-auto p-6 bg-base-200 rounded-xl shadow-lg mt-10">
      <h2 className="text-xl font-bold mb-4">Welcome Back!</h2>
      <p className="text-gray-500 text-sm mb-6">Login to continue</p>

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
            placeholder="Email"
            className="input input-bordered w-full"
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
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

        <p className="text-sm text-gray-500 mt-3 text-center">
          <Link to="/forgot-password" className="text-[#5753E8]">
            Forgot your password?
          </Link>
        </p>

        <p className="text-sm text-gray-500 mt-3 text-center">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-[#5753E8]">
            Sign up
          </Link>
        </p>

        <p className="text-xs text-gray-400 mt-6 text-center">
          <a
            href="https://reeliic-admin.vercel.app"
            target="_blank"
            className="text-[#5753E8]"
          >
            Admin Login
          </a>
        </p>
      </form>
    </div>
  );
}

export default Login;
