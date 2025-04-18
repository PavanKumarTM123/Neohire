import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import 'animate.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col">
      
      <div className="relative flex flex-col items-center justify-center h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/videos/images.jpeg')" }}>
        <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm"></div>

        <motion.div 
          className="relative text-center text-white px-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          <h1 className="text-4xl sm:text-6xl font-extrabold">
          Unleash Your <span className="text-yellow-300">Potential</span>
          </h1>
          <p className="text-lg mt-4 animate__animated animate__fadeIn animate__delay-2s ">
          Discover amazing job opportunities and elevate your career.
            </p>

          <motion.button 
            className="mt-6 px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-400 transition duration-300 shadow-lg transform hover:scale-105"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/login")}
          >
            Get Started
          </motion.button>
        </motion.div>
      </div>

   
   <section className="bg-gray-100 py-12 px-6">
        <h2 className="text-3xl font-bold text-center text-blue-900">Why Choose Us?</h2>
        <p className="text-center text-gray-600 mt-2 mb-8">
          The best platform to find job opportunities that match your skills.
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-6 text-center shadow-lg rounded-lg bg-white hover:bg-gray-200 transition">
            <h3 className="text-xl font-semibold text-blue-800">📌 Thousands of Jobs</h3>
            <p className="text-gray-600 mt-2">Find jobs across various industries.</p>
          </div>

          <div className="p-6 text-center shadow-lg rounded-lg bg-white hover:bg-gray-200 transition">
            <h3 className="text-xl font-semibold text-blue-800">🎯 AI-Powered Matching</h3>
            <p className="text-gray-600 mt-2">Smart recommendations for job seekers.</p>
          </div>

          <div className="p-6 text-center shadow-lg rounded-lg bg-white hover:bg-gray-200 transition">
            <h3 className="text-xl font-semibold text-blue-800">💼 Recruiter Network</h3>
            <p className="text-gray-600 mt-2">Connect with hiring managers directly.</p>
          </div>
        </div>
      </section>


      <footer className="bg-blue-900 text-white py-6 mt-auto">
  <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between px-6 text-center md:text-left">
    
    <div className="w-full md:w-1/3 mb-6 md:mb-0">
      <h3 className="text-xl font-bold">Job Portal</h3>
      <p className="text-gray-300 mt-2 text-sm">
        Helping professionals find their next career move.
      </p>
    </div>

    <div className="w-full md:w-1/3 flex flex-col items-center md:items-start mb-6 md:mb-0">
      <h4 className="text-lg font-semibold">Quick Links</h4>
      <ul className="mt-2 space-y-2 text-gray-300 text-sm">
        <li className="hover:text-white cursor-pointer">About Us</li>
        <li className="hover:text-white cursor-pointer">Contact</li>
        <li className="hover:text-white cursor-pointer">Privacy Policy</li>
        <li className="hover:text-white cursor-pointer">Terms & Conditions</li>
      </ul>
    </div>

    <div className="w-full md:w-1/3 flex flex-col items-center md:items-end">
      <h4 className="text-lg font-semibold">Follow Us</h4>
      <div className="flex mt-2 space-x-4">
        <a href="#" className="text-gray-300 hover:text-white text-lg">
          <i className="fab fa-facebook"></i>
        </a>
        <a href="#" className="text-gray-300 hover:text-white text-lg">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="#" className="text-gray-300 hover:text-white text-lg">
          <i className="fab fa-linkedin"></i>
        </a>
      </div>
    </div>
  </div>

  <div className="text-center text-gray-400 text-sm mt-4">
    © {new Date().getFullYear()} Job Portal. All rights reserved.
  </div>
</footer>

    </div>
  );
};

export default Home;
