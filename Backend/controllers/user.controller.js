// import User from "../model/user.model.js";
// export const getCurrentUser = async (req, res) => {
//   try {
//     let user = await User.findById(req.userId)
//       .select("-password")
//       .populate(
//         "listing",
//         "title image1 image2 image3 rent category city landmark isBooked host ratings"
//       )
//       .populate(
//         "booking",
//         "title image1 image2 image3 rent category city landmark isBooked host ratings"
//       );
//     if (!user) {
//       return res.status(404).json({ message: "user not found" });
//     }
//     return res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ message: `getCurrentUser error ${error}` });
//   }
// };

import User from "../model/user.model.js";

export const getCurrentUser = async (req, res) => {
  console.log("📝 getCurrentUser controller called");
  console.log("User ID from token:", req.userId);
  
  try {
    let user = await User.findById(req.userId)
      .select("-password")
      .populate(
        "listing",
        "title image1 image2 image3 rent category city landmark isBooked host ratings"
      )
      .populate(
        "booking",
        "title image1 image2 image3 rent category city landmark isBooked host ratings"
      );
    
    if (!user) {
      console.log("❌ User not found in database");
      return res.status(404).json({ message: "user not found" });
    }
    
    console.log("✅ User found:", user.email);
    return res.status(200).json(user);
  } catch (error) {
    console.log("❌ Error in getCurrentUser:", error);
    res.status(500).json({ message: `getCurrentUser error ${error}` });
  }
};