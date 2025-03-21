import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

function AddMessage() {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      message: "",
    },
  });

  const token = localStorage.getItem("token");

  const addNotificationMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/notification/notifications`,
        data,
        {
          headers: {
            token: token,
          },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Notification sent to all user");
        reset();
        queryClient.invalidateQueries(["notifications"]);
      }
    },
    onError: (error) => {
      if (error.response) {
        const errorMessage =
          error.response.data?.message ||
          "Failed to send notifications. Please try again.";
        toast.error(errorMessage);
      } else if (error.request) {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    },
  });

  function onSubmit(data) {
    addNotificationMutation.mutate(data);
  }

  return (
    <div className="flex   min-h-screen ">
      <div className="card w-full max-w-md bg-base-100 ">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <h2 className="card-title text-2xl font-bold mb-4">
            Send Message to All Users
          </h2>
          <div>
            <textarea
              {...register("message", {
                required: "Message is required",
                minLength: {
                  value: 10,
                  message: "Minimum message length must be 10",
                },
              })}
              className="textarea textarea-bordered w-full h-40 resize-y mb-4"
              placeholder="Type your message here..."
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message.message}</p>
            )}
          </div>

          <div className="card-actions justify-end">
            <button
              disabled={addNotificationMutation.isPending}
              type="submit"
              className="btn btn-primary w-full"
            >
              {addNotificationMutation.isPending ? (
                <Loader2 className="mr-1 h-4 w-4 animate-spin" />
              ) : (
                "Send Message"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddMessage;
