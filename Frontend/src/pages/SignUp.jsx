import React, { useState, useContext } from "react";
import { IoMdEye } from "react-icons/io";
import { IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";
import { userDataContext } from "../context/UserContext";
import { toast } from "react-toastify";

function SignUp() {
  const navigate = useNavigate();

  // ✅ Correct context usage
  const {loading,setloading}=useContext(authDataContext);
  const { userData, setUserData } = useContext(userDataContext);

  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "", 
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setloading(true)
    e.preventDefault();

    try {
      const result = await axios.post(
        "http://localhost:5000/api/auth/signup",
        formData,
        { withCredentials: true }
      );

      // ✅ Save new user in both contexts
      setloading(false);
      setUserData(result.data.user); // store user details globally
      toast.success("SignUp Successfully")
      navigate("/");
    } catch (error) {
      const message =
        error.response?.data?.message || "Signup failed. Please try again.";
      setErrorMessage(message);
        toast.error("Something went wrong")

      // Auto-hide error after 5 seconds
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);

      console.error(message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-gray-600 mb-4 hover:text-black"
        >
          <FaArrowLeftLong className="mr-2" /> Back
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div className="relative">
            <input
              type={show ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <span
              onClick={() => setShow(!show)}
              className="absolute right-3 top-3 cursor-pointer text-gray-500"
            >
              {show ? <IoEyeOff size={22} /> : <IoMdEye size={22} />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-[red] text-white p-3 rounded-lg hover:bg-[darkred] transition disabled={loading}"
          >
            {loading?"Loading.....":"SignUp"}
          </button>
        </form>

        {/* 🔹 Show error message */}
        {errorMessage && (
          <p className="text-red-500 text-center mt-3">{errorMessage}</p>
        )}

        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-[red] cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignUp;