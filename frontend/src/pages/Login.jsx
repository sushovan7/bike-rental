function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <form className="shadow-xl w-full max-w-md flex flex-col gap-6 items-center justify-center px-6 py-10 rounded-2xl bg-white">
        <h2 className="text-2xl font-semibold text-gray-800">Welcome Back!</h2>
        <p className="text-gray-500 text-sm text-center">Login to continue</p>

        <div className="w-full">
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full rounded-lg shadow-md"
          />
          <p className="text-xs text-red-500">error</p>
        </div>
        <div className="w-full">
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full rounded-lg shadow-md"
          />
          <p className="text-xs text-red-500">error</p>
        </div>
        <button className="btn btn-primary w-full mt-3 shadow-lg">Login</button>

        <p className="text-sm text-gray-500 mt-3 text-center">
          <a href="#" className="text-blue-500">
            Forgot your password?
          </a>
        </p>

        <p className="text-sm text-gray-500 mt-3 text-center">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="text-blue-500">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}

export default Login;
