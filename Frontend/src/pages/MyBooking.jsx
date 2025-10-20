import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";
import Card from "../Component/Card";
import { userDataContext } from '../context/UserContext';

function MyBooking() {
  let navigate = useNavigate()
  let { userData } = useContext(userDataContext)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate("/")}
              className="flex items-center justify-center w-10 h-10 bg-red-500 rounded-full hover:bg-red-600 transition-colors duration-200"
            >
              <FaArrowLeftLong className="w-5 h-5 text-white" />
            </button>
            <div className="bg-red-500 text-white px-6 py-2 rounded-full font-semibold text-lg">
              My Bookings
            </div>
            <div className="w-10"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {userData.booking && userData.booking.length > 0 ? (
          <>
            <div className="mb-8">
              <p className="text-gray-600 text-center">
                You have {userData.booking.length} booking{userData.booking.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {userData.booking.map((list) => (
                <Card
                  key={list._id}
                  title={list.title}
                  landmark={list.landmark}
                  city={list.city}
                  image1={list.image1}
                  image2={list.image2}
                  image3={list.image3}
                  rent={list.rent}
                  id={list._id}
                  isBooked={list.isBooked}
                  host={list.host}
                  ratings={list.ratings}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <div className="bg-white rounded-full p-6 mb-4 shadow-lg">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v10m0 0l-2-2m2 2l2-2m6-6v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6a2 2 0 012-2h8a2 2 0 012 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings yet</h3>
            <p className="text-gray-500 mb-6 max-w-md">
              You haven't made any bookings yet. Explore amazing places and book your next adventure.
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
            >
              Explore Listings
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyBooking;
