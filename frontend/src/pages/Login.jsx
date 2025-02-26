import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (loginData) => {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/signin`,
        loginData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },
    onSuccess: (response) => {
      toast.success(
        response.success ? response.message : "User logged in successfully"
      );
      reset();
      navigate("/");
    },
    onError: () => {
      toast.error("Login failed");
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
    <div className="flex items-center justify-center min-h-screen px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="shadow-xl w-full max-w-md flex flex-col gap-6 items-center justify-center px-6 py-10 rounded-2xl bg-white"
      >
        <h2 className="text-2xl font-semibold text-gray-800">Welcome Back!</h2>
        <p className="text-gray-500 text-sm text-center">Login to continue</p>

        <div className="w-full">
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
            className="input input-bordered w-full rounded-lg shadow-md"
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>
        <div className="w-full">
          <input
            {...register("password", {
              required: "Passsword is required",
              minLength: {
                value: 8,
                message: "Password must be atleast 8 characters long",
              },
            })}
            type="password"
            placeholder="Password"
            className="input input-bordered w-full rounded-lg shadow-md"
          />
          {errors.password && (
            <p className="text-xs mt-1 text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={mutation.isPending}
          className="btn btn-primary w-full mt-3 shadow-lg"
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
          <a href="/forgot-password" className="text-[#5753E8]">
            Forgot your password?
          </a>
        </p>

        <p className="text-sm text-gray-500 mt-3 text-center">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="text-[#5753E8]">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}

export default Login;
