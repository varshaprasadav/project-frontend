import { useEffect, useState } from "react";
import { adminAPI } from "../../services/api";

const WorkoutStats = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    adminAPI.getWorkoutStats()
      .then((result) => {
        if (result.success) setStats(result.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-5 bg-gray-900 ">
      <h1 className="text-3xl font-bold mb-6 text-white border-b border-gray-700 pb-10 ">
        Workout Leaderboard
      </h1>

      <div className="flex flex-col gap-4 p-4">
        {stats.map((user, i) => (
          <div
            key={i}
            className="bg-gray-800 shadow-lg rounded-lg p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 "
          >
            <div>
              <h2 className="text-xl font-bold text-white">{user.userName}</h2>
              <p className="text-gray-400">Plan: {user.planTitle}</p>
            </div>

            <div className="flex flex-col md:flex-row gap-3 mt-2 md:mt-0">
              <div
                className={`px-3 py-1 rounded font-medium ${
                  user.currentDayStatus.status === "Completed"
                    ? "bg-green-600 text-white"
                    : user.currentDayStatus.status === "In Progress"
                    ? "bg-yellow-500 text-white"
                    : "bg-red-600 text-white"
                }`}
              >
                Day {user.currentDayStatus.day}: {user.currentDayStatus.status}
              </div>

              <div
                className={`px-3 py-1 rounded font-medium ${
                  user.nextDayStatus.status === "Completed"
                    ? "bg-green-600 text-white"
                    : user.nextDayStatus.status === "In Progress"
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-600 text-white"
                }`}
              >
                Next Day {user.nextDayStatus.day}: {user.nextDayStatus.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutStats;