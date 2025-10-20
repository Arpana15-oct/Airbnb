import uploadOnCloudinary from "../config/cloudinary.js";
import Listing from "../model/listing.model.js";
import User from "../model/user.model.js";

export const addListing = async (req, res) => {
  try {

    let host = req.userId;
    let { title, description, rent, city, landmark, category, facilities } = req.body;
    let image1 = await uploadOnCloudinary(req.files.image1[0].path);
    let image2 = await uploadOnCloudinary(req.files.image2[0].path);
    let image3 = await uploadOnCloudinary(req.files.image3[0].path);

    let listing = await Listing.create({
      title,
      description,
      rent,
      city,
      landmark,
      category,
      facilities,
      image1,
      image2,
      image3,
      host,
    });
    let user = await User.findByIdAndUpdate(
      host,
      { $push: { listing: listing._id } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    res.status(201).json(listing);
  } catch (error) {
    return res.status(500).json({ message: `AddListing error ${error}` });
  }
};
export const getListing = async (req, res) => {
  try {
    let listing = await Listing.find().sort({ createdAt: -1 });
    return res.status(200).json(listing);
  } catch (error) {
    return res.status(500).json({ message: `getListing error ${error}` });
  }
};
export const findListing = async (req, res) => {
  try {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({ message: "listing not found" });
    }
    return res.status(200).json(listing);
  } catch (error) {
    return res.status(500).json(`findListing error ${error}`);
  }
};
export const updateListing = async (req, res) => {
  try {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    if (listing.host.toString() !== req.userId) {
      return res.status(403).json({ message: "You are not authorized to update this listing" });
    }
    let { title, description, rent, city, landmark, category, facilities } = req.body;
    let updateData = {
      title,
      description,
      rent,
      city,
      landmark,
      category,
      facilities,
    };
    if (req.files.image1) {
      updateData.image1 = await uploadOnCloudinary(req.files.image1[0].path);
    }
    if (req.files.image2) {
      updateData.image2 = await uploadOnCloudinary(req.files.image2[0].path);
    }
    if (req.files.image3) {
      updateData.image3 = await uploadOnCloudinary(req.files.image3[0].path);
    }
    let updatedListing = await Listing.findByIdAndUpdate(id, updateData, { new: true });

    return res.status(201).json(updatedListing);
  } catch (error) {
    return res.status(500).json({ message: `UpdateListing ${error}` });
  }
};
export const deleteListing=async (req,res) => {
  try {
    let {id}=req.params
    let listing = await Listing.findByIdAndDelete(id)
    let user= await User.findByIdAndUpdate(listing.host,{
      $pull:{listing:listing._id} 
    }, {new:true})
    if(!user){
      return res.status(404).json({message:"user not found"})
    }
    return res.status(200).json({message:"Listing deleted"})
  } catch (error) {
     return res.status(500).json({ message: `DeleteListing ${error}` });
  }
}
export const ratingListing = async (req, res) => {
  try {
    let { id } = req.params;
    let { ratings } = req.body;
    let listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({ message: "listing not found" });
    }
    listing.ratings = Number(ratings);
    await listing.save();
    return res.status(200).json({ ratings: listing.ratings });
  } catch (error) {
    return res.status(500).json({ message: `Rating Error ${error}` });
  }
};
export const search = async (req,res) => {
  try {
    const {query} = req.query;
    if(!query){
       return res.status(400).json({ message:"Search query is required" }); 
    }
    const listing = await Listing.find({
      $or:[
        {landmark: { $regex :query , $options: "i"}},
         {city: { $regex :query , $options: "i"}},
         {title: { $regex :query , $options: "i"}},
      ],
    });
    return res.status(200).json(listing);
  } catch (error) {
    console.error("Search Error:", error);
     return res.status(500).json({ message: "Internal server error" });
  }
  
}
