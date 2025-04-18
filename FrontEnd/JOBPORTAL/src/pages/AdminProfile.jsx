import { useEffect, useState } from "react";
import axios from "axios";
import { FaUserCircle, FaEnvelope, FaIdBadge, FaUserTag } from "react-icons/fa";

const AdminProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get logged-in user's email from local storage
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    if (!userEmail) {
      setError("User email not found. Please log in.");
      setLoading(false);
      return;
    }

    axios
      .get(`https://localhost:7278/api/FetchProfile/profile/${userEmail}`)
      .then((response) => {
        console.log("✅ API Response:", response.data);
        if (response.data && response.data.profile) {
          setProfile(response.data.profile);
        } else {
          setError("Profile data not found.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ API Error:", err);
        setError(err.response?.data?.message || "Failed to fetch profile");
        setLoading(false);
      });
  }, [userEmail]);

  if (loading)
    return <div className="text-center text-blue-500 text-lg font-semibold">Loading...</div>;

  if (error)
    return <div className="text-center text-red-500 text-lg font-semibold">{error}</div>;

  return (
    <div className="flex justify-center items-center min-h-[50vh] bg-gradient-to-r from-blue-200 to-blue-400 py-10">
      <div className="w-72 bg-white p-5 rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <FaUserCircle className="text-blue-500 text-4xl mb-2" />
          <h2 className="text-lg font-bold text-blue-600">User Profile</h2>
        </div>

        <div className="mt-3 space-y-2 text-sm">
          {profile ? (
            <>
              <div className="flex items-center bg-gray-100 p-2 rounded-md shadow-sm">
                <FaIdBadge className="text-blue-500 text-base mr-2" />
                <p className="text-gray-700"><strong>ID:</strong> {profile.id}</p>
              </div>

              <div className="flex items-center bg-gray-100 p-2 rounded-md shadow-sm">
                <FaUserTag className="text-blue-500 text-base mr-2" />
                <p className="text-gray-700"><strong>User ID:</strong> {profile.userId}</p>
              </div>

              <div className="flex items-center bg-gray-100 p-2 rounded-md shadow-sm">
                <FaUserCircle className="text-blue-500 text-base mr-2" />
                <p className="text-gray-700"><strong>Name:</strong> {profile.firstName} {profile.lastName}</p>
              </div>

              <div className="flex items-center bg-gray-100 p-2 rounded-md shadow-sm">
                <FaEnvelope className="text-blue-500 text-base mr-2" />
                <p className="text-gray-700"><strong>Email:</strong> {profile.gmail}</p>
              </div>

              <div className="flex items-center bg-gray-100 p-2 rounded-md shadow-sm">
                <FaUserTag className="text-blue-500 text-base mr-2" />
                <p className="text-gray-700">
                  <strong>Role:</strong> {profile.logginAs === 1 ? "User" : profile.logginAs === 2 ? "Recruiter" : "Admin"}
                </p>
              </div>
            </>
          ) : (
            <p className="text-red-500 text-center font-semibold">No profile data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
