
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { offlinePlansAPI } from "../../services/api";

const AdminOfflinePlans = () => {
  const [form, setForm] = useState({
    price: "",
    duration: "",
    packageName: "",
    note: "",
  });

  const [featureInput, setFeatureInput] = useState("");
  const [featuresList, setFeaturesList] = useState([]);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const result = await offlinePlansAPI.getAllOfflinePlans();
      setPlans(result.success && Array.isArray(result.data) ? result.data : []);
    } catch (err) {
      console.error(err);
      setPlans([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleAddFeature = () => {
    const trimmed = featureInput.trim();
    if (!trimmed) return;
    setFeaturesList([...featuresList, trimmed]);
    setFeatureInput("");
  };

  const handleRemoveFeature = (index) => {
    setFeaturesList(featuresList.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await offlinePlansAPI.createOfflinePlan({ ...form, features: featuresList });

      if (result.success) {
        const newPlan = result.data;
        setPlans([newPlan, ...plans]);
        setForm({ price: "", duration: "", packageName: "", note: "" });
        setFeaturesList([]);
        setFeatureInput("");
      } else {
        alert("Failed to add plan: " + result.error);
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this plan?")) return;
    try {
      const result = await offlinePlansAPI.deleteOfflinePlan(id);
      if (result.success) {
        setPlans(plans.filter((p) => p._id !== id));
      } else {
        alert("Failed to delete plan: " + result.error);
      }
    } catch (err) {
      console.error(err);
      alert("Server error while deleting plan");
    }
  };

  return (
    <div className="p-6">
      <div className="p-4 bg-gray-800 rounded mb-6">
        <h2 className="text-xl font-bold mb-4">Add Offline Plan</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="p-2 rounded bg-gray-700"
          />
          <input
            name="duration"
            placeholder="Duration (e.g. 6 Months)"
            value={form.duration}
            onChange={handleChange}
            className="p-2 rounded bg-gray-700"
          />
          <input
            name="packageName"
            placeholder="Package Name"
            value={form.packageName}
            onChange={handleChange}
            className="p-2 rounded bg-gray-700"
          />
          <input
            name="note"
            placeholder="Note (e.g. Access to Gym)"
            value={form.note}
            onChange={handleChange}
            className="p-2 rounded bg-gray-700"
          />

          <div className="flex gap-2">
            <input
              placeholder="Add a feature"
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddFeature())}
              className="p-2 rounded bg-gray-700 flex-1"
            />
            <button
              type="button"
              onClick={handleAddFeature}
              className="bg-blue-600 hover:bg-blue-700 px-4 rounded font-bold"
            >
              + Add
            </button>
          </div>

          {featuresList.length > 0 && (
            <div className="flex flex-col gap-1 bg-gray-700 p-3 rounded">
              {featuresList.map((f, i) => (
                <div key={i} className="flex justify-between items-center text-sm text-gray-200">
                  <span>✓ {f}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(i)}
                    className="text-red-400 hover:text-red-300 ml-2"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 p-2 rounded font-bold"
          >
            Add Plan
          </button>
        </form>
      </div>

      {loading ? (
        <p>Loading plans...</p>
      ) : (
        <div className="flex gap-10">
          {plans.length === 0 && <p>No plans found. Please add plans.</p>}
          {plans.map((plan) => (
            <div
              key={plan._id}
              className="bg-gray-800 rounded-xl overflow-hidden w-80 shadow-lg hover:scale-105 transition-all"
            >
              <div className="p-5 text-center flex flex-col gap-2">
                <p className="text-3xl pt-4 font-bold text-green-400">₹ {plan.price}</p>
                <p className="text-sm pt-5 text-gray-300 font-medium">{plan.duration}</p>
                <h2 className="text-lg font-semibold text-white pt-5">{plan.packageName}</h2>
                {plan.note && <p className="text-sm text-gray-300 italic">{plan.note}</p>}
                {plan.features?.length > 0 && (
                  <div className="flex flex-col gap-1 mt-1">
                    {plan.features.map((f, i) => (
                      <p key={i} className="text-sm text-gray-200">✓ {f}</p>
                    ))}
                  </div>
                )}
                <button
                  onClick={() => handleDelete(plan._id)}
                  className="w-full bg-red-600 mt-3 font-bold text-lg h-9 rounded-full hover:bg-red-700"
                >
                  Delete Plan
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOfflinePlans;