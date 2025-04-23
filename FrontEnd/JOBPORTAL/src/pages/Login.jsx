// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Briefcase } from "lucide-react"; // Professional Icon

// export default function Login() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [errorMessage, setErrorMessage] = useState("");

//     const navigate = useNavigate();

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         if (!email || !password) {
//             setErrorMessage("Please enter email and password!");
//             return;
//         }

//         try {
//             const response = await fetch("https://localhost:7278/api/auth/login", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ Gmail: email, Password: password }),
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 if (!data.token || !data.role) {
//                     setErrorMessage("Invalid response from server.");
//                     return;
//                 }

//                 localStorage.setItem("token", data.token);
//                 localStorage.setItem("role", data.role);
//                 localStorage.setItem("userId", data.id);
//                 localStorage.setItem("userEmail", email);
                
 
//                 navigateBasedOnRole(Number(data.role));
//             } else {
//                 setErrorMessage("Invalid email or password. Please try again.");
//             }
//         } catch (error) {
//             setErrorMessage("Something went wrong. Please try again later.");
//         }
//     };

//     const navigateBasedOnRole = (role) => {
//         if (role === 1) navigate("/user-dashboard");
//         else if (role === 2) navigate("/recruiter-dashboard");
//         else if (role === 3) navigate("/admin-dashboard");
//         else {
//             setErrorMessage("Invalid user role. Please try again.");
//             navigate("/login");
//         }
//     };

//     return (
//         <div className="flex justify-center items-center min-h-screen bg-white">
//             <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-200">
//                 <div className="flex items-center justify-center mb-4">
//                     <Briefcase className="w-10 h-10 text-blue-600" />
//                     <h2 className="text-3xl font-extrabold text-gray-800 ml-2">NeoHire</h2>
//                 </div>

//                 <p className="text-center text-gray-600 mb-6">Find your dream job today!</p>

//                 {errorMessage && (
//                     <p className="text-red-500 text-center mb-4">{errorMessage}</p>
//                 )}

//                 <form className="space-y-4" onSubmit={handleLogin}>
//                     <input 
//                         type="email" 
//                         placeholder="Email" 
//                         className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" 
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)} 
//                     />
//                     <input 
//                         type="password" 
//                         placeholder="Password" 
//                         className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" 
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)} 
//                     />
//                     <button 
//                         type="submit"
//                         className="w-full bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300"
//                     >
//                         Login
//                     </button>
//                 </form>

//                 <p className="text-center mt-4 text-gray-600">
//                     Don't have an account? 
//                     <span 
//                         className="text-blue-500 cursor-pointer hover:underline ml-1"
//                         onClick={() => navigate("/register")}
//                     >
//                         Register Now
//                     </span>
//                 </p>
//             </div>
//         </div>
//     );
// }
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Please enter email and password!");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("https://localhost:7278/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Gmail: email, Password: password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (!data.token || !data.role) {
          setErrorMessage("Invalid response from server.");
          return;
        }

        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("userId", data.id);
        localStorage.setItem("userEmail", email);

        navigateBasedOnRole(Number(data.role));
      } else {
        setErrorMessage("Invalid email or password. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const navigateBasedOnRole = (role) => {
    if (role === 1) navigate("/user-dashboard");
    else if (role === 2) navigate("/recruiter-dashboard");
    else if (role === 3) navigate("/admin-dashboard");
    else {
      setErrorMessage("Invalid user role. Please try again.");
      navigate("/login");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <div className="flex items-center justify-center mb-6">
          <Briefcase className="w-12 h-12 text-blue-600" />
          <h2 className="text-3xl font-extrabold text-gray-800 ml-2">NeoHire</h2>
        </div>

        <p className="text-center text-gray-600 mb-6">Find your dream job today!</p>

        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}

        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Don't have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer hover:underline ml-1"
            onClick={() => navigate("/register")}
          >
            Register Now
          </span>
        </p>
      </div>
    </div>
  );
}
