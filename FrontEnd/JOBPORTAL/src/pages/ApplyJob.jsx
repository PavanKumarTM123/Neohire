import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Briefcase, Upload, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react";

const ApplyJob = () => {
  const navigate = useNavigate();
  const { jobId } = useParams(); // Get job ID from URL
  const [job, setJob] = useState({});
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("No file chosen");

  const programmingLanguages = ["C", "Java", "Python", "JavaScript", "PHP", "C++", "Swift", "Ruby", "Go"];

  const [formData, setFormData] = useState({
    jobID: jobId || "",
    userID: "",
    firstName: "",
    lastName: "",
    qualification: "",
    phoneNumber: "",
    skills: [],
    cgpa: "",
    gender: "",
    location: "",
    email: "",
    appliedDate: new Date().toISOString(),
    status: "Pending",
    companyName: "",
    jobTitle: "",
    jobType: "",
    resumePath: "",
  });

  // Fetch job details when component mounts
  useEffect(() => {
    if (jobId) {
      setLoading(true);
      axios
        .get(`https://localhost:7278/api/Recruiter/Job/${jobId}`)
        .then((response) => {
          setJob(response.data);
          setFormData((prev) => ({
            ...prev,
            jobID: jobId,
            jobTitle: response.data.jobTitle,
            companyName: response.data.companyName,
            jobType: response.data.jobType,
          }));
        })
        .catch((error) => {
          console.error("Error fetching job details:", error);
          setError("Failed to load job details. Please try again later.");
        })
        .finally(() => setLoading(false));
    }
  }, [jobId]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle multiple skill selection (Checkbox)
  const handleSkillChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      skills: checked ? [...prev.skills, value] : prev.skills.filter((skill) => skill !== value),
    }));
  };

  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setResumeFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resumeFile) {
      setError("Please upload a resume.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Upload Resume
      const fileData = new FormData();
      fileData.append("file", resumeFile);

      const uploadResponse = await axios.post(
        `https://localhost:7278/api/DocumentUpload/UploadResumeFile?userId=${formData.userID}&jobId=${formData.jobID}`,
        fileData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const uploadedResumePath = uploadResponse.data.filePath;

      // Submit Job Application
      await axios.post("https://localhost:7278/api/ApplyJobApplications", {
        ...formData,
        resumePath: uploadedResumePath,
        skills: formData.skills.join(", "), // Store skills as a comma-separated string
      });

      setSuccess(true);
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error("Error applying for job:", error);
      setError("Failed to apply. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle navigation back to jobs page
  const handleBackToJobs = () => {
    navigate('/jobs');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex flex-col items-center justify-center p-6">
      
      <div className="fixed top-0 left-0 w-72 h-72 bg-indigo-300 opacity-5 rounded-full mix-blend-multiply filter blur-xl" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-purple-300 opacity-10 rounded-full mix-blend-multiply filter blur-xl" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl border border-gray-100"
      >
        
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={handleBackToJobs}
          className="flex items-center text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200 mb-6"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back to Jobs
        </motion.button>

        
        <div className="mb-8 border-b border-gray-200 pb-6">
          <div className="flex items-center mb-3">
            <Briefcase className="text-purple-600 mr-2" size={24} />
            <h1 className="text-2xl font-bold text-gray-800">
              Apply for <span className="text-purple-600">{job.jobTitle || "Job"}</span>
            </h1>
          </div>
          <h2 className="text-xl font-semibold text-gray-700">Company: {job.companyName}</h2>
          <p className="text-gray-600">Job Type: {job.jobType}</p>
        </div>

        
        <form className="space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">Personal Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                type="text" 
                name="firstName" 
                placeholder="First Name" 
                value={formData.firstName} 
                onChange={handleChange} 
                className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" 
                required 
              />
              <input 
                type="text" 
                name="lastName" 
                placeholder="Last Name" 
                value={formData.lastName} 
                onChange={handleChange} 
                className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" 
                required 
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                type="email" 
                name="email" 
                placeholder="Email" 
                value={formData.email} 
                onChange={handleChange} 
                className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" 
                required 
              />
              <input 
                type="text" 
                name="phoneNumber" 
                placeholder="Phone Number" 
                value={formData.phoneNumber} 
                onChange={handleChange} 
                className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" 
                required 
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                type="text" 
                name="userID" 
                placeholder="User ID" 
                value={formData.userID} 
                onChange={handleChange} 
                className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" 
                required 
              />
              <select 
                name="gender" 
                value={formData.gender} 
                onChange={handleChange} 
                className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" 
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <input 
              type="text" 
              name="location" 
              placeholder="Location" 
              value={formData.location} 
              onChange={handleChange} 
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" 
              required 
            />
          </div>

          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">Education & Skills</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                type="text" 
                name="qualification" 
                placeholder="Qualification" 
                value={formData.qualification} 
                onChange={handleChange} 
                className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" 
                required 
              />
              <input 
                type="number" 
                name="cgpa" 
                placeholder="CGPA" 
                min="0" 
                max="10" 
                step="0.01"
                value={formData.cgpa} 
                onChange={handleChange} 
                className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" 
                required 
              />
            </div>


            <div className="p-4 border border-gray-300 rounded-lg">
              <label className="font-medium text-gray-700 block mb-3">Programming Languages:</label>
              <div className="grid grid-cols-3 gap-3">
                {programmingLanguages.map((language) => (
                  <label key={language} className="flex items-center space-x-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="skills"
                      value={language}
                      checked={formData.skills.includes(language)}
                      onChange={handleSkillChange}
                      className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                    />
                    <span className="text-gray-700 group-hover:text-purple-600 transition-colors">{language}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">Resume Upload</h3>
            
            <div className="p-4 border border-gray-300 border-dashed rounded-lg bg-gray-50 hover:bg-gray-100 transition">
              <div className="flex flex-col items-center justify-center">
                <Upload className="text-purple-500 mb-2" size={28} />
                <p className="font-medium text-gray-700 mb-2">Upload Your Resume</p>
                <p className="text-gray-500 text-sm mb-3">PDF, DOC or DOCX (Max 5MB)</p>
                
                <label className="relative cursor-pointer bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                  Choose File
                  <input 
                    type="file" 
                    name="resumeFile" 
                    onChange={handleFileChange} 
                    className="sr-only" 
                    accept=".pdf,.doc,.docx"
                  />
                </label>
                
                <p className="mt-2 text-sm text-gray-600">{fileName}</p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            {loading ? (
              <div className="flex items-center justify-center space-x-2 bg-indigo-100 text-indigo-700 p-3 rounded-lg">
                <div className="w-5 h-5 border-2 border-indigo-700 border-t-transparent rounded-full animate-spin"></div>
                <p>Submitting application...</p>
              </div>
            ) : success ? (
              <div className="flex items-center space-x-2 bg-green-100 text-green-700 p-3 rounded-lg">
                <CheckCircle size={20} />
                <p>Application Submitted Successfully! Redirecting...</p>
              </div>
            ) : (
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all"
              >
                Submit Application
              </motion.button>
            )}

            {error && (
              <div className="flex items-center space-x-2 mt-3 bg-red-100 text-red-700 p-3 rounded-lg">
                <AlertCircle size={20} />
                <p>{error}</p>
              </div>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ApplyJob;