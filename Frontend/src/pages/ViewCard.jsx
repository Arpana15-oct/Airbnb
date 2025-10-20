import React, { useEffect } from "react";
import { useContext } from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { listingDataContext } from "../context/Listingcontext";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import { bookingDataContext } from "../context/BookingContext";
import { toast } from "react-toastify";
import { userDataContext } from "../context/UserContext";
import Nav from "../Component/Nav";
function ViewCard() {
  let navigate = useNavigate();
  let { cardDetails } = useContext(listingDataContext);
  let [updatePopUP, setUpdatePopUP] = useState(false);
  let [bookingPop, setBookingPop] = useState(false);
  let [imageModal, setImageModal] = useState(false);
  let [currentImageIndex, setCurrentImageIndex] = useState(0);
  let [descriptionPopup, setDescriptionPopup] = useState(false);
  let [title, setTitle] = useState(cardDetails?.title || '');
  let [description, setDescription] = useState(cardDetails?.description || '');
  let [backEndImage1, setBackEndImage1] = useState(null);
  let [backEndImage2, setBackEndImage2] = useState(null);
  let [backEndImage3, setBackEndImage3] = useState(null);
  let [rent, setRent] = useState(cardDetails?.rent || '');
  let [landmark, setLandmark] = useState(cardDetails?.landmark || '');
  let [city, setCity] = useState(cardDetails?.city || '');
  let [facilities, setFacilities] = useState(cardDetails?.facilities || []);
  let { updating, setUpdating } = useContext(listingDataContext);
  let [deleting, setDeleting] = useState(false);
  let [minDate, setMinDate] = useState("");
  let { serverUrl } = useContext(authDataContext);
  let { userData } = useContext(userDataContext);

  const images = [cardDetails.image1, cardDetails.image2, cardDetails.image3];

  let{
    CheckIn,setCheckIn,
    CheckOut,setCheckOut,
    total,setTotal,
    night,setNight,
    handleBooking,booking

  }=useContext(bookingDataContext)

  useEffect(()=>{
    if(CheckIn && CheckOut){
      let InDate = new Date(CheckIn)
      let OutDate = new Date(CheckOut)
      let n = (OutDate - InDate)/(24*60*60*1000)
      setNight(n)
      let airbnbCharge=((cardDetails.rent*n)*(7/100))
      let tax=((cardDetails.rent*n)*(7/100))

      if(n>0){
        setTotal((cardDetails.rent*n) + airbnbCharge + tax)
      }
      else{
        setTotal(0)
      }
    }
  },[CheckIn,CheckOut,cardDetails.rent])
  const handleUpdateListing = async (params) => {
    setUpdating(true);
    try {
      let formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (backEndImage1) {
        formData.append("image1", backEndImage1);
      }
      if (backEndImage2) {
        formData.append("image2", backEndImage2);
      }
      if (backEndImage3) {
        formData.append("image3", backEndImage3);
      }
      formData.append("rent", rent);
      formData.append("landmark", landmark);
      formData.append("city", city);
      facilities.forEach(facility => formData.append("facilities[]", facility));

      let result = await axios.post(
        serverUrl + `/api/listing/update/${cardDetails._id}`,
        formData,
        {
          withCredentials: true,
        }
      );
      setUpdating(false);
      console.log(result);
      toast.success("Listing Updated")
      navigate("/");
      setTitle("");
      setDescription("");
      setBackEndImage1(null);
      setBackEndImage2(null);
      setBackEndImage3(null);
      setRent("");
      setLandmark("");
  } catch (error) {
    setUpdating(false);
    console.log(error);
    let errorMessage = "An error occurred while updating the listing";
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    }
    toast.error(errorMessage);
  }
  };
  const handleDeleteListing = async (params) => {
    setDeleting(true);
    try {
      let result = await axios.delete(
        serverUrl + `api/listing/delete/${cardDetails._id}`,

        {
          withCredentials: true,
        }
      );
      console.log(result.data);
      navigate("/");
      toast.success("Listing Delete")
      setDeleting(false);
    } catch (error) {
      console.log(error);
      setDeleting(false);
       toast.error(error.response.data.message)
    }
  };
  const handleImage1 = (e) => {
    let file = e.target.files[0];
    setBackEndImage1(file);
  };
  const handleImage2 = (e) => {
    let file = e.target.files[0];
    setBackEndImage2(file);
  };
  const handleImage3 = (e) => {
    let file = e.target.files[0];
    setBackEndImage3(file);
  };
  useEffect(()=>{
let today=new Date().toISOString().split('T')[0]
setMinDate(today)
  },[])
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Nav
        isViewCard={true}
        onBack={() => navigate("/")}
        onShare={() => console.log("Share")}
        onSave={() => console.log("Save")}
      />

      {/* Title Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {cardDetails.title}
        </h1>
        <p className="text-gray-600 text-lg">
          {cardDetails.category}
        </p>
      </div>

      {/* Image Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        <div className="relative">
          {/* Main Image */}
          <div className="aspect-[16/10] md:aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl mb-4 cursor-pointer" onClick={() => { setImageModal(true); setCurrentImageIndex(0); }}>
            <img
              src={images[currentImageIndex]}
              alt="Main"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Thumbnail Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="aspect-square rounded-xl overflow-hidden shadow-lg group cursor-pointer" onClick={() => setCurrentImageIndex(0)}>
              <img
                src={cardDetails.image1}
                alt="Thumbnail 1"
                className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 ${currentImageIndex === 0 ? 'ring-2 ring-red-500' : ''}`}
              />
            </div>
            <div className="aspect-square rounded-xl overflow-hidden shadow-lg group cursor-pointer" onClick={() => setCurrentImageIndex(1)}>
              <img
                src={cardDetails.image2}
                alt="Thumbnail 2"
                className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 ${currentImageIndex === 1 ? 'ring-2 ring-red-500' : ''}`}
              />
            </div>
            <div className="aspect-square rounded-xl overflow-hidden shadow-lg group cursor-pointer" onClick={() => setCurrentImageIndex(2)}>
              <img
                src={cardDetails.image3}
                alt="Thumbnail 3"
                className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 ${currentImageIndex === 2 ? 'ring-2 ring-red-500' : ''}`}
              />
            </div>
          </div>
        </div>

        {/* Embedded Feature Callout */}
        <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-gray-200">
          <ul className="text-sm font-medium text-gray-700 space-y-1">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              24/7 help/lock support
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Private RO Water
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side: Title and Description */}
          <div className="lg:col-span-2">
            <p className="text-gray-600 mb-4">
              Entire serviced apartment in {cardDetails.city}
            </p>
            <div className="flex items-center space-x-2 mb-6">
              <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">Guest favourite</span>
              <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-sm">One of the most loved homes on Airbnb</span>
            </div>
            <div className="border border-gray-300 rounded-lg p-4 cursor-pointer bg-white shadow-sm" onClick={() => setDescriptionPopup(true)}>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">About the space</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                {cardDetails.description.slice(0, 200) + (cardDetails.description.length > 200 ? '...' : '')}
              </p>
              {cardDetails.description.length > 200 && (
                <span className="text-sm text-gray-500 mt-2 block">Click to read more</span>
              )}
            </div>
            {cardDetails.facilities && cardDetails.facilities.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Facilities</h3>
                <ul className="list-disc list-inside text-gray-700">
                  {cardDetails.facilities.map((facility, index) => (
                    <li key={index}>{facility}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Side: Pricing Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <div className="bg-green-100 text-green-800 px-3 py-2 rounded-lg mb-4 text-sm">
                Your price is below the 60-day average.
              </div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-2xl font-bold text-gray-900">
                    Rs.{cardDetails.rent}
                  </span>
                  <span className="text-gray-600"> / night</span>
                </div>
              </div>
              {CheckIn && CheckOut && night > 0 && (
                <div className="border rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Check-in</label>
                      <span className="text-sm text-gray-900">{CheckIn}</span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Check-out</label>
                      <span className="text-sm text-gray-900">{CheckOut}</span>
                    </div>
                  </div>
                </div>
              )}
              {total > 0 && (
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>Rs.{cardDetails.rent} x {night} nights</span>
                    <span>Rs.{(cardDetails.rent * night).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service fee</span>
                    <span>Rs.{((cardDetails.rent * night) * 0.07).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes</span>
                    <span>Rs.{((cardDetails.rent * night) * 0.07).toFixed(2)}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>Rs.{total.toFixed(2)}</span>
                  </div>
                </div>
              )}
              <div className="space-y-3">
                {cardDetails.host == userData._id ? (
                  <>
                    <button
                      onClick={() => setUpdatePopUP(true)}
                      className="w-full bg-red-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                    >
                      Edit Listing
                    </button>
                    <button
                      onClick={() => setBookingPop(true)}
                      className="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                    >
                      Reserve
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setBookingPop(true)}
                    className="w-full bg-red-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                  >
                    Reserve
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {updatePopUP && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full mx-4 max-h-[90vh] overflow-auto">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setUpdatePopUP(false)}
            >
              <RxCross2 className="w-6 h-6" />
            </button>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Update Your Listing</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                className="space-y-4"
              >
                <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
                  <label htmlFor="title" className="text-[20px]">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px] text-[black]"
                    required
                    placeholder="_bhk house or best title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                  />
                </div>

                <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
                  <label htmlFor="des" className="text-[20px]">
                    Description
                  </label>
                  <textarea
                    name=""
                    id="des"
                    className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px] text-[black]"
                    required
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  ></textarea>
                </div>

                <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
                  <label htmlFor="img1" className="text-[20px]">
                    Image1 (Optional)
                  </label>
                  <div className="flex items-center justify-start w-[90%] h-[40px] border-[#555656] border-2 rounded-[10px]">
                    <input
                      type="file"
                      id="img1"
                      className="w-[100%] text-[15px] px-[10px]"
                      onChange={handleImage1}
                    />
                  </div>
                </div>

                <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
                  <label htmlFor="img2" className="text-[20px]">
                    Image2 (Optional)
                  </label>
                  <div className="flex items-center justify-start w-[90%] h-[40px] border-[#555656] border-2 rounded-[10px]">
                    <input
                      type="file"
                      id="img2"
                      className="w-[100%] text-[15px] px-[10px]"
                      onChange={handleImage2}
                    />
                  </div>
                </div>

                <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
                  <label htmlFor="img3" className="text-[20px]">
                    Image3 (Optional)
                  </label>
                  <div className="flex items-center justify-start w-[90%] h-[40px] border-[#555656] border-2 rounded-[10px]">
                    <input
                      type="file"
                      id="img3"
                      className="w-[100%] text-[15px] px-[10px]"
                      onChange={handleImage3}
                    />
                  </div>
                </div>

                <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
                  <label htmlFor="rent" className="text-[20px]">
                    Rent
                  </label>
                  <input
                    type="number"
                    id="rent"
                    className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px]  text-[black]"
                    required
                    onChange={(e) => setRent(e.target.value)}
                    value={rent}
                  />
                </div>

                <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
                  <label htmlFor="city" className="text-[20px]">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px]  text-[black]"
                    required
                    placeholder="city,country"
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                  />
                </div>

                <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
                  <label htmlFor="landmark" className="text-[20px]">
                    Landmark
                  </label>
                  <input
                    type="text"
                    id="landmark"
                    className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px]  text-[black]"
                    required
                    onChange={(e) => setLandmark(e.target.value)}
                    value={landmark}
                  />
                </div>

                <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
                  <label htmlFor="facilities" className="text-[20px]">
                    Facilities
                  </label>
                  <div className="w-[90%] flex flex-wrap gap-[10px]">
                    {["WiFi", "Parking", "Pool", "AC", "Gym", "Laundry", "Security", "Elevator"].map((facility) => (
                      <label key={facility} className="flex items-center gap-[5px]">
                        <input
                          type="checkbox"
                          checked={facilities.includes(facility)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFacilities([...facilities, facility]);
                            } else {
                              setFacilities(facilities.filter(f => f !== facility));
                            }
                          }}
                        />
                        {facility}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                  <button
                    className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white text-lg rounded-lg hover:bg-red-600 transition-colors"
                    onClick={handleUpdateListing}
                    disabled={updating}
                  >
                    {updating ? "Updating...." : "Update Listing"}
                  </button>
                  <button
                    className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white text-lg rounded-lg hover:bg-red-600 transition-colors"
                    onClick={handleDeleteListing}
                    disabled={deleting}
                  >
                    {deleting ? "Deleting..." : "Delete Listing"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {bookingPop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4" onClick={() => setBookingPop(false)}>
          <div className="relative max-w-4xl w-full max-h-[90vh] overflow-auto bg-white rounded-lg shadow-lg flex flex-col md:flex-row">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setBookingPop(false)}
            >
              <RxCross2 className="w-6 h-6" />
            </button>
            <div className="md:w-1/2 p-6 border-r border-gray-200">
              <h1 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-gray-300 pb-2">
                Confirm & Book
              </h1>
              <form onSubmit={(e) => { e.preventDefault(); }} onClick={(e) => e.stopPropagation()} className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">Your Trip</h3>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <label htmlFor="CheckIn" className="text-lg font-medium text-gray-700">Check-in</label>
                    <input
                      type="date"
                      min={minDate}
                      id="CheckIn"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white"
                      required
                      onChange={(e) => setCheckIn(e.target.value)}
                      value={CheckIn}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <label htmlFor="CheckOut" className="text-lg font-medium text-gray-700">Check-out</label>
                    <input
                      type="date"
                      min={CheckIn || minDate}
                      id="CheckOut"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white"
                      required
                      onChange={(e) => setCheckOut(e.target.value)}
                      value={CheckOut}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>
                <div className="flex justify-center mt-6">
                  <button
                    className="px-6 py-3 bg-red-500 text-white text-lg rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
                    onClick={() => handleBooking(cardDetails._id)}
                    disabled={booking}
                  >
                    {booking ? "Booking...." : "Book Now"}
                  </button>
                </div>
              </form>
            </div>
            <div className="md:w-1/2 p-6">
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-4">
                  <img className="w-20 h-20 rounded-lg object-cover flex-shrink-0" src={cardDetails.image1} alt="" />
                  <div className="flex-1">
                    <h1 className="text-sm text-gray-600 truncate">{`IN ${cardDetails.landmark?.toUpperCase() || ''}, ${cardDetails.city?.toUpperCase() || ''}`}</h1>
                    <h1 className="font-semibold text-gray-900">{cardDetails.title?.toUpperCase() || ''}</h1>
                    <h1 className="text-gray-700">{cardDetails.category?.toUpperCase() || ''}</h1>
                    <div className="flex items-center gap-1 mt-1">
                      <FaStar className="text-red-500" />
                      <span className="text-sm text-gray-600">{cardDetails.ratings || 0}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h1 className="text-xl font-semibold text-gray-900 mb-4">Price Details</h1>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Rs.{cardDetails.rent} x {night} nights</span>
                    <span>Rs.{(cardDetails.rent * night).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Tax</span>
                    <span>Rs.{((cardDetails.rent * night) * 7 / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-300 pb-2">
                    <span className="font-medium">Airbnb Charges</span>
                    <span>Rs.{((cardDetails.rent * night) * 7 / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>Rs.{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {imageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black backdrop-blur-sm" onClick={() => setImageModal(false)}>
          <div className="relative max-w-4xl w-full max-h-[90vh] overflow-hidden bg-white rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
              onClick={() => setImageModal(false)}
            >
              <RxCross2 className="w-6 h-6" />
            </button>
            <div className="relative">
              <img
                src={images[currentImageIndex]}
                alt={`Image ${currentImageIndex + 1}`}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-800 p-2 rounded-full hover:bg-white transition-colors shadow-lg"
                onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
              >
                ‹
              </button>
              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-800 p-2 rounded-full hover:bg-white transition-colors shadow-lg"
                onClick={() => setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
              >
                ›
              </button>
            </div>
            <div className="p-4 bg-white">
              <div className="flex justify-center space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full ${index === currentImageIndex ? 'bg-red-500' : 'bg-gray-300'}`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {descriptionPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm" onClick={() => setDescriptionPopup(false)}>
          <div className="relative bg-white rounded-lg shadow-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setDescriptionPopup(false)}
            >
              <RxCross2 className="w-6 h-6" />
            </button>
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">About the space</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {cardDetails.description}
              </p>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-gray-100 text-black py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-gray-700">Help Center</a></li>
                <li><a href="#" className="hover:text-gray-700">Safety information</a></li>
                <li><a href="#" className="hover:text-gray-700">Cancellation options</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-gray-700">Our story</a></li>
                <li><a href="#" className="hover:text-gray-700">Careers</a></li>
                <li><a href="#" className="hover:text-gray-700">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Hosting</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-gray-700">Become a host</a></li>
                <li><a href="#" className="hover:text-gray-700">Host resources</a></li>
                <li><a href="#" className="hover:text-gray-700">Community forum</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li><a href="mailto:support@airbnb.com" className="hover:text-gray-700">support@airbnb.com</a></li>
                <li><a href="#" className="hover:text-gray-700">Contact Us</a></li>
                <li><a href="#" className="hover:text-gray-700">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>&copy; 2023 Airbnb Clone. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ViewCard;
