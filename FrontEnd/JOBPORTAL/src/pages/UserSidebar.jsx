// import React, { useState } from "react";
// import { FaBars, FaTimes } from "react-icons/fa"; // Import icons for menu toggle
// import { Link } from "react-router-dom";

// const UserSidebar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <>
//       {/* Mobile Toggle Button */}
//       <button
//         className="md:hidden fixed top-4 left-4 z-50 bg-black text-white p-2 rounded-md shadow-md"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
//       </button>

//       {/* Sidebar Container */}
//       <div
//         className={`fixed inset-y-0 left-0 bg-white text-black w-64 p-6 transform ${
//           isOpen ? "translate-x-0" : "-translate-x-64"
//         } md:translate-x-0 transition-transform duration-300 ease-in-out md:relative md:min-h-screen z-40 shadow-xl`}
//       >
//         <h2 className="text-2xl font-bold text-center mb-6">User Area</h2>

//         <nav className="mt-4">
//           <ul>
//             <li className="py-3">
//               <Link
//                 to="/user-dashboard"
//                 className="flex items-center p-3 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 hover:shadow-md hover:text-white rounded-md transition-all"
//               >
//                 🎨 <span className="ml-2">Dashboard</span>
//               </Link>
//             </li>
//             <li className="py-3">
//               <Link
//                 to="/user-profile"
//                 className="flex items-center p-3 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 hover:shadow-md hover:text-white rounded-md transition-all"
//               >
//                 🧑‍💼 <span className="ml-2">Profile</span>
//               </Link>
//             </li>
//             <li className="py-3">
//               <Link
//                 to="/user-applications"
//                 className="flex items-center p-3 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 hover:shadow-md hover:text-white rounded-md transition-all"
//               >
//                 📄 <span className="ml-2">Applications</span>
//               </Link>
//             </li>
//           </ul>
//         </nav>
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

// export default UserSidebar;
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const UserSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-md shadow-md focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle sidebar"
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-white text-black p-6 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-40 shadow-lg md:relative md:translate-x-0 md:min-h-screen`}
      >
        <h2 className="text-2xl font-bold text-center mb-6">User Area</h2>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                to="/user-dashboard"
                className="flex items-center p-3 rounded-md hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 hover:text-white transition"
              >
                🎨 <span className="ml-2">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/user-profile"
                className="flex items-center p-3 rounded-md hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 hover:text-white transition"
              >
                🧑‍💼 <span className="ml-2">Profile</span>
              </Link>
            </li>
            <li>
              <Link
                to="/user-applications"
                className="flex items-center p-3 rounded-md hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 hover:text-white transition"
              >
                📄 <span className="ml-2">Applications</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default UserSidebar;
