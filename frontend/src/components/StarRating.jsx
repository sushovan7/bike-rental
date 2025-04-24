import { useState } from "react";
import { Star } from "lucide-react";

const StarRating = ({
  totalStars = 5,
  value = 0,
  onChange,
  readOnly = false,
  size = 20,
  className = "",
}) => {
  const [hoveredStar, setHoveredStar] = useState(null);

  const handleClick = (index) => {
    if (!readOnly && onChange) {
      onChange(index + 1);
    }
  };

  const handleMouseEnter = (index) => {
    if (!readOnly) {
      setHoveredStar(index);
    }
  };

  const handleMouseLeave = () => {
    if (!readOnly) {
      setHoveredStar(null);
    }
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {Array.from({ length: totalStars }, (_, index) => {
        const filled =
          hoveredStar !== null ? index <= hoveredStar : index < value;

        return (
          <Star
            key={index}
            size={size}
            onClick={() => handleClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            className={`cursor-pointer transition-colors ${
              filled ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            } ${readOnly ? "cursor-default" : ""}`}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
