import React, { useState } from "react";
import { GiConfirmed } from "react-icons/gi";
import { bookingDataContext } from "../context/BookingContext";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Star from "../Component/Star";
import axios from "axios";
import { useContext } from "react";
import { authDataContext } from "../context/AuthContext";
import { userDataContext } from "../context/UserContext";
import { listingDataContext } from "../context/Listingcontext";
function Booked() {
  let { bookingData } = useContext(bookingDataContext);
  let [star, setStar] = useState(null);
  let navigate = useNavigate();
  let { serverUrl } = useContext(authDataContext);
  let { getCurrentUser } = useContext(userDataContext);
  let { getListing } = useContext(listingDataContext);
  let {cardDetails}   = useContext(listingDataContext)
  const handleRating = async (id) => {
    try {
      let result = await axios.post(
        serverUrl + `/api/listing/ratings/${id}`,
        {
          ratings: star,
        },
        { withCredentials: true }
      );
      await getListing();
      await getCurrentUser();
      console.log(result);
      navigate("/");
    } catch (error) {
      console.log(error)
    }
  };

  const handleStar = async (value) => {
    setStar(value);
    console.log("you rated", value);
  };
  return (
    <div className="w-[100vw] min-h-[100vh] flex items-center justify-center gap-[10px] bg-slate-200 flex-col">
      <div className="w-[95%] max-w-[500px] h-[400px] flex items-center justify-center bg-[white] border-[1px] flex-col gap-[20px] p-[20px] md:w-[80%] rounded-lg border-[#b5b5b5]">
        <div className="w-[100%] h-[50%] text-[20px] flex items-center justify-center flex-col gap-[20px] font-semibold">
          {" "}
          <GiConfirmed className="w-[100px] h-[100px] text-[green]" />
          Booking Confirmed
        </div>
        <div className="w-[100%] flex items-center justify-between text-[16px] md:text-[18px]">
          <span>Booking Id:</span>
          <span>{bookingData._id}</span>
        </div>
        <div className="w-[100%] flex items-center justify-between text-[16px] md:text-[18px]">
          <span>Owner Details:</span>
          <span>{bookingData.host?.email}</span>
        </div>
        <div className="w-[100%] flex items-center justify-between text-[16px] md:text-[18px]">
          <span>Total Rent:</span>
          <span>{bookingData.totalRent}</span>
        </div>
      </div>
      <div className="w-[95%] max-w-[600px] h-[200px] flex items-center justify-center bg-[white] border-[1px] flex-col gap-[20px] p-[20px] md:w-[80%] rounded-lg border-[#b5b5b5]">
        <h1 className="text-[18px]"> {star ? star : 0} Out of 5 Rating</h1>

        <Star onRate={handleStar} />
        <button className=" py-[10px] px-[30px] bg-[red] text-[white] text-[18px] rounded-lg text-nowrap md:px[100px]" onClick={()=> cardDetails && handleRating(cardDetails._id)}>
          Submit
        </button>
      </div>
      <button
        className=" py-[10px] px-[30px] bg-[red] text-[white] text-[18px] rounded-lg text-nowrap md:px[100px] absolute top-[10px] right-[20px]"
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </div>
  );
}

export default Booked;
