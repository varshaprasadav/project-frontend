import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar1 = () => {
  const navigate = useNavigate();
  const { profile, logout } = useAuth(); 

  const handleLogout = async () => {
    await logout();      
    navigate("/login");
  };
  const goToDashboard = () => {
    navigate("/plans"); 
  };


  return (
    <div className="bg-blue-600 h-14 flex justify-between items-center px-6">

    
      <div>
        <h1 className="text-white text-xl font-bold">
          Welcome, {profile?.userName || "User"}
        </h1>
        <p className="text-white text-sm">{profile?.email || ""}</p>
      </div>

    
      <div className="flex items-center space-x-4">
        <button
  onClick={() => navigate("/update-profile")}
  className="bg-yellow-500 text-white h-8 w-32 rounded"
>
  Edit Profile
</button>
  <button
          onClick={goToDashboard}
          className="bg-green-600 text-white font-semibold h-8 w-24 rounded hover:bg-green-700"
        >
          Dashboard
        </button>



       <button
          onClick={handleLogout}
          className="bg-red-600 text-white font-semibold h-8 w-24 rounded hover:bg-red-700"
        >
          Logout
        </button>

       
      </div>

    </div>
  );
};

export default Navbar1;