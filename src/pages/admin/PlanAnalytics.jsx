import {useEffect,useState} from "react";
import { adminAPI } from "../../services/api";

const PlanAnalytics = ()=>{

  const [plans,setPlans] = useState([]);

  useEffect(()=>{

    adminAPI.getAnalytics()
      .then(result => {
        if (result.success) setPlans(result.data);
      });

  },[])

  return(

    <div>

      <h1 className="text-2xl mb-6">Plan Analytics</h1>

      {plans.map((p,i)=>(
        <div key={i} className="bg-gray-800 p-4 mb-3 rounded">

          {p._id} — {p.totalUsers} users

        </div>
      ))}

    </div>

  )

}

export default PlanAnalytics