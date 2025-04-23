// import React, { useState } from "react";
// import { Link, NavLink as RouterNavLink, useNavigate } from "react-router-dom"; // Renaming NavLink import
// import { Menu, X } from "lucide-react"; // Mobile Menu Icons

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");

//   // Ensure role is a valid string
//   const dashboardRoute =
//     role === "1"
//       ? "/user-dashboard"
//       : role === "2"
//       ? "/recruiter-dashboard"
//       : role === "3"
//       ? "/admin-dashboard"
//       : "/";

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <nav className="flex justify-between items-center bg-blue-900 text-white py-2 px-6 shadow-md">
//     <div className="container mx-auto px-4 py-2 flex justify-between items-center">
//       {/* Logo */}
//       <h2 className="text-2xl font-extrabold bg-gradient-to-r from-yellow-300 to-orange-500 text-transparent bg-clip-text flex items-center">
//         🚀 NeoHire
//       </h2>
  
//       {/* Desktop Menu */}
//       <div className="hidden md:flex space-x-6 text-white font-large font-bold">
//         <RouterNavLink to="/" exact activeClassName="text-indigo-200">
//           Home
//         </RouterNavLink>
//         <RouterNavLink to="/about" activeClassName="text-indigo-200">
//           About
//         </RouterNavLink>
//         <RouterNavLink to="/jobs" activeClassName="text-indigo-200">
//           Jobs
//         </RouterNavLink>
//         {token && (
//           <RouterNavLink to={dashboardRoute} activeClassName="text-indigo-200">
//             Dashboard
//           </RouterNavLink>
//         )}
//         {token ? (
//           <button
//             onClick={handleLogout}
//             className="text-red-400 hover:text-red-300 transition"
//           >
//             Logout
//           </button>
//         ) : (
//           <>
//             <RouterNavLink to="/login" activeClassName="text-indigo-200">
//               Login
//             </RouterNavLink>
//             <RouterNavLink to="/register" activeClassName="text-indigo-200">
//               Register
//             </RouterNavLink>
//           </>
//         )}
//       </div>
  
//       {/* Mobile Menu Button */}
//       <button
//         className="md:hidden text-white"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         {isOpen ? <X size={28} /> : <Menu size={28} />}
//       </button>
//     </div>
  
//     {/* Mobile Menu with Fixed Height */}
//     <div
//       className={`md:hidden transition-all duration-300 ${
//         isOpen ? "opacity-100 h-[180px]" : "opacity-0 h-0 overflow-hidden"
//       } bg-blue-600`}
//     >
//       <div className="flex flex-col text-center space-y-4 text-white">
//         <RouterNavLink to="/" onClick={() => setIsOpen(false)}>
//           Home
//         </RouterNavLink>
//         <RouterNavLink to="/about" onClick={() => setIsOpen(false)}>
//           About
//         </RouterNavLink>
//         <RouterNavLink to="/jobs" onClick={() => setIsOpen(false)}>
//           Jobs
//         </RouterNavLink>
//         {token && (
//           <RouterNavLink to={dashboardRoute} onClick={() => setIsOpen(false)}>
//             Dashboard
//           </RouterNavLink>
//         )}
//         {token ? (
//           <button
//             onClick={() => {
//               handleLogout();
//               setIsOpen(false);
//             }}
//             className="text-red-400 hover:text-red-300 transition"
//           >
//             Logout
//           </button>
//         ) : (
//           <>
//             <RouterNavLink to="/login" onClick={() => setIsOpen(false)}>
//               Login
//             </RouterNavLink>
//             <RouterNavLink to="/register" onClick={() => setIsOpen(false)}>
//               Register
//             </RouterNavLink>
//           </>
//         )}
//       </div>
//     </div>
//   </nav>
  
//   );
// };

// // ✅ Reusable NavLink Component with Hover Effect
// const CustomNavLink = ({ to, children, onClick }) => (
//   <Link
//     to={to}
//     className="relative px-3 py-2 hover:underline hover:underline-offset-4 transition duration-300"
//     onClick={onClick}
//   >
//     {children}
//   </Link>
// );

// export default Navbar;
import React, { useState } from "react";
import { Link, NavLink as RouterNavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const dashboardRoute =
    role === "1"
      ? "/user-dashboard"
      : role === "2"
      ? "/recruiter-dashboard"
      : role === "3"
      ? "/admin-dashboard"
      : "/";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold bg-gradient-to-r from-yellow-300 to-orange-500 text-transparent bg-clip-text flex items-center"
        >
          🚀 NeoHire
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6 text-white font-medium">
          <CustomNavLink to="/">Home</CustomNavLink>
          <CustomNavLink to="/about">About</CustomNavLink>
          <CustomNavLink to="/jobs">Jobs</CustomNavLink>
          {token && <CustomNavLink to={dashboardRoute}>Dashboard</CustomNavLink>}
          {token ? (
            <button
              onClick={handleLogout}
              className="text-red-400 hover:text-red-300 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <CustomNavLink to="/login">Login</CustomNavLink>
              <CustomNavLink to="/register">Register</CustomNavLink>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-blue-800 text-white transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-96 py-4" : "max-h-0"
        }`}
      >
        <div className="flex flex-col items-center space-y-4 text-base font-medium">
          <CustomNavLink to="/" onClick={() => setIsOpen(false)}>
            Home
          </CustomNavLink>
          <CustomNavLink to="/about" onClick={() => setIsOpen(false)}>
            About
          </CustomNavLink>
          <CustomNavLink to="/jobs" onClick={() => setIsOpen(false)}>
            Jobs
          </CustomNavLink>
          {token && (
            <CustomNavLink
              to={dashboardRoute}
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </CustomNavLink>
          )}
          {token ? (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="text-red-400 hover:text-red-300 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <CustomNavLink to="/login" onClick={() => setIsOpen(false)}>
                Login
              </CustomNavLink>
              <CustomNavLink to="/register" onClick={() => setIsOpen(false)}>
                Register
              </CustomNavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

// ✅ Reusable NavLink Component
const CustomNavLink = ({ to, children, onClick }) => (
  <RouterNavLink
    to={to}
    className={({ isActive }) =>
      `relative px-3 py-2 hover:underline underline-offset-4 transition duration-300 ${
        isActive ? "text-indigo-200" : ""
      }`
    }
    onClick={onClick}
  >
    {children}
  </RouterNavLink>
);

export default Navbar;
