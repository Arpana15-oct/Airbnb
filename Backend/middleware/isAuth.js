// import jwt from "jsonwebtoken"
// const isAuth = async (req,res,next) => {
//   try {
//     let {token} = req.cookies
//     if (!token) {
//       res.status(400).json({message:"user doesn't have a token"})  
//     }
//     let verifyToken = jwt.verify(token,process.env.JWT_SECRET)
//     if (!verifyToken) {
//       res.status(400).json({message:"user doesn't have a Valid token"})  
//     }
//     req.userId = verifyToken.userId
//     next()
//   } catch (error) {
//     res.status(500).json({message:`isAuth error ${error}`})
//   }
  
// }
// export default isAuth
import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    let { token } = req.cookies;
    
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    let verifyToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!verifyToken) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.userId = verifyToken.userID; // Keep this fix!
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Invalid token" });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Token expired" });
    }
    return res.status(500).json({ message: `Authentication error: ${error.message}` });
  }
};

export default isAuth;