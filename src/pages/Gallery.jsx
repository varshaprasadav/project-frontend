import React from "react";
import Navbar from "../components/Navbar";
import g1 from "../assets/images/g1.jpeg";
import g2 from "../assets/images/g2.jpeg";
import g4 from "../assets/images/g4.jpeg";
import g5 from "../assets/images/g5.jpeg";
import g6 from "../assets/images/g6.jpeg";
import g7 from "../assets/images/g7.jpeg";
import g8 from "../assets/images/g8.jpeg";
import g9 from "../assets/images/g9.jpeg";


const Gallery = () => {
  const images = [g1, g2, g4, g5, g6, g7, g8, g9];

  return (
    <div className="bg-gray-200 min-h-screen ">
      <Navbar />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4 mt-8 justify-items-center">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="w-full max-w-xs h-72 overflow-hidden rounded-xl shadow-lg transform transition hover:scale-105"
          >
            <img
              src={img}
              alt={`gallery-${idx}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;