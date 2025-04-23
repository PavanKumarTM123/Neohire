// import { useState } from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate
// import { FaUser, FaBriefcase, FaSignOutAlt } from "react-icons/fa";
// import UserProfile from "./UserProfile";
// import UserApplicationView from "./UserApplicationView";

// const UserDashboard = () => {
//   const [view, setView] = useState("profile");
//   const navigate = useNavigate(); // Initialize useNavigate

//   const handleLogout = () => {
//     localStorage.removeItem("userEmail"); // Remove user email from storage
//     localStorage.removeItem("token"); // Remove authentication token if stored
//     navigate("/login"); // Redirect to login page
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-blue-800 text-white p-5 space-y-6 hidden md:block">
//         <h2 className="text-2xl font-bold text-center">Dashboard</h2>
//         <nav className="mt-10 space-y-4">
//           <button
//             className={`flex items-center px-4 py-3 w-full rounded-lg transition duration-300 ${view === "profile" ? "bg-blue-600" : "hover:bg-blue-700"}`}
//             onClick={() => setView("profile")}
//           >
//             <FaUser className="mr-3" /> Profile
//           </button>
//           <button
//             className={`flex items-center px-4 py-3 w-full rounded-lg transition duration-300 ${view === "applications" ? "bg-blue-600" : "hover:bg-blue-700"}`}
//             onClick={() => setView("applications")}
//           >
//             <FaBriefcase className="mr-3" /> Applications
//           </button>
//           <button
//             className="flex items-center px-4 py-3 w-full rounded-lg hover:bg-red-600 transition duration-300"
//             onClick={handleLogout} // Attach the logout function
//           >
//             <FaSignOutAlt className="mr-3" /> Logout
//           </button>
//         </nav>
//       </aside>
      
//       {/* Main Content */}
//       <main className="flex-1 p-6">
//         {/* Mobile Toggle */}
//         <div className="md:hidden flex justify-center mb-4 space-x-4">
//           <button
//             className={`px-4 py-2 rounded-lg ${view === "profile" ? "bg-blue-600 text-white" : "bg-gray-300 text-black"}`}
//             onClick={() => setView("profile")}
//           >
//             Profile
//           </button>
//           <button
//             className={`px-4 py-2 rounded-lg ${view === "applications" ? "bg-blue-600 text-white" : "bg-gray-300 text-black"}`}
//             onClick={() => setView("applications")}
//           >
//             Applications
//           </button>
//         </div>

//         {/* Content */}
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           {view === "profile" ? <UserProfile /> : <UserApplicationView />}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default UserDashboard;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaBriefcase, FaSignOutAlt } from "react-icons/fa";
import UserProfile from "./UserProfile";
import UserApplicationView from "./UserApplicationView";

const UserDashboard = () => {
  const [view, setView] = useState("profile");
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden flex justify-between items-center p-4 bg-blue-800 text-white">
        <h2 className="text-xl font-semibold">Dashboard</h2>
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          showSidebar ? "block" : "hidden"
        } md:block bg-blue-800 text-white w-full md:w-64 p-5 space-y-6 md:min-h-screen`}
      >
        <h2 className="text-2xl font-bold text-center">Dashboard</h2>
        <nav className="mt-10 space-y-4">
          <button
            className={`flex items-center px-4 py-3 w-full rounded-lg transition duration-300 ${
              view === "profile" ? "bg-blue-600" : "hover:bg-blue-700"
            }`}
            onClick={() => {
              setView("profile");
              setShowSidebar(false);
            }}
          >
            <FaUser className="mr-3" /> Profile
          </button>
          <button
            className={`flex items-center px-4 py-3 w-full rounded-lg transition duration-300 ${
              view === "applications" ? "bg-blue-600" : "hover:bg-blue-700"
            }`}
            onClick={() => {
              setView("applications");
              setShowSidebar(false);
            }}
          >
            <FaBriefcase className="mr-3" /> Applications
          </button>
          <button
            className="flex items-center px-4 py-3 w-full rounded-lg hover:bg-red-600 transition duration-300"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="mr-3" /> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          {view === "profile" ? <UserProfile /> : <UserApplicationView />}
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
