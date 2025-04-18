import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CheckCircle, XCircle, Trash2, Edit, ArrowLeft } from "lucide-react";

const RecruiterManageApplications = () => {
  const [applications, setApplications] = useState([]);
  const [editingApp, setEditingApp] = useState(null);
  const [editedStatus, setEditedStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await axios.get("https://localhost:7278/api/ApplyJobApplications");
      console.log("Fetched Applications:", response.data);
      setApplications(response.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  const updateStatus = async (applicationId, newStatus) => {
    try {
      const response = await axios.put(
        `https://localhost:7278/api/ApplyJobApplications/${applicationId}`,
        { Status: newStatus }
      );
      console.log("Update Response:", response.data);

      setApplications(applications.map(app =>
        app.ApplicationID === applicationId ? { ...app, Status: newStatus } : app
      ));
    } catch (error) {
      console.error("Error updating application status:", error);
    }
  };

  const deleteApplication = async (applicationId) => {
    if (!window.confirm("Are you sure you want to delete this application?")) return;
    try {
      await axios.delete(`https://localhost:7278/api/ApplyJobApplications/${applicationId}`);
      setApplications(applications.filter(app => app.ApplicationID !== applicationId));
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };

  const openEditModal = (app) => {
    setEditingApp(app);
    setEditedStatus(app.Status);
  };

  const handleEditChange = (e) => {
    setEditedStatus(e.target.value);
    console.log("Updated Status:", e.target.value);
  };

  const saveEdit = async () => {
    if (!editingApp) return;
    try {
        console.log("Updating Application:", editingApp.ApplicationID, "New Status:", editedStatus);
        
        // Corrected API request
        await axios.post(`https://localhost:7278/api/Recruiter/update-application-status`, {
            ApplicationID: editingApp.ApplicationID, // Ensure this is sent in the body
            Status: editedStatus
        });

        // Update the UI
        setApplications(applications.map(app =>
            app.ApplicationID === editingApp.ApplicationID ? { ...app, Status: editedStatus } : app
        ));
        setEditingApp(null);
    } catch (error) {
        console.error("Error updating application:", error);
    }
};


  const viewResume = (userId, jobId) => {
    const resumeUrl = `https://localhost:7278/api/DocumentUpload/DownloadResumeFile?userId=${userId}&jobId=${jobId}`;
    window.open(resumeUrl, "_blank");
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-2xl font-semibold text-gray-800">Manage Applications</h3>
        <button onClick={() => navigate("/recruiter-dashboard")} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          <ArrowLeft className="inline-block mr-2" /> Back
        </button>
      </div>

      {applications.length === 0 ? (
        <p className="text-gray-600 text-center mt-8">No job applications found.</p>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-200 text-gray-800">
                <th className="p-3 text-left">Candidate</th>
                <th className="p-3 text-left">Qualification</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(app => (
                <tr key={app.ApplicationID} className="border-b hover:bg-gray-100">
                  <td className="p-3">{app.FirstName} {app.LastName}</td>
                  <td className="p-3">{app.Qualification}</td>
                  <td className="p-3">{app.Email}</td>
                  <td className="p-3 text-center">
                    <span className={`px-3 py-1 text-white text-xs font-semibold rounded-full shadow-md 
                      ${app.Status === "Pending" ? "bg-yellow-500" : app.Status === "Accepted" ? "bg-green-500" : "bg-red-500"}`}>
                      {app.Status}
                    </span>
                  </td>
                  <td className="p-3 text-center flex justify-center space-x-4">
                    <button className="text-blue-600 flex items-center hover:underline" onClick={() => openEditModal(app)}>
                      <Edit className="mr-1" size={18} /> Edit
                    </button>
                    <button className="text-red-600 flex items-center hover:underline" onClick={() => deleteApplication(app.ApplicationID)}>
                      <Trash2 className="mr-1" size={18} /> Delete
                    </button>
                    <button className="text-green-600 flex items-center hover:underline" onClick={() => viewResume(app.UserID, app.JobID)}>
                      📄 View Resume
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editingApp && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Edit Application Status</h2>
            <select value={editedStatus} onChange={handleEditChange} className="w-full p-2 border rounded mb-3">
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>
            <div className="flex justify-end gap-3">
              <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => setEditingApp(null)}>Cancel</button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={saveEdit}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecruiterManageApplications;