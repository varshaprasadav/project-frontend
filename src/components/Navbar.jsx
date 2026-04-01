import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-100 shadow-md px-10 py-4 flex items-center justify-between">
      
      <h1 className="text-3xl font-bold text-red-700">FitLife</h1>

      <ul className="flex space-x-10 font-semibold text-black">
        <li>
          <Link to="/" className="hover:text-red-700">Home</Link>
        </li>
        <li>
          <Link to="/services" className="hover:text-red-700">Services</Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-red-700">About</Link>
        </li>
        <li>
          <Link to="/gallery" className="hover:text-red-700">Gallery</Link>
        </li>
   
      </ul>

      <Link
        to="/login"
        className="bg-red-700 text-white px-5 py-2 rounded-md font-semibold hover:bg-red-800"
      >
        LOGIN
      </Link>

    </nav>
  );
};

export default Navbar;