import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { plansAPI } from "../services/api";

const BuyPage = () => {
  const { planId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { fetchProfile } = useAuth();

  const planFromState = location.state?.plan;
  const [plan, setPlan] = useState(planFromState || null);
  const [loading, setLoading] = useState(!planFromState);
  const [subscribing, setSubscribing] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!plan && planId) {
      plansAPI.getPlanById(planId)
        .then((result) => {
          if (result.success) setPlan(result.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [planId, plan]);

  const subscribe = async () => {
    setSubscribing(true);

    try {
      await plansAPI.buyPlan(planId);
    } catch (err) {
      console.error("Subscribe API error:", err);
    }

    await fetchProfile();

    setSuccess(true);
    setSubscribing(false);

    setTimeout(() => {
      navigate(`/plans/${planId}`);
    }, 1500);
  };

  if (loading)
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center text-white text-xl">
        Loading...
      </div>
    );

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white px-4">

      {plan && (
        <div className="text-center mb-8">
          {plan.image && (
            <img
              src={plan.image}
              alt={plan.title}
              className="w-72 h-48 object-cover rounded-xl mb-4 mx-auto"
              onError={(e) => { e.target.style.display = "none"; }}
            />
          )}
          <h1 className="text-3xl font-bold capitalize">{plan.title}</h1>
          <p className="text-2xl font-bold text-yellow-400 mt-1">Rs. {plan.price}</p>
          <p className="text-gray-400 mt-1">{plan.days?.length || 30} Days Program</p>
        </div>
      )}

      <p className="mb-8 text-lg text-center text-gray-300 max-w-md">
        Subscribe to unlock all workout days.<br />
        <span className="text-yellow-400 font-semibold">Day 1 unlocks immediately</span>,
        and a new day unlocks every 24 hours.
      </p>

      {success ? (
        <div className="flex flex-col items-center gap-3">
          <p className="text-green-400 text-2xl font-bold">Subscribed Successfully!</p>
        </div>
      ) : (
        <button
          onClick={subscribe}
          disabled={subscribing}
          className={`px-10 py-4 rounded-xl text-xl font-bold transition-all ${
            subscribing
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 active:scale-95"
          }`}
        >
          {subscribing ? "Processing..." : "Subscribe Now"}
        </button>
      )}
    </div>
  );
};

export default BuyPage;