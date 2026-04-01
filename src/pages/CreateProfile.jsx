import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { profileAPI } from "../services/api";

const CreateProfile = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    age: "",
    height: "",
    weight: "",
    gender: "",
    fitnessLevel: "",
    fitnessGoal: "",
    level: "",
  });

  const [exists, setExists] = useState(false);

  useEffect(() => {
    if (!profile) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const result = await profileAPI.getProfile(profile.userName);

        if (!result.success) return;

        const data = result.data;

        if (data) {
          setExists(true);
          setForm({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            dob: data.dob || "",
            age: data.age || "",
            height: data.height || "",
            weight: data.weight || "",
            gender: data.gender || "",
            fitnessLevel: data.fitnessLevel || "",
            fitnessGoal: data.fitnessGoal || "",
            level: data.level || "",
          });
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, [profile, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = exists
        ? await profileAPI.updateProfile({ ...form, userName: profile.userName })
        : await profileAPI.createProfile({ ...form, userName: profile.userName });

      if (!result.success) {
        throw new Error(result.error || "Failed to save profile");
      }

      navigate("/plans");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">

     

      <div className="bg-[#66ff66] p-6 text-center">
        <h2 className="text-4xl font-bold">Create Profile </h2>
        <p className="text-gray-700 font-semibold pt-3">
          Let's set up your profile and start your wellness journey
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white max-w-5xl mx-auto mt-16 p-10 rounded-lg shadow-lg"
      >
        <div className="grid grid-cols-2 gap-4">

          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="First Name"
            required
            className="border p-2"
          />

          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            required
            className="border p-2"
          />

          <input
            name="dob"
            type="date"
            value={form.dob}
            onChange={handleChange}
            required
            className="border p-2"
          />

          <input
            name="age"
            type="number"
            value={form.age}
            onChange={handleChange}
            placeholder="Age"
            required
            className="border p-2"
          />

          <input
            name="height"
            value={form.height}
            onChange={handleChange}
            placeholder="Height"
            required
            className="border p-2"
          />

          <input
            name="weight"
            value={form.weight}
            onChange={handleChange}
            placeholder="Weight"
            required
            className="border p-2"
          />

          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            required
            className="border p-2"
          >
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>

          <select
            name="fitnessLevel"
            value={form.fitnessLevel}
            onChange={handleChange}
            required
            className="border p-2"
          >
            <option value="">Fitness Level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          <select
            name="fitnessGoal"
            value={form.fitnessGoal}
            onChange={handleChange}
            required
            className="border p-2"
          >
            <option value="">Fitness Goal</option>
            <option value="lose weight">Lose weight</option>
            <option value="build muscle">Build muscle</option>
            <option value="increase strength">Increase strength</option>
            <option value="gain weight">Gain weight</option>
            <option value="tone body">Tone / Shape body</option>
            <option value="reduce stress">Reduce stress</option>
          </select>

          <select
            name="level"
            value={form.level}
            onChange={handleChange}
            required
            className="border p-2"
          >
            <option value="">Activity Level</option>
            <option value="Lightly Active">Lightly Active</option>
            <option value="Active">Active</option>
            <option value="Very Active">Very Active</option>
          </select>

        </div>

        <div className="text-center mt-8">
          <button
            type="submit"
            className="bg-green-500 w-72 h-10 hover:bg-green-600 text-white font-semibold rounded-lg"
          >
            {exists ? "Update Profile" : "Save Profile"}
          </button>
        </div>

      </form>
    </div>
  );
};

export default CreateProfile;