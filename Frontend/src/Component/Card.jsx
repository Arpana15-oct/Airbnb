
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { FcCancel } from "react-icons/fc";

import { userDataContext } from "../context/UserContext";
import { listingDataContext } from "../context/Listingcontext";
import { bookingDataContext } from "../context/BookingContext";
 
function Card({
  title,
  landmark,
  image1,
  image2,
  image3,
  rent,
  city,
  id,
  ratings,
  isBooked,
  host,
}) {
  const navigate = useNavigate();
  const { userData } = useContext(userDataContext);
  const { handleViewCard } = useContext(listingDataContext);
  const { cancelBooking } = useContext(bookingDataContext);

  const [popUp, setPopUp] = useState(false);

  const handleClick = () => {
    if (userData) {
      handleViewCard(id);
    } else {
      navigate("/login");
    }
  };

  const handleCancelBooking = (e) => {
    e.stopPropagation(); // prevent triggering handleClick
    setPopUp(true);
  };

  const confirmCancel = (e) => {
    e.stopPropagation();
    cancelBooking(id);
    setPopUp(false);
  };

  const closePopUp = (e) => {
    e.stopPropagation();
    setPopUp(false);
  };

  return (
    <div
      className="w-full max-w-[330px] h-[460px] flex flex-col items-start justify-start rounded-lg cursor-pointer relative z-[10] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-4"
      onClick={!isBooked ? handleClick : undefined}
    >
      {/* Booked Label */}
      {isBooked && (
        <div className="text-green-700 bg-white rounded-lg absolute flex items-center justify-center right-1 top-1 gap-[5px] p-[5px]">
          <GiConfirmed className="w-[20px] h-[20px] text-green-700" />
          Booked
        </div>
      )}

      {/* Cancel Booking Button (only host) */}
      {isBooked && host === userData?._id && (
        <div
          className="text-red-600 bg-white rounded-lg absolute flex items-center justify-center right-1 top-[50px] gap-[5px] p-[5px]"
          onClick={handleCancelBooking}
        >
          <FcCancel className="w-[20px] h-[20px]" />
          Cancel Booking
        </div>
      )}

      {/* Cancel Confirmation Popup */}
      {popUp && (
        <div
          className="w-[300px] h-[120px] bg-[#ffffffdf] absolute top-[110px] left-[13px] rounded-lg shadow-lg flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full h-[50%] text-[#2e2d2d] flex items-center justify-center text-[18px] font-semibold">
            Booking Cancel!
          </div>
          <div className="w-full h-[50%] flex items-center justify-center gap-[10px]">
            <span className="text-[#986b6b] text-[16px] font-semibold">Are you sure?</span>
            <button
              className="px-[20px] py-[5px] bg-red-600 text-white rounded-lg hover:bg-slate-600 transition"
              onClick={confirmCancel}
            >
              Yes
            </button>
            <button
              className="px-[20px] py-[5px] bg-gray-500 text-white rounded-lg hover:bg-slate-600 transition"
              onClick={closePopUp}
            >
              No
            </button>
          </div>
        </div>
      )}

      {/* Image Section */}
      <div className="w-full h-[67%] bg-[#2e2d2d] rounded-lg overflow-hidden flex">
        {[image1, image2, image3].map(
          (img, index) =>
            img && (
              <img
                key={index}
                src={img}
                alt={`listing-${index}`}
                className="w-full flex-shrink-0 object-cover"
              />
            )
        )}
      </div>

      {/* Info Section */}
      <div className="w-full h-[33%] py-[20px] flex flex-col gap-[4px]">
        <div className="flex items-center justify-between text-[18px]">
          <span className="w-[80%] truncate text-[#4a3434] font-semibold">
            In {landmark?.toUpperCase()}, {city?.toUpperCase()}
          </span>
          <span className="flex items-center gap-[5px]">
            <FaStar className="text-[#eb6262]" />
            {ratings || 0}
          </span>
        </div>
        <span className="w-[80%] truncate text-[15px]">
          {title?.toUpperCase()}
        </span>
        <span className="text-[15px] font-semibold text-[#986b6b]">
          Rs {rent}/day
        </span>
      </div>
    </div>
  );
}

export default Card;


