
import { useEffect, useState } from "react";
import { adminAPI } from "../../services/api";

const AdminDashboard = () => {

  const [stats,setStats] = useState(null);

  useEffect(()=>{

    adminAPI.getDashboard()
      .then(result => {
        if (result.success) setStats(result.data);
      });

  },[])

  if(!stats) return <div>Loading...</div>

  return(

    <div>

      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-3 gap-6 text-center ">

        <div className="bg-blue-600 p-6 rounded">
          Total Users
          <h2 className="text-2xl">{stats.totalUsers}</h2>
        </div>

        <div className="bg-green-600 p-6 rounded">
          Paid Users
          <h2 className="text-2xl ">{stats.paidUsers}</h2>
        </div>

      

        <div className="bg-purple-600 p-6 rounded">
          Active Today
          <h2 className="text-2xl">{stats.activeUsers}</h2>
        </div>

      </div>

    </div>

  )

}

export default AdminDashboard;


