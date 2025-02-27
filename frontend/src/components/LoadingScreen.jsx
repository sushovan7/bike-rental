import { Loader2 } from "lucide-react";

function LoadingScreen() {
  return (
    <div className="flex justify-center items-center h-screen bg-[#1D232A]">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="w-12 h-12 animate-spin text-[#605DFF]" />
        <p className="text-lg font-semibold text-white">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
}

export default LoadingScreen;
