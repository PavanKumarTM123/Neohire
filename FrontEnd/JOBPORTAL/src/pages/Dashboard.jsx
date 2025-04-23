// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Dashboard = () => {
//   const [userData, setUserData] = useState(null);
//   const navigate = useNavigate();

//   const token = localStorage.getItem("token");
//   const role = Number(localStorage.getItem("role"));

//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//     }

//     axios
//       .get("https://localhost:7278/api/fetchProfile", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => setUserData(res.data))
//       .catch((err) => console.error("Error fetching user data", err));
//   }, [navigate, token]);

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome, {userData?.name || "User"}!</h2>

//         {role === 1 && (
//           <div>
//             <h3 className="text-lg font-semibold text-gray-600">User Dashboard</h3>
//             <p>Manage your job  applications.</p>
//             <button
//               onClick={() => navigate("/user-dashboard")}
//               className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md"
//             >
//               Go to user Dashboard
//             </button>
//           </div>
//         )}

//         {role === 2 && (
//           <div>
//             <h3 className="text-lg font-semibold text-gray-600">Recruiter Dashboard</h3>
//             <p>Manage your job postings and applications.</p>
//             <button
//               onClick={() => navigate("/recruiter-dashboard")}
//               className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md"
//             >
//               Go to Recruiter Dashboard
//             </button>
//           </div>
//         )}

//         {role === 3 && (
//           <div>
//             <h3 className="text-lg font-semibold text-gray-600">Admin Dashboard</h3>
//             <p>Manage users, job postings, and applications.</p>
//             <button
//               onClick={() => navigate("/admin-dashboard")}
//               className="mt-2 bg-red-600 text-white px-4 py-2 rounded-md"
//             >
//               Go to Admin Dashboard
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = Number(localStorage.getItem("role"));

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }

    axios
      .get("https://localhost:7278/api/fetchProfile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUserData(res.data))
      .catch((err) => console.error("Error fetching user data", err));
  }, [navigate, token]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Welcome, {userData?.name || "User"}!
        </h2>

        {role === 1 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-600">User Dashboard</h3>
            <p>Manage your job applications.</p>
            <button
              onClick={() => navigate("/user-dashboard")}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Go to User Dashboard
            </button>
          </div>
        )}

        {role === 2 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-600">Recruiter Dashboard</h3>
            <p>Manage your job postings and applications.</p>
            <button
              onClick={() => navigate("/recruiter-dashboard")}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Go to Recruiter Dashboard
            </button>
          </div>
        )}

        {role === 3 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-600">Admin Dashboard</h3>
            <p>Manage users, job postings, and applications.</p>
            <button
              onClick={() => navigate("/admin-dashboard")}
              className="mt-2 bg-red-600 text-white px-4 py-2 rounded-md"
            >
              Go to Admin Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
