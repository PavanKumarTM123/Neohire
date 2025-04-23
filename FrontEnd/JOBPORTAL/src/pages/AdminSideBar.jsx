// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { FaBars, FaTimes } from "react-icons/fa"; // Import icons for menu toggle

// const AdminSidebar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <>
//       {/* Mobile Toggle Button */}
//       <button
//         className="md:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-md shadow-lg"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
//       </button>

//       {/* Sidebar Container */}
//       <div className="fixed inset-y-0 left-0 bg-white text-black w-64 mt-16 p-6 shadow-2xl border-r-2 border-gray-200 rounded-lg z-40 md:relative md:min-h-screen">
//         <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">Admin Area</h2>

//         {/* Sidebar Links (Mobile toggle will show/hide the list) */}
//         <div className={`md:block ${isOpen ? "block" : "hidden"}`}>
//           <nav className="mt-4">
//             <ul>
//               <li className="py-3">
//                 <Link
//                   to="/admin-dashboard"
//                   className="flex items-center p-3 text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 hover:shadow-lg rounded-md transition-all"
//                 >
//                   🎨 <span className="ml-3">Dashboard</span>
//                 </Link>
//               </li>
//               <li className="py-3">
//                 <Link
//                   to="/admin-dashboard/job-list"
//                   className="flex items-center p-3 text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 hover:shadow-lg rounded-md transition-all"
//                 >
//                   📄 <span className="ml-3">Job List</span>
//                 </Link>
//               </li>
//               <li className="py-3">
//                 <Link
//                   to="/admin-dashboard/ViewUserDashboard"
//                   className="flex items-center p-3 text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 hover:shadow-lg rounded-md transition-all"
//                 >
//                   👥 <span className="ml-3">Show All Users</span>
//                 </Link>
//               </li>
//             </ul>
//           </nav>
//         </div>
//       </div>

//       {/* Overlay for Mobile View */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black opacity-50 md:hidden z-30"
//           onClick={() => setIsOpen(false)}
//         />
//       )}
//     </>
//   );
// };

// export default AdminSidebar;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-md shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar Container */}
      <div
        className={`fixed inset-y-0 left-0 bg-white text-black w-64 mt-16 p-6 shadow-2xl border-r-2 border-gray-200 rounded-lg z-40 md:relative md:min-h-screen transition-all duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">Admin Area</h2>

        {/* Sidebar Links */}
        <nav className="mt-4">
          <ul>
            <li className="py-3">
              <Link
                to="/admin-dashboard"
                className="flex items-center p-3 text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 hover:shadow-lg rounded-md transition-all"
              >
                🎨 <span className="ml-3">Dashboard</span>
              </Link>
            </li>
            <li className="py-3">
              <Link
                to="/admin-dashboard/job-list"
                className="flex items-center p-3 text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 hover:shadow-lg rounded-md transition-all"
              >
                📄 <span className="ml-3">Job List</span>
              </Link>
            </li>
            <li className="py-3">
              <Link
                to="/admin-dashboard/ViewUserDashboard"
                className="flex items-center p-3 text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 hover:shadow-lg rounded-md transition-all"
              >
                👥 <span className="ml-3">Show All Users</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Overlay for Mobile View */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default AdminSidebar;
