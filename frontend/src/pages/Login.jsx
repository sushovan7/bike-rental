import { useForm } from "react-hook-form";

function Login() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data) {
    console.log(data);
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
        <button type="submit" className="btn btn-primary w-full mt-3 shadow-lg">
          Login
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
