import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { profileAPI } from "../services/api";

const UpdateProfile = () => {
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

  useEffect(() => {
    if (!profile) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const result = await profileAPI.getProfile(profile.userName);
        const data = result.data;

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
          level: data.activityLevel || "", 
        });
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
      const result = await profileAPI.updateProfile({
        ...form,
        userName: profile.userName,
      });

      if (!result.success) throw new Error(result.error || "Update failed");

      alert("Profile Updated ✅");
      navigate("/plans");
    } catch (err) {
      console.error(err);
      alert("Error updating profile");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <h2 className="text-3xl text-center mt-6 font-bold">
        Update Profile
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white max-w-5xl mx-auto mt-10 p-10 rounded shadow"
      >
        <div className="grid grid-cols-2 gap-4">

          <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" className="border p-2" />
          <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" className="border p-2" />

          <input type="date" name="dob" value={form.dob} onChange={handleChange} className="border p-2" />
          <input type="number" name="age" value={form.age} onChange={handleChange} className="border p-2" />

          <input name="height" value={form.height} onChange={handleChange} placeholder="Height" className="border p-2" />
          <input name="weight" value={form.weight} onChange={handleChange} placeholder="Weight" className="border p-2" />

          <select name="gender" value={form.gender} onChange={handleChange} className="border p-2">
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <select name="fitnessLevel" value={form.fitnessLevel} onChange={handleChange} className="border p-2">
            <option value="">Fitness Level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
          </select>

          <select name="fitnessGoal" value={form.fitnessGoal} onChange={handleChange} className="border p-2">
            <option value="">Fitness Goal</option>
            <option value="lose weight">Lose weight</option>
            <option value="build muscle">Build muscle</option>
          </select>

          <select name="level" value={form.level} onChange={handleChange} className="border p-2">
            <option value="">Activity Level</option>
            <option value="Lightly Active">Lightly Active</option>
            <option value="Active">Active</option>
          </select>

        </div>

        <div className="text-center mt-6">
          <button className="bg-blue-600 text-white px-6 py-2 rounded">
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;