import React from "react";
import Navbar from "../components/Navbar";
import arrow from "../assets/images/arrow.png";
import calender from "../assets/images/calender.png";
import certified from "../assets/images/certified.png";
import person from "../assets/images/person.png";

const AboutUs = () => {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <div className="text-center mt-16 px-6">
        <h2 className="text-2xl sm:text-3xl font-bold">
          Why Choose <span className="text-blue-600">FitLife</span> Fitness and Wellness?
        </h2>

        <p className="text-gray-600 mt-4 text-base sm:text-lg max-w-3xl mx-auto">
          We provide everything you need to succeed on your fitness and wellness journey
          with proven methods and expert support.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mt-16 px-6 text-center">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 border-2 border-black rounded-full flex items-center justify-center">
            <img className="h-12 w-12" src={certified} alt="Certified" />
          </div>
          <h3 className="font-semibold mt-4">Certified Professional Trainers</h3>
          <p className="text-gray-600 mt-2 text-sm">
            Work with certified fitness and wellness professionals who have years of experience and expertise.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-20 h-20 border-2 border-black rounded-full flex items-center justify-center">
            <img className="h-12 w-12" src={arrow} alt="Personalized" />
          </div>
          <h3 className="font-semibold mt-4">Personalized Workout & Diet Plans</h3>
          <p className="text-gray-600 mt-2 text-sm">
            Get customized plans tailored to your specific goals, fitness level and preferences.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-20 h-20 border-2 border-black rounded-full flex items-center justify-center">
            <img className="h-12 w-12" src={calender} alt="Flexible Schedule" />
          </div>
          <h3 className="font-semibold mt-4">Flexible Schedules</h3>
          <p className="text-gray-600 mt-2 text-sm">
            Choose from online and offline sessions that fit your busy lifestyle and schedule.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-20 h-20 border-2 border-black rounded-full flex items-center justify-center">
            <img className="h-12 w-12" src={person} alt="Community Support" />
          </div>
          <h3 className="font-semibold mt-4">Community Support & Progress Tracking</h3>
          <p className="text-gray-600 mt-2 text-sm">
            Join a supportive community and track your progress with our advanced monitoring tools.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;