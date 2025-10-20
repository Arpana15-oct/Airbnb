import axios from 'axios';
import React, { useContext, useState } from 'react'
import { createContext } from 'react'
import { authDataContext } from './AuthContext';
import { userDataContext } from './UserContext';
import { listingDataContext } from './Listingcontext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
export const bookingDataContext = createContext()
function BookingContext({children}) {
  let[CheckIn,setCheckIn]=useState("");
  let[CheckOut,setCheckOut]=useState("");
  let[total,setTotal]=useState(0);
  let[night,setNight]=useState(0);
  let{serverUrl}=useContext(authDataContext);
  let{getCurrentUser}=useContext(userDataContext);
  let{getListing}=useContext(listingDataContext);
  let[bookingData,setBookingData]=useState([]); 
   let[booking,setBooking]=useState(null);
   const navigate = useNavigate()
  const handleBooking= async (id) => {
    setBooking(true)
    try {
      let result= await axios.post(serverUrl +`/api/booking/create/${id}`,
        {
          CheckIn,CheckOut,totalRent:total
        },{withCredentials:true}
      )
      await getCurrentUser()
      await getListing()
      setBookingData(result.data)
      console.log(result.data)
      setBooking(false)
      toast.success("Booking Successfully")
      navigate("/booked")
    } catch (error) {
      console.log(error)
      setBookingData(null)
       toast.error(error.response.data.message)
      setBooking(false)
      
    }
  }
  const cancelBooking= async (id) => {
    try {
     let result= await axios.delete(serverUrl +`/api/booking/delete/${id}`,
        {withCredentials:true}
      )
      await getCurrentUser()
      await getListing()
      console.log(result.data)
        toast.success("CancelBooking Successfully")
  } catch (error) {
     console.log(error)
      toast.error(error.response.data.message)
  }

  }
  let value={
    CheckIn,setCheckIn,
    CheckOut,setCheckOut,
    total,setTotal,
    night,setNight,
    bookingData,setBookingData,
    handleBooking,cancelBooking,
    booking,setBooking,

  }
  return (
    <div>
      <bookingDataContext.Provider value={value}>
        {children}
        </bookingDataContext.Provider></div>
  )
}

export default BookingContext
