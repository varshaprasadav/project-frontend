import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { plansAPI, authAPI } from "../services/api";

const TrainingPlans = () => {
  const [plans, setPlans] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const resPlans = await plansAPI.getAllPlans();
        setPlans(resPlans.success && Array.isArray(resPlans.data) ? resPlans.data : []);
        console.log(resPlans.data);
        

        const resUser = await authAPI.getProfile();
        if (resUser.success) {
          const userData = resUser.data;
          setCurrentUser(userData);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setPlans([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);
const handlePlanClick = (plan) => {
  if (
    currentUser?.isPaid &&
    currentUser?.currentPlan?._id === plan._id
  ) {
    navigate(`/plans/${plan._id}`); 
  } else {
    navigate(`/buy/${plan._id}`, { state: { plan } }); 
  }
};

  if (loading)
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center text-white text-xl">
        Loading plans...
      </div>
    );

  if (!plans.length)
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center text-white text-xl">
        No plans found.
      </div>
    );

  return (
    <div className="bg-gray-900 min-h-screen text-white pt-2 p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Training Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 justify-items-center">
        {plans.map((plan) => (
          <div
            key={plan._id}
            className={`${plan.bg || "bg-gray-800"} rounded-xl overflow-hidden hover:scale-105 transition-all w-80 cursor-pointer`}
            onClick={() => handlePlanClick(plan)}
          >
            <img
              src={plan.image || "/placeholder.jpg"}
              alt={plan.title}
              className="w-full h-52 object-cover"
              onError={(e) => { e.target.src = "/placeholder.jpg"; }}
            />
            <div className="p-3">
              <h2 className="text-lg font-semibold">{plan.title}{}</h2>
              <p className="text-2xl font-bold mt-1">Rs. {plan.price}</p>
              <p className="text-sm">{plan.days?.length || 30} Days Access</p>
              <button
                className={`w-full bg-white ${plan.buttonColor || "text-black"} font-bold text-lg h-9 mt-2 rounded-full`}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlanClick(plan);
                }}
              >
                {plan.buttonText || "Subscribe"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainingPlans;