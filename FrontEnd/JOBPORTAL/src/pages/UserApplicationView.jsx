import { useEffect, useState } from "react";
import axios from "axios";

const UserApplicationView = () => {
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      setError("User ID not found. Please log in.");
      setLoading(false);
      return;
    }

    const fetchApplication = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7278/api/ApplyJobApplications/${userId}`
        );
        
        // Extract the required fields from the response
        const appData = {
          jobTitle: response.data.JobTitle,
          companyName: response.data.CompanyName,
          status: response.data.Status,
          appliedDate: response.data.AppliedDate
        };
        
        setApplication(appData);
      } catch (err) {
        setError(err.response?.data || "Failed to fetch application.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [userId]);

  if (loading) return (
    <div className="max-w-3xl mx-auto px-4 py-6 text-center">
      <p className="text-gray-600 animate-pulse">Loading your application...</p>
    </div>
  );

  if (error) return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
        <p className="text-red-700">{error}</p>
      </div>
    </div>
  );

  if (!application) return (
    <div className="max-w-3xl mx-auto px-4 py-6 text-center">
      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-blue-800 mb-2">No Application Found</h3>
        <p className="text-blue-600">You haven't submitted any job applications yet.</p>
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Browse Jobs
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-6 text-center text-blue-900">
        Your Job Application
      </h2>
      
      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500 mb-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-blue-900">{application.jobTitle}</h3>
            <p className="text-blue-700">{application.companyName}</p>
          </div>
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
              application.status === "Accepted"
                ? "bg-green-200 text-green-800"
                : application.status === "Rejected"
                ? "bg-red-200 text-red-800"
                : "bg-yellow-200 text-yellow-800"
            }`}
          >
            {application.status}
          </span>
        </div>

        {application.appliedDate && (
          <p className="mt-2 text-gray-500 text-sm">
            Applied on: {new Date(application.appliedDate).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default UserApplicationView;