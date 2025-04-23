// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Pencil, Trash2 } from "lucide-react";

// const RecruiterManageJobs = () => {
//   const [jobs, setJobs] = useState([]);
//   const [editingJob, setEditingJob] = useState(null);
//   const [jobData, setJobData] = useState({});
//   const recruiterId = localStorage.getItem("userId");
  
//   useEffect(() => {
//     if (recruiterId) {
//       fetchJobs();
//     }
//   }, [recruiterId]);

//   const fetchJobs = async () => {
//     try {
//       const response = await axios.get(`https://localhost:7278/api/Recruiter/jobs-by-id/${recruiterId}`);
//       setJobs(response.data);
//     } catch (error) {
//       console.error("Error fetching jobs:", error);
//     }
//   };

//   const handleDelete = async (jobId) => {
//     if (!window.confirm("Are you sure you want to delete this job?")) return;
//     try {
//       await axios.delete(`https://localhost:7278/api/Recruiter/delete-job/${jobId}`);
//       alert("Job deleted successfully!");
//       fetchJobs();
//     } catch (error) {
//       console.error("Error deleting job:", error);
//     }
//   };

//   const openEditModal = (job) => {
//     setEditingJob(job);
//     setJobData(job);
//   };

//   const handleChange = (e) => {
//     setJobData({ ...jobData, [e.target.name]: e.target.value });
//   };

//   const handleUpdate = async () => {
//     try {
//       await axios.patch(`https://localhost:7278/api/Recruiter/update-job/${jobData.jobId}`, jobData);
//       alert("Job updated successfully!");
//       fetchJobs();
//       setEditingJob(null);
//     } catch (error) {
//       console.error("Error updating job:", error);
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h2 className="text-3xl font-bold text-blue-700 mb-4 text-center">Manage Jobs</h2>

//       {jobs.length === 0 ? (
//         <p className="text-gray-600 text-center">No jobs found.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {jobs.map((job) => (
//             <div key={job.jobId} className="bg-white p-4 shadow-md rounded-lg border">
//               <h3 className="text-xl font-bold text-gray-800">{job.jobTitle}</h3>
//               <p className="text-gray-600">{job.companyName} - {job.location}</p>
//               <p className="text-gray-500">CTC: {job.ctc} | Vacancies: {job.vacancy}</p>
//               <p className="text-gray-700 mt-2">{job.jobDescription}</p>

//               <div className="mt-4 flex space-x-2">
//                 <button onClick={() => openEditModal(job)} className="bg-blue-500 text-white px-3 py-1 rounded flex items-center">
//                   <Pencil className="w-4 h-4 mr-1" /> Edit
//                 </button>
//                 <button onClick={() => handleDelete(job.jobId)} className="bg-red-500 text-white px-3 py-1 rounded flex items-center">
//                   <Trash2 className="w-4 h-4 mr-1" /> Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {editingJob && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
//           <div className="bg-white p-6 rounded-lg w-full max-w-md">
//             <h3 className="text-lg font-bold mb-3">Edit Job Details</h3>
            
//             <label className="block font-medium">Salary (CTC):</label>
//             <input type="number" name="ctc" value={jobData.ctc} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
            
//             <label className="block font-medium">Vacancy:</label>
//             <input type="number" name="vacancy" value={jobData.vacancy} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
            
//             <label className="block font-medium">Job Type:</label>
//             <input type="text" name="jobType" value={jobData.jobType} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
            
//             <label className="block font-medium">Skills Required:</label>
//             <input type="text" name="requiredSkills" value={jobData.requiredSkills} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
            
//             <div className="flex justify-end space-x-2">
//               <button onClick={() => setEditingJob(null)} className="bg-gray-400 text-white px-4 py-1 rounded">Cancel</button>
//               <button onClick={handleUpdate} className="bg-blue-600 text-white px-4 py-1 rounded">Save</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RecruiterManageJobs;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";

const RecruiterManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [jobData, setJobData] = useState({});
  const recruiterId = localStorage.getItem("userId");
  
  useEffect(() => {
    if (recruiterId) {
      fetchJobs();
    }
  }, [recruiterId]);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`https://localhost:7278/api/Recruiter/jobs-by-id/${recruiterId}`);
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handleDelete = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      await axios.delete(`https://localhost:7278/api/Recruiter/delete-job/${jobId}`);
      alert("Job deleted successfully!");
      fetchJobs();
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const openEditModal = (job) => {
    setEditingJob(job);
    setJobData(job);
  };

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.patch(`https://localhost:7278/api/Recruiter/update-job/${jobData.jobId}`, jobData);
      alert("Job updated successfully!");
      fetchJobs();
      setEditingJob(null);
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-blue-700 mb-4 text-center">Manage Jobs</h2>

      {jobs.length === 0 ? (
        <p className="text-gray-600 text-center">No jobs found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {jobs.map((job) => (
            <div key={job.jobId} className="bg-white p-4 shadow-md rounded-lg border">
              <h3 className="text-xl font-bold text-gray-800">{job.jobTitle}</h3>
              <p className="text-gray-600">{job.companyName} - {job.location}</p>
              <p className="text-gray-500">CTC: {job.ctc} | Vacancies: {job.vacancy}</p>
              <p className="text-gray-700 mt-2">{job.jobDescription}</p>

              <div className="mt-4 flex space-x-2">
                <button onClick={() => openEditModal(job)} className="bg-blue-500 text-white px-3 py-1 rounded flex items-center">
                  <Pencil className="w-4 h-4 mr-1" /> Edit
                </button>
                <button onClick={() => handleDelete(job.jobId)} className="bg-red-500 text-white px-3 py-1 rounded flex items-center">
                  <Trash2 className="w-4 h-4 mr-1" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingJob && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-3">Edit Job Details</h3>
            
            <label className="block font-medium">Salary (CTC):</label>
            <input type="number" name="ctc" value={jobData.ctc} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
            
            <label className="block font-medium">Vacancy:</label>
            <input type="number" name="vacancy" value={jobData.vacancy} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
            
            <label className="block font-medium">Job Type:</label>
            <input type="text" name="jobType" value={jobData.jobType} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
            
            <label className="block font-medium">Skills Required:</label>
            <input type="text" name="requiredSkills" value={jobData.requiredSkills} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
            
            <div className="flex justify-end space-x-2">
              <button onClick={() => setEditingJob(null)} className="bg-gray-400 text-white px-4 py-1 rounded">Cancel</button>
              <button onClick={handleUpdate} className="bg-blue-600 text-white px-4 py-1 rounded">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecruiterManageJobs;
