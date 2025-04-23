// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { Briefcase, Users, CheckCircle, XCircle, Hourglass, Menu, X } from "lucide-react";

// const RecruiterDashboard = () => {
//   const [jobs, setJobs] = useState([]);
//   const [applications, setApplications] = useState([]);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   useEffect(() => {
//     fetchJobs();
//     fetchApplications();
//   }, []);

//   const fetchJobs = async () => {
//     try {
//       const response = await axios.get("https://localhost:7278/api/Recruiter/AllJobs");
//       setJobs(response.data);
//     } catch (error) {
//       console.error("Error fetching jobs:", error);
//     }
//   };

//   const fetchApplications = async () => {
//     try {
//       const response = await axios.get("https://localhost:7278/api/ApplyJobApplications");
//       setApplications(response.data);
//     } catch (error) {
//       console.error("Error fetching applications:", error);
//     }
//   };

//   // Count status
//   const acceptedCount = applications.filter(app => app.Status?.toLowerCase() === "accepted").length;
//   const rejectedCount = applications.filter(app => app.Status?.toLowerCase() === "rejected").length;
//   const pendingCount = applications.filter(app => app.Status?.toLowerCase() === "pending").length;

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Sidebar */}
//       <div className={`w-64 bg-blue-900 text-white shadow-lg ${isSidebarOpen ? "block" : "hidden"} md:block`}>
//         <div className="p-6 text-xl font-bold border-b border-blue-700">Recruiter Dashboard</div>
//         <ul className="p-4 space-y-3">
//           <li><Link to="/recruiter-profile" className="block py-2 px-4 rounded-lg hover:bg-blue-700">Profile</Link></li>
//           <li><Link to="/recruiter-dashboard" className="block py-2 px-4 rounded-lg hover:bg-blue-700">Dashboard</Link></li>
//           <li><Link to="/recruiter-postjob" className="block py-2 px-4 rounded-lg hover:bg-blue-700">Post a Job</Link></li>
//           <li><Link to="/manage-jobs" className="block py-2 px-4 rounded-lg hover:bg-blue-700">Manage Jobs</Link></li>
//           <li><Link to="/applications" className="block py-2 px-4 rounded-lg hover:bg-blue-700">Manage Applications</Link></li>
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-8">
//         <button className="md:hidden mb-4 text-gray-600" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
//           {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//         </button>

//         <h2 className="text-3xl font-bold text-gray-800 mb-6">Recruiter Dashboard</h2>

//         {/* Summary Cards */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//           {/* Jobs Posted */}
//           <div className="p-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md rounded-lg flex items-center">
//             <Briefcase className="w-12 h-12 mr-3" />
//             <div>
//               <p className="text-2xl font-semibold">{jobs.length}</p>
//               <p className="text-sm">Jobs Posted</p>
//             </div>
//           </div>

//           {/* Total Applications */}
//           <div className="p-6 bg-gradient-to-r from-green-500 to-green-700 text-white shadow-md rounded-lg flex items-center">
//             <Users className="w-12 h-12 mr-3" />
//             <div>
//               <p className="text-2xl font-semibold">{applications.length}</p>
//               <p className="text-sm">Total Applications</p>
//             </div>
//           </div>

//           {/* Accepted */}
//           <div className="p-6 bg-gradient-to-r from-green-400 to-green-600 text-white shadow-md rounded-lg flex items-center">
//             <CheckCircle className="w-12 h-12 mr-3" />
//             <div>
//               <p className="text-2xl font-semibold">{acceptedCount}</p>
//               <p className="text-sm">Accepted</p>
//             </div>
//           </div>

//           {/* Rejected */}
//           <div className="p-6 bg-gradient-to-r from-red-400 to-red-600 text-white shadow-md rounded-lg flex items-center">
//             <XCircle className="w-12 h-12 mr-3" />
//             <div>
//               <p className="text-2xl font-semibold">{rejectedCount}</p>
//               <p className="text-sm">Rejected</p>
//             </div>
//           </div>

