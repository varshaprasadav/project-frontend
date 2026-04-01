import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { adminAPI } from "../../services/api";

const UserProfileView = () => {
  const { userName } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const result = await adminAPI.getUserProfile(userName);

        if (!result.success) {
          throw new Error(result.error || "Failed to fetch profile");
        }

        setData(result.data);
      } catch (err) {
        console.error(err);
        alert(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userName]);

  if (loading)
    return <div className="text-center mt-20 text-gray-700 text-lg">Loading...</div>;
  if (!data)
    return <div className="text-center mt-20 text-gray-700 text-lg">No data found</div>;

  const { user, profile } = data;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-50 rounded-xl shadow-md border border-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        User Profile: {user.userName}
      </h2>

      <div className="mb-8 bg-white p-5 rounded-lg shadow-sm border border-gray-100">
        <h3 className="font-semibold text-lg text-gray-700 mb-3">Account Info</h3>
        <p className="text-gray-600 mb-1"><span className="font-medium">Email:</span> {user.email}</p>
        <p className="text-gray-600"><span className="font-medium">Current Plan:</span> {user.currentPlan?.title || "No plan"}</p>
      </div>

      {profile ? (
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
          <h3 className="font-semibold text-lg text-gray-700 mb-4">Profile Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
            <p><span className="font-medium">Name:</span> {profile.firstName} {profile.lastName}</p>
            <p><span className="font-medium">DOB:</span> {profile.dob}</p>
            <p><span className="font-medium">Age:</span> {profile.age}</p>
            <p><span className="font-medium">Height:</span> {profile.height}</p>
            <p><span className="font-medium">Weight:</span> {profile.weight}</p>
            <p><span className="font-medium">Gender:</span> {profile.gender}</p>
            <p><span className="font-medium">Fitness Level:</span> {profile.fitnessLevel}</p>
            <p><span className="font-medium">Fitness Goal:</span> {profile.fitnessGoal}</p>
            <p><span className="font-medium">Activity Level:</span> {profile.activityLevel}</p>
          </div>
        </div>
      ) : (
        <p className="text-gray-600 mt-3">No profile details available</p>
      )}

      <div className="mt-6">
        <Link to="/admin/users" className="text-blue-500 hover:underline font-medium">
          BACK
        </Link>
      </div>
    </div>
  );
};

export default UserProfileView;