import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { plansAPI } from "../services/api";

const UserPlans = () => {
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();

  const fetchPlans = async () => {
    const result = await plansAPI.getAllPlans();
    setPlans(result.success ? result.data : []);
  };

  useEffect(() => { fetchPlans(); }, []);

  const handlePlanClick = (plan) => {
    navigate(`/plan-days/${plan.title.replace(/\s+/g, "-")}`);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white pt-2 p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 justify-items-center">
        {plans.map((plan, index) => (
          <div key={index} className={`${plan.bg} rounded-xl overflow-hidden hover:scale-105 transition-all w-80`}>
            <img src={plan.image} alt={plan.title} className="w-full h-52 object-cover" />
            <div className="p-3">
              <h2 className="text-lg font-semibold">{plan.title}</h2>
              <p className="text-2xl font-bold mt-1">₹ {plan.price}</p>
              <p className="text-sm">{plan.days} Days Access</p>
              <button onClick={() => handlePlanClick(plan)} className={`w-full bg-white ${plan.buttonColor} font-bold text-lg h-9 mt-2 rounded-full`}>
                {plan.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPlans;