import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext";
import { toast } from "react-toastify";
import { authDataContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // ✅ New loading state
  const navigate = useNavigate();


  const { setUserData, getCurrentUser } = useContext(userDataContext); // 👈 Add getCurrentUser
  const { serverUrl } = useContext(authDataContext); // 👈 Add this



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

      try {
       const res = await axios.post(serverUrl + "/api/auth/login", {
        email,
        password,
      }, {
        withCredentials: true  // 👈 YE BAHUT IMPORTANT HAI!
      });
      console.log("Login response:", res.data);
    console.log("Cookies after login:", document.cookie); // 👈 Debug log

    toast.success("Login Successfully");
    
    // Fetch current user data
    await getCurrentUser(); // 👈 YE LINE ADD KARO
    
    navigate("/");

      // Save token
      // localStorage.setItem("token", res.data.token);

      // Store user data in context
      // setUserData(res.data);
      //   toast.success("Login Successfully")
      // alert("Login successful!");
      // navigate("/");

    } catch (err) {
        toast.error(err.response.data.message)
      if (err.response && err.response.status === 401) {
        setError("Invalid email or password");
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {error && (
          <p className="mb-4 text-red-500 text-center font-medium">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={loading} // ✅ disable while loading
            className={`w-full text-white py-2 rounded-lg transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[red] hover:bg-[darkred]"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <span
            className="text-[red] cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;