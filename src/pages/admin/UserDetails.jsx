
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { adminAPI } from "../../services/api";

const UserDetails = () => {
  const { userName } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await adminAPI.getUserDetails(userName);
        if (!result.success) throw new Error(`HTTP ${result.error}`);
        const data = result.data;
        setUser(data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchUser();
  }, [userName]);

  if (loading) return <p>Loading user...</p>;
  if (!user) return <p>User not found</p>;

  const start = user.subscriptionStart ? new Date(user.subscriptionStart) : null;
  const end = start ? new Date(start) : null;
  if (end) end.setDate(end.getDate() + 30);
  const daysLeft = end ? Math.ceil((end - new Date()) / (1000*60*60*24)) : 0;

  return (
    <div className="p-5">
      <h1 className="text-3xl mb-4 font-bold">{user.userName}</h1>
      <p>Email: {user.email}</p>
      <p>Plan: {user.currentPlan?.title || "None"}</p>
      <p>Subscription Start: {start ? start.toDateString() : "N/A"}</p>
      <p>Subscription End: {end ? end.toDateString() : "N/A"}</p>
      <p>Days Left: {daysLeft}</p>

      <h2 className="text-2xl mt-6 mb-2 font-semibold">Workout Status</h2>
      <ul>
        {user.workoutStatus && user.workoutStatus.length > 0 ? (
          user.workoutStatus.map((w, idx) => (
            <li key={idx} className={w.completed ? "text-green-500" : "text-red-500"}>
              Day {w.day}: {w.completed ? "Completed" : "Pending"}
            </li>
          ))
        ) : (
          <li className="text-gray-400">No workouts started yet</li>
        )}
      </ul>
    </div>
  );
};

export default UserDetails;