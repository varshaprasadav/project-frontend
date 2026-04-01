import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { bookingsAPI } from "../services/api";

const BookClass = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const plan = location.state?.plan || "Not Selected";
  const price = location.state?.price || 0;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    address: "",
    goal: "",
    time: "",
    startDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const result = await bookingsAPI.bookClass({ ...formData, plan, price });

      if (!result.success) throw new Error(result.error);

      setMessage(" Booking Successful!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        age: "",
        gender: "",
        address: "",
        goal: "",
        time: "",
        startDate: "",
      });

      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error(error);
      setMessage(" Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-2 text-center">
          Book Your Plan
        </h2>

        <div className="text-center mb-6">
          <p>Plan: <b>{plan}</b></p>
          <p>Price: <b>₹{price}</b></p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">

          <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="p-3 border rounded w-full" required />
          <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} className="p-3 border rounded w-full" required />
          <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="p-3 border rounded w-full" required />
          <input name="age" placeholder="Age" value={formData.age} onChange={handleChange} className="p-3 border rounded w-full" />

          <select name="gender" value={formData.gender} onChange={handleChange} className="p-3 border rounded w-full">
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="p-3 border rounded w-full" />

          <select name="goal" value={formData.goal} onChange={handleChange} className="p-3 border rounded w-full">
            <option value="">Fitness Goal</option>
            <option>Weight Loss</option>
            <option>Muscle Gain</option>
            <option>General Fitness</option>
          </select>

          <select name="time" value={formData.time} onChange={handleChange} className="p-3 border rounded w-full">
            <option value="">Preferred Time</option>
            <option>Morning</option>
            <option>Evening</option>
          </select>

          <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="p-3 border rounded w-full" />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded text-white ${
              loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Processing..." : "Confirm Booking"}
          </button>

        </form>

        {message && <p className="mt-4 text-center">{message}</p>}
      </div>
    </div>
  );
};

export default BookClass;