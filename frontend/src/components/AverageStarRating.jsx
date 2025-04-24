const AverageStarRating = ({ averageRating }) => {
  return (
    <div className="rating rating-sm mt-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <input
          key={star}
          type="radio"
          name="average-rating"
          className={`mask mask-star-2 bg-yellow-400`}
          aria-label={`${star} star`}
          checked={Math.round(averageRating) === star}
          readOnly
        />
      ))}
    </div>
  );
};

export default AverageStarRating;
