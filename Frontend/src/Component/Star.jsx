import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

function Star({ starValue = 5, onRate }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-1">
      {[...Array(starValue)].map((_, index) => {
        const currentValue = index + 1; // ✅ renamed variable
        const isFilled = currentValue <= (hover || rating);
 
        return (
          <span
            key={currentValue}
            onClick={() => {
              setRating(currentValue);
              if (onRate) onRate(currentValue);
            }}
            onMouseEnter={() => setHover(currentValue)}
            onMouseLeave={() => setHover(0)}
          >
            <FaStar
              className={`cursor-pointer text-2xl ${
                isFilled ? "text-yellow-400" : "text-gray-400"
              }`}
            />
          </span>
        );
      })}
    </div>
  );
}

export default Star;