// import React, { useEffect, useState } from "react";

// const AdminSideDashboard = () => {
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalJobs: 0,
//     appliedJobs: 0,
//     contactedUsers: 0,
//   });

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const fetchData = async (url) => {
//           try {
//             const response = await fetch(url);
//             if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//             const data = await response.json();
//             return data || {};
//           } catch (error) {
//             console.error(`Error fetching ${url}:`, error);
//             return {};
//           }
//         };

//         const usersData = await fetchData("https://localhost:7278/api/TotalUser/GetTotalUsers");
//         const jobsData = await fetchData("https://localhost:7278/api/TotalJobs/GetTotalJobs");
//         const appliedJobsData = await fetchData("https://localhost:7278/api/AppliedJobs/GetAppliedJobs");
//         const contactedUsersData = await fetchData("https://localhost:7278/api/ContactedUsers/GetContactedUsers");

//         setStats({
//           totalUsers: usersData.totalUsers || 44,
//           totalJobs: jobsData.totalJobs || 34,
//           appliedJobs: appliedJobsData.appliedJobs || 19,
//           contactedUsers: contactedUsersData.contactedUsers || 39,
//         });
//       } catch (error) {
//         console.error("Error fetching stats:", error);
//       }
//     };

//     fetchStats();
//   }, []);

//   return (
//     <div className="p-6 min-h-screen bg-gray-100">
//       <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Admin Dashboard</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {[
//           { title: "Total Users", value: stats.totalUsers, color: "bg-pink-500" },
//           { title: "Total Jobs", value: stats.totalJobs, color: "bg-blue-500" },
//           { title: "Applied Jobs", value: stats.appliedJobs, color: "bg-green-500" },
//           { title: "Contacted Users", value: stats.contactedUsers, color: "bg-orange-500" },
//         ].map((stat, index) => (
//           <div
//             key={index}
//             className={`p-6 ${stat.color} text-white rounded-lg shadow-lg flex flex-col items-center justify-center`}
//           >
//             <h3 className="text-lg font-semibold">{stat.title}</h3>
//             <p className="text-3xl font-bold">{stat.value}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdminSideDashboard;
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        aria-label="Toggle sidebar"
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-md shadow-lg"
        onClick={toggleSidebar}
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden z-30"
          onClick={toggleSidebar}
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-white text-black w-64 mt-16 p-6 shadow-2xl border-r-2 border-gray-200 rounded-lg z-40 md:relative md:min-h-screen transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-expanded={isOpen}
        aria-label="Admin Sidebar"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">Admin Area</h2>
        <nav className="mt-4">
          <ul>
            <li className="py-3">
              <Link
                to="/admin-dashboard"
                className="flex items-center p-3 text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 hover:shadow-lg rounded-md transition-all"
                onClick={() => setIsOpen(false)}
                aria-label="Dashboard"
              >
                🎨 <span className="ml-3">Dashboard</span>
              </Link>
            </li>
            <li className="py-3">
              <Link
                to="/admin-dashboard/job-list"
                className="flex items-center p-3 text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 hover:shadow-lg rounded-md transition-all"
                onClick={() => setIsOpen(false)}
                aria-label="Job List"
              >
                📄 <span className="ml-3">Job List</span>
              </Link>
            </li>
            <li className="py-3">
              <Link
                to="/admin-dashboard/view-users"
                className="flex items-center p-3 text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 hover:shadow-lg rounded-md transition-all"
                onClick={() => setIsOpen(false)}
                aria-label="Show All Users"
              >
                👥 <span className="ml-3">Show All Users</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default AdminSidebar;
