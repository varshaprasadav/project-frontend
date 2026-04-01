
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import thread from "../assets/images/thread.jpeg";
import { useAuth } from "../context/AuthContext";
import { profileAPI } from "../services/api";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();   

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password);

      if (user.role === "admin") {
        navigate("/admin/dashboard");
        return;
      }

      const profileRes = await profileAPI.getProfile(user.userName);
      const profileData = profileRes.data;

      if (!profileRes.success || !profileData) {
        navigate("/createprofile");
      } else {
        navigate("/plans");
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Server error");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black">

      <div className="md:w-1/2 w-full flex flex-col justify-center px-8 md:px-28 py-12 md:py-0">
        <h1 className="text-white text-4xl md:text-6xl font-bold">
          Welcome <br /> Back!
        </h1>

        <p className="text-gray-300 mt-4 text-sm md:text-base">
          Please login to your account.
        </p>

        <form onSubmit={handleLogin} className="mt-8 md:mt-10">

          <div className="mt-4 md:mt-6">
            <label className="text-white text-sm font-semibold">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              className="w-full mt-2 h-10 md:h-9 rounded-md bg-gray-300 px-3 text-sm md:text-sm outline-none"
              required
            />
          </div>

          <div className="mt-4 md:mt-6">
            <label className="text-white text-sm font-semibold">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="w-full mt-2 h-10 md:h-9 rounded-md bg-gray-300 px-3 text-sm md:text-sm outline-none"
              required
            /> 
          </div>

          {error && (
            <p className="text-red-500 mt-3 text-sm">{error}</p>
          )}

          <button className="bg-blue-600 mt-6 h-10 w-full text-white rounded-md text-sm md:text-base">
            Login
          </button>

        </form>

        <p className="text-white mt-4 text-center text-sm md:text-base">
          Don't have an account?
          <Link to="/signup" className="text-green-500 ml-2">
            Register
          </Link>
        </p>
      </div>

      <div className="md:w-1/2 w-full h-64 md:h-auto">
        <img src={thread} className="w-full h-full object-cover" alt="Login Visual"/>
      </div>

    </div>
  );
};

export default Login;