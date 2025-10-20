import Booking from "../model/booking.model.js"
import Listing from "../model/listing.model.js"
import User from "../model/user.model.js"

export const createBooking= async(req,res) =>{
  try {
    let{id}=req.params
    let{CheckIn,CheckOut,totalRent}= req.body
    let listing= await Listing.findById(id)
    if(!listing){
      return res.status(404).json({message:"Listing is not found"})
    }
    if(new Date(CheckIn) >=new Date(CheckOut)){
      return res.status(400).json({message:"Invalid CheckIn/CheckOut date"})
    }
    if(listing.isBooked){
      return res.status(400).json({message:"Listing is already Booked"})
    }
    let booking= await Booking.create({
      CheckIn,
      CheckOut,
      totalRent,
      host:listing.host,
      guest:req.userId,
      listing:listing._id
    })
    await booking.populate("host","email");
    let user= await User.findByIdAndUpdate(req.userId,{
      $push:{booking:listing._id}
    },{new:true})
     if(!user){
      return res.status(404).json({message:"User is not found"})
    }
    listing.guest=req.userId
    listing.isBooked=true
    await listing.save()
    return res.status(201).json(booking)
  } catch (error) {
    return res.status(500).json({message:`Booking Error${error}`})
  }
}
export const cancelBooking=async (req,res) => {
  try {
     let {id} = req.params
     let listing = await Listing.findById(id)
     if(!listing || !listing.isBooked){
       return res.status(400).json({message:"Listing not booked or not found"})
     }
     let booking = await Booking.findOne({listing: id, status: "booked"})
     if(!booking){
       return res.status(404).json({message:"Booking not found"})
     }
     // Update booking status to cancel
     booking.status = "cancel"
     await booking.save()
     // Update listing
     listing.isBooked = false
     listing.guest = null
     await listing.save()
     // Remove from user's booking array
     let user = await User.findByIdAndUpdate(booking.guest,{
       $pull:{booking: listing._id}
     },{new:true})
     if(!user){
        return res.status(404).json({message:"User is not found"})
     }
     return res.status(200).json({message:"Booking Cancelled"})
  } catch (error) {
    return res.status(500).json({message:"Booking Cancelled error"})
  }
}