//           {/* Pending */}
//           <div className="p-6 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-md rounded-lg flex items-center">
//             <Hourglass className="w-12 h-12 mr-3" />
//             <div>
//               <p className="text-2xl font-semibold">{pendingCount}</p>
//               <p className="text-sm">Pending</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecruiterDashboard;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Briefcase,
  Users,
  CheckCircle,
  XCircle,
  Hourglass,
  Menu,
  X,
} from "lucide-react";

const RecruiterDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    fetchJobs();
    fetchApplications();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get("https://localhost:7278/api/Recruiter/AllJobs");
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await axios.get("https://localhost:7278/api/ApplyJobApplications");
      setApplications(response.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  const acceptedCount = applications.filter(app => app.Status?.toLowerCase() === "accepted").length;
  const rejectedCount = applications.filter(app => app.Status?.toLowerCase() === "rejected").length;
  const pendingCount = applications.filter(app => app.Status?.toLowerCase() === "pending").length;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-blue-900 text-white transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}>
        <div className="p-6 text-xl font-bold border-b border-blue-700">Recruiter Dashboard</div>
        <ul className="p-4 space-y-3">
          <li><Link to="/recruiter-profile" className="block py-2 px-4 rounded-lg hover:bg-blue-700">Profile</Link></li>
          <li><Link to="/recruiter-dashboard" className="block py-2 px-4 rounded-lg hover:bg-blue-700">Dashboard</Link></li>
          <li><Link to="/recruiter-postjob" className="block py-2 px-4 rounded-lg hover:bg-blue-700">Post a Job</Link></li>
          <li><Link to="/manage-jobs" className="block py-2 px-4 rounded-lg hover:bg-blue-700">Manage Jobs</Link></li>
          <li><Link to="/applications" className="block py-2 px-4 rounded-lg hover:bg-blue-700">Manage Applications</Link></li>
        </ul>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-8 md:ml-64">
        {/* Sidebar toggle button */}
        <button
          className="md:hidden mb-4 text-gray-600"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <h2 className="text-3xl font-bold text-gray-800 mb-6">Recruiter Dashboard</h2>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Jobs Posted */}
          <div className="p-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md rounded-lg flex items-center">
            <Briefcase className="w-12 h-12 mr-3" />
            <div>
              <p className="text-2xl font-semibold">{jobs.length}</p>
              <p className="text-sm">Jobs Posted</p>
            </div>
          </div>

          {/* Total Applications */}
          <div className="p-6 bg-gradient-to-r from-green-500 to-green-700 text-white shadow-md rounded-lg flex items-center">
            <Users className="w-12 h-12 mr-3" />
            <div>
              <p className="text-2xl font-semibold">{applications.length}</p>
              <p className="text-sm">Total Applications</p>
            </div>
          </div>

          {/* Accepted */}
          <div className="p-6 bg-gradient-to-r from-green-400 to-green-600 text-white shadow-md rounded-lg flex items-center">
            <CheckCircle className="w-12 h-12 mr-3" />
            <div>
              <p className="text-2xl font-semibold">{acceptedCount}</p>
              <p className="text-sm">Accepted</p>
            </div>
          </div>

          {/* Rejected */}
          <div className="p-6 bg-gradient-to-r from-red-400 to-red-600 text-white shadow-md rounded-lg flex items-center">
            <XCircle className="w-12 h-12 mr-3" />
            <div>
              <p className="text-2xl font-semibold">{rejectedCount}</p>
              <p className="text-sm">Rejected</p>
            </div>
          </div>

          {/* Pending */}
          <div className="p-6 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-md rounded-lg flex items-center">
            <Hourglass className="w-12 h-12 mr-3" />
            <div>
              <p className="text-2xl font-semibold">{pendingCount}</p>
              <p className="text-sm">Pending</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
