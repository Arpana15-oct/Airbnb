import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";
import { userDataContext } from '../context/UserContext';
import Card from "../Component/Card";

function MyListing() {
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
              My Listings
            </div>
            <div className="w-10"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {userData.listing && userData.listing.length > 0 ? (
          <>
            <div className="mb-8">
              <p className="text-gray-600 text-center">
                You have {userData.listing.length} listing{userData.listing.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {userData.listing.map((list) => (
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
                />
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <div className="bg-white rounded-full p-6 mb-4 shadow-lg">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No listings yet</h3>
            <p className="text-gray-500 mb-6 max-w-md">
              You haven't created any listings yet. Start by adding your first property to share with guests.
            </p>
            <button
              onClick={() => navigate("/listingpage1")}
              className="bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
            >
              Create Your First Listing
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyListing;
