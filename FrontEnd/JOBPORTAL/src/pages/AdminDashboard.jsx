import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalJobs: 0,
    appliedJobs: 0,
    contactedUsers: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const fetchData = async (url) => {
          try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const text = await response.text();
            return text ? JSON.parse(text) : {};
          } catch (error) {
            console.error(`Error fetching ${url}:`, error);
            return {};
          }
        };

        const usersData = await fetchData("https://localhost:7278/api/TotalUser/GetTotalUsers");
        const jobsData = await fetchData("https://localhost:7278/api/TotalJobs/GetTotalJobs");
        const appliedJobsData = await fetchData("https://localhost:7278/api/AppliedJobs/GetAppliedJobs");
        const contactedUsersData = await fetchData("https://localhost:7278/api/ContactedUsers/GetContactedUsers");

        setStats({
          totalUsers: usersData.totalUsers || 0,
          totalJobs: jobsData.totalJobs || 0,
          appliedJobs: appliedJobsData.appliedJobs || 0,
          contactedUsers: contactedUsersData.contactedUsers || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="p-5 flex-1">
        <Outlet /> {/* This dynamically renders the child component (JobList, ViewUsers, etc.) */}
      </div>
    </div>
  );
};

export default AdminDashboard;
