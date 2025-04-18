import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-white-60 to-white-40 text-gray py-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight animate__animated animate__fadeIn">
          About Us
        </h1>
        <p className="text-xl sm:text-2xl mt-4 animate__animated animate__fadeIn animate__delay-1s">
          Empowering job seekers and recruiters through innovation.
        </p>
      </header>

      {/* About Us Section */}
      <section className="py-16 px-6 sm:px-12 lg:px-16 bg-white animate__animated animate__fadeIn animate__delay-2s">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Welcome to Our Job Portal
        </h2>
        <p className="text-base sm:text-lg text-center text-gray-700 max-w-3xl mx-auto mb-8">
          We connect job seekers and recruiters to streamline the hiring process. Whether you're searching for new career opportunities or finding the right candidate, our platform makes it easy.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-6 text-center shadow-lg rounded-lg bg-white hover:bg-gray-100 transition duration-300">
            <h3 className="text-xl font-semibold text-gray-900">🔍 Easy Job Search</h3>
            <p className="text-gray-600 mt-2">Find jobs matching your skills quickly.</p>
          </div>
          <div className="p-6 text-center shadow-lg rounded-lg bg-white hover:bg-gray-100 transition duration-300">
            <h3 className="text-xl font-semibold text-gray-900">💡 Smart Recommendations</h3>
            <p className="text-gray-600 mt-2">Get job suggestions tailored to your profile.</p>
          </div>
          <div className="p-6 text-center shadow-lg rounded-lg bg-white hover:bg-gray-100 transition duration-300">
            <h3 className="text-xl font-semibold text-gray-900">📈 Career Growth</h3>
            <p className="text-gray-600 mt-2">Track applications and career progress easily.</p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="bg-gray-100 py-16 px-6 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="p-6 bg-white shadow-lg rounded-lg hover:bg-gray-200 transition duration-300">
            <h3 className="text-2xl font-semibold text-blue-900 mb-4">Our Mission</h3>
            <p className="text-gray-600">
              To provide a seamless hiring experience for job seekers and recruiters through innovation and AI-powered matching.
            </p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg hover:bg-gray-200 transition duration-300">
            <h3 className="text-2xl font-semibold text-blue-900 mb-4">Our Vision</h3>
            <p className="text-gray-600">
              To be the leading job portal, offering unmatched efficiency and personalized job-matching services worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6 sm:px-12 lg:px-16">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">
          Meet Our Team
        </h2>
        <p className="text-lg text-center text-gray-700 mb-8">
          Our experts ensure the best job-matching experience for both job seekers and recruiters.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="text-center p-6 bg-white shadow-lg rounded-lg hover:bg-gray-200 transition duration-300">
            <img src="/images/team1.jpg" alt="Team Member 1" className="w-32 h-32 mx-auto rounded-full mb-4" />
            <h4 className="text-xl font-semibold text-blue-800">John Doe</h4>
            <p className="text-gray-600">Founder & CEO</p>
          </div>
          <div className="text-center p-6 bg-white shadow-lg rounded-lg hover:bg-gray-200 transition duration-300">
            <img src="/images/team2.jpg" alt="Team Member 2" className="w-32 h-32 mx-auto rounded-full mb-4" />
            <h4 className="text-xl font-semibold text-blue-800">Jane Smith</h4>
            <p className="text-gray-600">Lead Developer</p>
          </div>
          <div className="text-center p-6 bg-white shadow-lg rounded-lg hover:bg-gray-200 transition duration-300">
            <img src="/images/team3.jpg" alt="Team Member 3" className="w-32 h-32 mx-auto rounded-full mb-4" />
            <h4 className="text-xl font-semibold text-blue-800">Emma Brown</h4>
            <p className="text-gray-600">Product Designer</p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
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
              <a href="#" className="text-gray-300 hover:text-white text-lg">🔗</a>
              <a href="#" className="text-gray-300 hover:text-white text-lg">🔗</a>
              <a href="#" className="text-gray-300 hover:text-white text-lg">🔗</a>
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

export default About;
