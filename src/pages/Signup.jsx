
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authAPI } from "../services/api";
import thread from "../assets/images/thread.jpeg";

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const result = await authAPI.signup({ userName: name, email, password });

      if (!result.success) {
        setError(result.error);
        return;
      }

      alert("Signup Successful");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  };

  return (
    <div className="flex flex-col-reverse md:flex-row min-h-screen bg-black">
        <div className="md:w-1/2 w-full h-64 md:h-auto">
        <img src={thread} className="w-full h-full object-cover" alt="Signup Visual" />
      </div>
      
      <div className="md:w-1/2 w-full flex flex-col justify-center px-8 md:px-28 py-12 md:py-0">
        <h1 className="text-white text-4xl md:text-5xl font-bold">Create Account</h1>
        <p className="text-gray-300 mt-3 text-sm md:text-base">Please signup to continue.</p>

        <form onSubmit={handleSignup} className="mt-6 md:mt-8">

          <div className="mt-4 md:mt-6">
            <label className="text-white text-sm font-semibold">Username</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Username"
              className="w-full mt-1 h-10 md:h-9 rounded-md bg-gray-300 px-3 outline-none text-sm md:text-sm"
              required
            />
          </div>

          <div className="mt-4 md:mt-5">
            <label className="text-white text-sm font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              className="w-full mt-1 h-10 md:h-9 rounded-md bg-gray-300 px-3 outline-none text-sm md:text-sm"
              required
            />
          </div>

          <div className="mt-4 md:mt-5">
            <label className="text-white text-sm font-semibold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="w-full mt-1 h-10 md:h-9 rounded-md bg-gray-300 px-3 outline-none text-sm md:text-sm"
              required
            />
          </div>

          {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 mt-6 h-10 w-full text-white rounded-md text-sm md:text-base font-semibold"
          >
            Sign Up
          </button>
        </form>

        <p className="text-white mt-4 text-center text-sm md:text-base">
          Already have an account?
          <Link to="/login" className="text-green-500 ml-2">Login</Link>
        </p>
      </div>

     

    </div>
  );
};

export default Signup;