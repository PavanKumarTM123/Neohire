import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

const RecruiterPostJob = () => {
  const navigate = useNavigate();
  const [jobData, setJobData] = useState({
    jobId: 0,
    recruiterId: localStorage.getItem("userId") || "", // Fetch recruiterId
    email: "", // User will enter email manually
    jobTitle: "",
    companyName: "",
    location: "",
    vacancy: 0,
    jobType: "",
    ctc: 0,
    requiredSkills: "",
    jobDescription: "",
  });

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sending job data:", jobData);
    
    try {
      const response = await axios.post("https://localhost:7278/api/Recruiter/post-job", jobData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Response:", response.data);
      alert("Job Posted Successfully!");
      setJobData({
        jobId: 0,
        recruiterId: localStorage.getItem("userId") || "",
        email: "",
        jobTitle: "",
        companyName: "",
        location: "",
        vacancy: 0,
        jobType: "",
        ctc: 0,
        requiredSkills: "",
        jobDescription: "",
      });
    } catch (error) {
      console.error("Error posting job:", error.response ? error.response.data : error);
      alert("Failed to post job. Check console for details.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-2xl bg-white p-6 shadow-lg rounded-lg">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Post a Job</h2>
          <button
            onClick={() => navigate("/recruiter-dashboard")}
            className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 group"
          >
            <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Back</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="email" name="email" value={jobData.email} onChange={handleChange} placeholder="Recruiter Email" className="w-full p-2 border rounded" required />
            <input type="text" name="jobTitle" value={jobData.jobTitle} onChange={handleChange} placeholder="Job Title" className="w-full p-2 border rounded" required />
          </div>

          <input type="text" name="companyName" value={jobData.companyName} onChange={handleChange} placeholder="Company Name" className="w-full p-2 border rounded" required />
          <input type="text" name="location" value={jobData.location} onChange={handleChange} placeholder="Location" className="w-full p-2 border rounded" required />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="number" name="vacancy" value={jobData.vacancy} onChange={handleChange} placeholder="Number of Vacancies" className="w-full p-2 border rounded" required />
            <input type="text" name="jobType" value={jobData.jobType} onChange={handleChange} placeholder="Job Type (Full-time, Part-time, etc.)" className="w-full p-2 border rounded" required />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="number" name="ctc" value={jobData.ctc} onChange={handleChange} placeholder="Salary (CTC)" className="w-full p-2 border rounded" required />
            <input type="text" name="requiredSkills" value={jobData.requiredSkills} onChange={handleChange} placeholder="Required Skills" className="w-full p-2 border rounded" required />
          </div>
          
          <textarea name="jobDescription" value={jobData.jobDescription} onChange={handleChange} placeholder="Job Description" className="w-full p-2 border rounded" required />
          
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecruiterPostJob;
