import genToken from "../config/token.js";
import User from "../model/user.model.js";
import bcrypt from "bcryptjs";

// ✅ Fix: correct parameter order (req, res)
export const signUp = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    let existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    let hashPassword = await bcrypt.hash(password, 10);
    let user = await User.create({ name, email, password: hashPassword });

    // ⚠ Fix: property name should be _id, not _Id
    let token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENVIRONMENT === "Production", // fix: comparison, not assignment
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: `signUp error: ${error.message}` });
  }
};

// ✅ Fix: correct parameter order (req, res)
export const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    let user = await User.findOne({ email }).populate("listing","title image1 image2 image3 rent category city landmark");
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    // ⚠ Fix: use user._id, not User_Id
    let token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENVIRONMENT === "Production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `login error: ${error.message}` });
  }
};

// ✅ Fix: correct parameter order (req, res)
export const logOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "LogOut Successfully" });
  } catch (error) {
    return res.status(500).json({ message:` logout error: ${error.message}`});
  }
};