
import { Link, Outlet, useNavigate } from "react-router-dom";

const AdminLayout = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");  
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">

      <div className="w-64 bg-black p-6 flex flex-col justify-between">

        <div>

          <h2 className="text-2xl font-bold mb-6">ADMIN PANEL</h2>

          <div className="flex flex-col gap-4">

            <Link to="/admin/dashboard">Dashboard</Link>

            <Link to="/admin/users">Users</Link>

            <Link to="/admin/workoutStats">Workout Stats</Link>

            <Link to="/admin/planAnalytics">Plan Analytics</Link>
          <Link to="/admin/bookings">Offline Users</Link>
            <Link to="/admin/plans">Manage Plans</Link>
<Link to="/admin/offline-plans">Offline Plans</Link>
          </div>

        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 p-2 rounded mt-6"
        >
          Logout
        </button>

      </div>

      <div className="flex-1 p-6">
        <Outlet />
      </div>

    </div>
  );
};

export default AdminLayout;