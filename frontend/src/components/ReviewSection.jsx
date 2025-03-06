import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { Edit2, Loader2, Trash2 } from "lucide-react";

function ProductDetails({ productId }) {
  const queryClient = useQueryClient();
  const { token, user } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const rating = watch("rating", 0);

  const { data } = useQuery({
    queryKey: ["getreviews"],
    queryFn: async () => {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_BASE_URL
        }/review/reviews/bike/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
  });

  const postReviewMutation = useMutation({
    mutationFn: async (reviewData) => {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/review/reviews`,
        reviewData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message || "Review submitted successfully");
        reset();
        queryClient.invalidateQueries(["getReviews"]);
      }
    },
    onError: (error) => {
      if (error.response) {
        const errorMessage =
          error.response.data?.message || "Failed to submit review";
        toast.error(errorMessage);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    },
  });

  const onSubmit = (data) => {
    const reviewData = {
      ...data,
      bikeId: productId,
      rating: Number(data.rating),
    };

    postReviewMutation.mutate(reviewData);
  };

  const deleteReviewMutation = useMutation({
    mutationFn: async (reviewId) => {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/review/reviews/${reviewId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message || "Review deleted successfully");
        reset();
        queryClient.invalidateQueries(["getReviews"]);
      }
    },
    onError: (error) => {
      if (error.response) {
        const errorMessage =
          error.response.data?.message || "Failed to delete review";
        toast.error(errorMessage);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    },
  });

  if (!data) {
    return <p>Please wait a moment ...</p>;
  }

  function handleReviewDelete(id) {
    deleteReviewMutation.mutate(id);
  }

  function handleReviewEdit() {}

  return (
    <div className="container mx-auto p-4 flex flex-col">
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
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
                  name={`display-rating-${Math.random()}`}
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
              {...register("comment", { required: "Comment is required" })}
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

          <button
            type="submit"
            disabled={postReviewMutation.isPending}
            className="mt-3 bg-primary cursor-pointer text-white py-2 px-6 rounded-lg hover:bg-primary-dark transition font-semibold"
          >
            {postReviewMutation.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              " Submit Review"
            )}
          </button>
        </form>

        {/* Display Reviews */}
        <div className="space-y-4">
          {data.bikeReviews && data.bikeReviews.length > 0 ? (
            data.bikeReviews.map((review) => (
              <div
                key={review._id}
                className="p-4 border border-gray-600 rounded-lg"
              >
                <div className="flex relative items-center gap-2 mb-2">
                  <div className="w-8  h-8 bg-gray-600 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold">
                      {review.userId?.firstName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <p className="font-semibold">{review.userId?.firstName}</p>
                  {review.userId?._id === user._id && (
                    <div className="flex gap-4 items-center absolute right-2">
                      <button onClick={handleReviewEdit}>
                        <Edit2 size={20} className="cursor-pointer" />
                      </button>
                      <button
                        onClick={() => handleReviewDelete(review._id)}
                        className="cursor-pointer"
                      >
                        <Trash2 />
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-gray-400">{review.comment}</p>
                <div className="rating rating-xs mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <input
                      key={star}
                      type="radio"
                      name="display-rating"
                      className="mask mask-star-2 bg-orange-400"
                      aria-label={`${star} star`}
                      checked={star === review.rating}
                      readOnly
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p>No reviews yet. Be the first to review!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
