import React, { useContext } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { listingDataContext } from "../context/Listingcontext";
import { toast} from "react-toastify";

export default function ListingPage3() {
  let navigate = useNavigate();
  let {
    title,
    description,
    frontEndImage1,
    frontEndImage2,
    frontEndImage3,
    rent,
    landmark,
    city,
    category,
    facilities, 
    handleAddListing,
    adding} = useContext(listingDataContext);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center relative overflow-auto">
      {/* Back Button */}
      <div
        className="w-[50px] h-[50px] bg-red-500 cursor-pointer absolute top-[20px] left-[20px] rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-200 z-10"
        onClick={() => navigate("/Listingpage1")}
      >
        <FaArrowLeftLong className="w-5 h-5 text-white" />
      </div>

      {/* Location Header */}
      <div className="w-full max-w-4xl px-4 pt-20 pb-4">
        <h1 className="text-xl md:text-2xl text-gray-800 font-semibold">
          {`In ${landmark?.toUpperCase() || ''}, ${city?.toUpperCase() || ''}`}
        </h1>
      </div>

      {/* Image Gallery */}
      <div className="w-full max-w-4xl px-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-96 md:h-80">
          {/* Main Image */}
          <div className="md:col-span-2 h-full overflow-hidden rounded-lg">
            <img
              src={frontEndImage1}
              alt="Main"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Side Images */}
          <div className="md:col-span-2 grid grid-rows-2 gap-2">
            <div className="h-full overflow-hidden rounded-lg">
              <img
                src={frontEndImage2}
                alt="Secondary 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-full overflow-hidden rounded-lg">
              <img
                src={frontEndImage3}
                alt="Secondary 2"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Listing Details */}
      <div className="w-full max-w-4xl px-4 space-y-4 mb-8">
        <div className="text-lg md:text-xl font-semibold text-gray-900">
          {`${title?.toUpperCase() || ''}, ${category?.toUpperCase() || ''}`}
        </div>

        <div className="text-base md:text-lg text-gray-700 leading-relaxed">
          {description?.toUpperCase() || ''}
        </div>

        <div className="text-base md:text-lg text-gray-700">
          <span className="font-medium">Facilities:</span>
          <ul className="list-disc list-inside mt-2 space-y-1">
            {facilities?.length > 0 ? facilities.map((facility, index) => (
              <li key={index} className="text-gray-600">{facility}</li>
            )) : <li className="text-gray-500">None</li>}
          </ul>
        </div>

        <div className="text-lg md:text-xl font-bold text-red-600">
          Rs.{rent}/day
        </div>
      </div>

      {/* Add Listing Button */}
      <div className="w-full max-w-4xl px-4 pb-8">
        <button
          className="w-full md:w-auto py-3 px-8 bg-red-500 text-white text-lg font-semibold rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleAddListing}
          disabled={adding}
        >
          {adding ? "Adding..." : "Add Listing"}
        </button>
      </div>
    </div>
  );
}
