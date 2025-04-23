// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import Typewriter from "typewriter-effect";

// const WelcomeScreen = () => {
//   const navigate = useNavigate();
//   const [fadeOut, setFadeOut] = useState(false);
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     const fadeTimer = setTimeout(() => setFadeOut(true), 4000);
//     const navigateTimer = setTimeout(() => navigate("/Home"), 5000);
//     return () => {
//       clearTimeout(fadeTimer);
//       clearTimeout(navigateTimer);
//     };
//   }, [navigate]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setProgress((prev) => (prev < 100 ? prev + 1 : 100));
//     }, 50);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <motion.div
//       className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-indigo-700 text-white text-center px-5 sm:px-10 md:px-20 lg:px-32"
//       initial={{ opacity: 1 }}
//       animate={{ opacity: fadeOut ? 0 : 1 }}
//       transition={{ duration: 1 }}
//     >
//       <motion.div
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 1 }}
//         className="text-center"
//       >
//         <motion.h1
//           className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-wider"
//           style={{ fontFamily: "'Dancing Script', cursive" }}
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1.5, delay: 0.5 }}
//         >
//           Kickstart Your Career with {" "}
//           <span className="text-yellow-300">NEOHIRE</span> 🚀
//         </motion.h1>

//         <motion.p
//           className="text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-wide text-gray-200 font-semibold"
//           style={{ fontFamily: "'Great Vibes', cursive" }}
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1.5, delay: 1 }}
//         >
//           <span>
//             <Typewriter
//               options={{
//                 strings: ["💡 Connecting Fresh Talent with Opportunities!"],
//                 autoStart: true,
//                 loop: true,
//                 delay: 50,
//                 deleteSpeed: 30,
//               }}
//             />
//           </span>
//         </motion.p>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default WelcomeScreen;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";

const WelcomeScreen = () => {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 4000);
    const navigateTimer = setTimeout(() => navigate("/Home"), 5000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(navigateTimer);
    };
  }, [navigate]);

  return (
    <motion.div
      className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-indigo-700 text-white text-center px-5 sm:px-10 md:px-20 lg:px-32"
      initial={{ opacity: 1 }}
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-wider"
          style={{ fontFamily: "'Dancing Script', cursive" }}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          Kickstart Your Career with{" "}
          <span className="text-yellow-300">NEOHIRE</span> 🚀
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-wide text-gray-200 font-semibold"
          style={{ fontFamily: "'Great Vibes', cursive" }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1 }}
        >
          <span>
            <Typewriter
              options={{
                strings: ["💡 Connecting Fresh Talent with Opportunities!"],
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 30,
              }}
            />
          </span>
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default WelcomeScreen;
