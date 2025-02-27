import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../src/features/auth/authSlice";

function useAuthCheck() {
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationKey: ["refresh-access-token"],
    mutationFn: async () => {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/refresh-access-token`,
        {},
        {
          withCredentials: true,
        }
      );

      return response.data;
    },

    onSuccess: (data) => {
      if (data.success) {
        dispatch(setToken({ token: data.accessToken }));
      }
    },

    onError: (error) => {
      if (error.response) {
        const errorMessage =
          error.response.data?.message || "Failed to refresh access token.";
        console.error(errorMessage);
      } else {
        console.error("Something went wrong. Please try again.");
      }
    },
  });

  useEffect(() => {
    if (!mutation.isPending) {
      mutation.mutate();
    }
  }, []);

  return null;
}
export default useAuthCheck;
