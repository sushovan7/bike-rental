import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import NewsLetter from "../components/NewsLetter";
import { useEffect } from "react";

function EditReview() {
  const queryClient = useQueryClient();
  const { reviewId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const rating = watch("rating", 0);
  const editReviewMutation = useMutation({
    mutationFn: async (editedData) => {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/review/reviews/${reviewId}`,
        editedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message || "Review updated successfully");
        reset();
        queryClient.invalidateQueries(["getReviews"]);
        navigate(-1);
      }
    },
    onError: (error) => {
      if (error.response) {
        const errorMessage =
          error.response.data?.message || "Failed to update review";
        toast.error(errorMessage);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    },
  });

  function onEditReviewSubmit(data) {
    editReviewMutation.mutate(data);
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-gray-800 p-6 rounded-lg mb-20 mt-20 max-w-md mx-auto">
        <h3 className="text-lg font-semibold mb-4">Edit Review</h3>
        <form onSubmit={handleSubmit(onEditReviewSubmit)}>
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">Your Rating</p>
            <div className="rating rating-xs">
              {[1, 2, 3, 4, 5].map((star) => (
                <input
                  key={star}
                  type="radio"
                  {...register("rating", {
                    required: "Rating is required",
                    valueAsNumber: true,
                  })}
                  className="mask mask-star-2 bg-orange-400"
                  aria-label={`${star} star`}
                  name={`edit-rating-${Math.random()}`}
                  value={star}
                  checked={star === rating}
                  onChange={() => setValue("rating", star)}
                />
              ))}
            </div>
            {errors.rating && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.rating.message}
              </p>
            )}
          </div>

          <div>
            <textarea
              {...register("comment", {
                required: "Comment is required",
              })}
              placeholder="Write your review..."
              className="w-full p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              rows="4"
            />
            {errors.comment && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.comment.message}
              </p>
            )}
          </div>

          <div className="mt-4 flex justify-end gap-3">
            <button
              onClick={() => navigate(-1)}
              type="button"
              className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={editReviewMutation.isPending}
              className="bg-primary cursor-pointer text-white py-2 px-6 rounded-lg hover:bg-primary-dark transition font-semibold"
            >
              {editReviewMutation.isPending ? (
                <Loader2 className="mr-1 h-4 w-4 animate-spin" />
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
      <NewsLetter />
    </div>
  );
}

export default EditReview;
