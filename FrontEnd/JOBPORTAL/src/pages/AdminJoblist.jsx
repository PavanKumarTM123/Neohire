// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AdminJoblist = () => {
//   const [jobs, setJobs] = useState([]);

//   // Fetch Jobs from API
//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   const fetchJobs = () => {
//     axios
//       .get("https://localhost:7278/api/Recruiter/AllJobs")
//       .then((response) => setJobs(response.data))
//       .catch((error) => console.error("Error fetching jobs:", error));
//   };

//   // Delete Job Function
//   const handleDelete = (jobId) => {
//     if (window.confirm("Are you sure you want to delete this job?")) {
//       axios
//         .delete(`https://localhost:7278/api/Recruiter/delete-job/${jobId}`)
//         .then(() => {
//           alert("Job deleted successfully!");
//           fetchJobs(); // Refresh the job list after deletion
//         })
//         .catch((error) => console.error("Error deleting job:", error));
//     }
//   };

//   return (
//     <div className="min-h-screen bg-blue-50 p-8">
//       <h1 className="text-4xl font-bold text-blue-700 mb-6">Job List</h1>
//       <div className="overflow-x-auto bg-white shadow-xl rounded-lg">
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="bg-blue-600 text-white">
//               <th className="p-4 text-left text-sm font-medium">Job ID</th>
//               <th className="p-4 text-left text-sm font-medium">Job Title</th>
//               <th className="p-4 text-left text-sm font-medium">Company</th>
//               <th className="p-4 text-left text-sm font-medium">Salary</th>
//               <th className="p-4 text-left text-sm font-medium">Vacancies</th>
//               <th className="p-4 text-left text-sm font-medium">Skills</th>
//               <th className="p-4 text-left text-sm font-medium">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {jobs.map((job) => (
//               <tr key={job.id} className="border-b hover:bg-blue-50 transition-all">
//                 <td className="p-4 text-sm">{job.jobId}</td>
//                 <td className="p-4 text-sm">{job.jobTitle}</td>
//                 <td className="p-4 text-sm">{job.companyName}</td>
//                 <td className="p-4 text-sm">${job.ctc}</td>
//                 <td className="p-4 text-sm">{job.vacancy}</td>
//                 <td className="p-4 text-sm">{job.requiredSkills}</td>
//                 <td className="p-4">
//                   <button
//                     onClick={() => handleDelete(job.jobId)}
//                     className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-all"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {jobs.length === 0 && (
//               <tr>
//                 <td colSpan="7" className="text-center p-6 text-gray-500">
//                   No jobs available
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminJoblist;
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminJoblist = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = () => {
    axios
      .get("https://localhost:7278/api/Recruiter/AllJobs")
      .then((response) => setJobs(response.data))
      .catch((error) => console.error("Error fetching jobs:", error));
  };

  const handleDelete = (jobId) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      axios
        .delete(`https://localhost:7278/api/Recruiter/delete-job/${jobId}`)
        .then(() => {
          alert("Job deleted successfully!");
          fetchJobs();
        })
        .catch((error) => console.error("Error deleting job:", error));
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-4 sm:p-8">
      <h1 className="text-2xl sm:text-4xl font-bold text-blue-700 mb-6">Job List</h1>
      <div className="overflow-x-auto bg-white shadow-xl rounded-lg">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-4 text-left text-sm font-medium">Job ID</th>
              <th className="p-4 text-left text-sm font-medium">Job Title</th>
              <th className="p-4 text-left text-sm font-medium">Company</th>
              <th className="p-4 text-left text-sm font-medium">Salary</th>
              <th className="p-4 text-left text-sm font-medium">Vacancies</th>
              <th className="p-4 text-left text-sm font-medium">Skills</th>
              <th className="p-4 text-left text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id} className="border-b hover:bg-blue-50 transition-all">
                <td className="p-4 text-sm">{job.jobId}</td>
                <td className="p-4 text-sm">{job.jobTitle}</td>
                <td className="p-4 text-sm">{job.companyName}</td>
                <td className="p-4 text-sm">${job.ctc}</td>
                <td className="p-4 text-sm">{job.vacancy}</td>
                <td className="p-4 text-sm">{job.requiredSkills}</td>
                <td className="p-4">
                  <button
                    onClick={() => handleDelete(job.jobId)}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-all"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {jobs.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center p-6 text-gray-500">
                  No jobs available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminJoblist;
