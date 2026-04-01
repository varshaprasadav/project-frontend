
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { plansAPI, authAPI } from "../services/api";
import apiFetch from "../services/api";

const PlanDays = () => {
  const { planId } = useParams();
  const navigate = useNavigate();

  const [plan, setPlan] = useState(null);
  const [allowedDays, setAllowedDays] = useState(0);
  const [completedDays, setCompletedDays] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resPlan = await plansAPI.getPlanById(planId);
        if (!resPlan.success) { navigate("/plans"); return; }
        const planData = resPlan.data;
        setPlan(planData);

        const resUser = await authAPI.getProfile();
        const user = resUser.data;
        if (!user.isPaid) { navigate(`/buy/${planId}`); return; }

        let allowed = 1;
        if (user.subscriptionStart) {
          const start = new Date(user.subscriptionStart);
          const today = new Date();
          start.setHours(0,0,0,0);
          today.setHours(0,0,0,0);
          const diffDays = Math.floor((today - start) / (1000 * 60 * 60 * 24));
          allowed = diffDays + 1;
        }
        allowed = Math.min(allowed, planData.days.length);
        setAllowedDays(allowed);

        const resCompleted = await apiFetch(
          `/user/allDayStatus?planId=${planId}`
        );
        const completedData = resCompleted.data;
        setCompletedDays(completedData.completedDays || []);

      } catch (err) {
        console.error(err);
        navigate("/plans");
      }
    };

    fetchData();
  }, [planId, navigate]);

  if (!plan) return <div className="text-white p-10">Loading...</div>;

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">{plan.title}</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 justify-items-center">
        {plan.days.map((day, index) => {
          const dayNumber = index + 1;
          const locked = dayNumber > allowedDays;
          const isCompleted = completedDays.includes(dayNumber);

          return (
            <div
              key={dayNumber}
              onClick={() => !locked && navigate(`/day/${dayNumber}?plan=${planId}`)}
              className={`w-50 h-36 flex items-center justify-center rounded-xl font-bold text-xl cursor-pointer
                ${locked
                  ? "bg-gray-700  cursor-not-allowed"
                  : isCompleted
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-yellow-600 hover:bg-yellow-700"
                }`}
            >
              {locked ? `Day ${dayNumber} 🔒` : isCompleted ? `Day ${dayNumber} ` : `Day ${dayNumber}`}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlanDays;