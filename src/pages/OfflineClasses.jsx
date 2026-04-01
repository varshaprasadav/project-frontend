
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { offlinePlansAPI } from "../services/api";

const OfflineClasses = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    offlinePlansAPI.getAllOfflinePlans()
      .then((result) => setPlans(result.success ? result.data : []))
      .catch(() => setPlans([]));
  }, []);

  return (
    <div className="bg-gray-600 min-h-screen p-6  ">

    



  <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4 mb-10">
    
    <h1 className="text-3xl font-bold text-red-500">
      FitLife
    </h1>

   


 <div className="space-x-6">
      <Link
        to="/"
        className="text-blue-500 text-xl hover:text-gray-200 font-bold"
      >
        Home
      </Link>
    </div>

</div>

 <div className="text-center py-2 px-4 mb-7">
    <h2 className="text-4xl md:text-4xl font-bold text-white">
      Offline Training Programs
    </h2>

    <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg mb-8">
      Choose the perfect plan and start your fitness journey with expert trainers and structured workouts.
    </p>
  </div>

      <div className="flex gap-20 justify-center  ">
        {plans.length === 0 && <p>No plans available</p>}

        {plans.map((plan) => (
          <div key={plan._id} className="bg-black text-white p-6  rounded w-80">

            <h2 className="text-5xl text-center font-bold mt-4">₹ {plan.price}</h2>

            <p className="mt-10 text-center text-xl">{plan.duration}</p>

            {plan.packageName && <h3 className="font-semibold text-center text-orange-500 mt-8">{plan.packageName}</h3>}

            {plan.note && <p className="italic text-center text-sm mt-4">{plan.note}</p>}

            {plan.features?.map((f, i) => (
              <p key={i} className="mt-8 text-center">{f}</p>
            ))}

            <Link
              to="/book-class"
              state={{ plan: plan.duration, price: plan.price }}
              className="bg-orange-500 px-4 py-2 block mt-8 mb-8 text-center hover:scale-95"
            >
              Book Now
            </Link>

          </div>
        ))}
      </div>
    </div>
  );
};

export default OfflineClasses;