import jwt from "jsonwebtoken"

const genToken = async (userID) => {
  try {
    let token = await jwt.sign({userID},process.env.JWT_SECRET,{expiresIn:"7d"})
    return token
  } catch (error) {
    console.log("token error")
  }
  
}
export default genToken