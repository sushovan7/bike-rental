import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { ArrowLeft, ArrowRight, Edit2, Loader2, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import StarRating from "../components/StarRating"; // Update the path if necessary

function ReviewSection({ productId }) {
  const queryClient = useQueryClient();
  const { token, user } = useSelector((state) => state.auth);
  const [currentPage, setCurrentPage] = useState(1);

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
        queryClient.invalidateQueries(["getreviews"]);
      }
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    },
  });

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
        queryClient.invalidateQueries(["getreviews"]);
      }
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    },
  });

  if (!data) {
    return <p>Please wait a moment ...</p>;
  }

  function handleReviewDelete(id) {
    deleteReviewMutation.mutate(id);
  }

  const itemsPerPage = 5;
  const noOfPages = Math.ceil(data.bikeReviews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const reviewsToDisPlay = data.bikeReviews
    ?.slice()
    .reverse()
    .slice(startIndex, endIndex);

  function handleNext() {
    if (currentPage < noOfPages) {
      setCurrentPage((prev) => prev + 1);
    }
  }
  function handlePrevious() {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }

  const onSubmit = (formData) => {
    const reviewData = {
      ...formData,
      bikeId: productId,
      rating: Number(formData.rating),
    };

    postReviewMutation.mutate(reviewData);
  };

  return (
    <div className="container mx-auto p-4 flex flex-col">
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">Your Rating</p>
            <StarRating
              value={rating}
              onChange={(value) => setValue("rating", value)}
            />
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

        <div className="space-y-4">
          {reviewsToDisPlay && reviewsToDisPlay.length ? (
            reviewsToDisPlay.map((review) => (
              <div
                key={review._id}
                className="p-4 border border-gray-600 rounded-lg"
              >
                <div className="flex relative items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold">
                      {review.userId?.firstName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <p className="font-semibold">{review.userId?.firstName}</p>
                  {review.userId?._id === user._id && (
                    <div className="flex gap-4 items-center absolute right-2">
                      <Link
                        to={`/product-details/${productId}/review/${review._id}`}
                        className="btn btn-primary btn-sm"
                      >
                        <Edit2 size={15} className="cursor-pointer " />
                      </Link>

                      <button
                        onClick={() => handleReviewDelete(review._id)}
                        className="cursor-pointer btn btn-error btn-sm"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-gray-400">{review.comment}</p>
                <div className="mt-2">
                  <StarRating value={review.rating} readOnly />
                </div>
              </div>
            ))
          ) : (
            <p>No reviews yet. Be the first to review!</p>
          )}
        </div>

        <div className="join mt-6 flex gap-4">
          <button
            disabled={currentPage === 1}
            onClick={handlePrevious}
            className="join-item  btn btn-outline btn-primary"
          >
            <ArrowLeft />
          </button>
          <p className="join-item btn btn-primary">Page {currentPage}</p>
          <button
            disabled={currentPage === noOfPages}
            onClick={handleNext}
            className="join-item btn btn-outline btn-primary"
          >
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReviewSection;
