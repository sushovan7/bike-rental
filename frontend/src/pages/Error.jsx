import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen  px-6 text-center">
      <div className="max-w-md bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center">
        <AlertTriangle className="text-red-500 w-16 h-16" />
        <h1 className="text-3xl font-bold mt-4 text-gray-800">
          Oops! Something went wrong
        </h1>
        <p className="text-gray-600 mt-2">
          The page you&apos;re looking for might have been removed or is
          temporarily unavailable.
        </p>
        <Link to="/" className="mt-4">
          <button className="btn btn-primary mt-4">Go Home</button>
        </Link>
      </div>
    </div>
  );
};

export default Error;
