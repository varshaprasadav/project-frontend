import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Services = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold text-center mt-16 md:mt-24">
        OUR SERVICES
      </h1>

      <p className="pt-4 font-bold text-base sm:text-xl md:text-2xl text-gray-500 text-center px-4">
        Choose from our comprehensive fitness programs designed to meet your <br className="hidden sm:block" />
        specific goals and fitness level.
      </p>

      <div className="flex flex-col md:flex-row gap-8 justify-center mt-16 md:mt-28 px-6">
        <div className="border bg-white p-8 rounded-2xl shadow-xl border-gray-200 w-full md:w-96 text-center">
          <h1 className="font-bold text-3xl text-green-600">FITNESS</h1>
          <p className="pt-4 text-gray-600">
            Build strength, improve endurance, and stay active with simple daily workout plans and movement techniques.
          </p>
        </div>

        <div className="border bg-white p-8 rounded-2xl shadow-xl border-gray-200 w-full md:w-96 text-center">
          <h1 className="font-bold text-3xl text-green-600">WELLNESS</h1>
          <p className="pt-4 text-gray-600">
            Explore balance, relaxation, mindfulness, and self-care routines to improve your mental and emotional wellbeing.
          </p>
        </div>
      </div>

    
    </div>
  );
};

export default Services;