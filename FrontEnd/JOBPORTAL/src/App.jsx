import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Jobs from "./pages/Jobs";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminSideDashboard from "./pages/AdminSideDashboard";
import AdminJoblist from "./pages/AdminJoblist";
import AdminViewUsers from "./pages/AdminViewUsers";
import UserProfile from "./pages/UserProfile";
import UserApplicationView from "./pages/UserApplicationView";
import WelcomeScreen from "./components/WelcomeScreen";
import RecruiterProfile from "./pages/RecruiterProfile";
import RecruiterPostJob from "./pages/RecruiterPostJob";
import RecruiterManageJobs from "./pages/RecruiterManageJobs";
import RecruiterManageApplications from "./pages/RecruiterManageApplications";
import ApplyJob from "./pages/ApplyJob";
import JobDetails from "./pages/JobDetails";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/apply/:jobId" element={<ApplyJob />} />
        <Route path="/job-details/:JobID" element={<JobDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={["1"]} />}>
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/user-applications" element={<UserApplicationView />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["2"]} />}>
          <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
          <Route path="/recruiter-profile" element={<RecruiterProfile />} /> 
          <Route path="/recruiter-postjob" element={<RecruiterPostJob />} />  
          <Route path="/manage-jobs" element={<RecruiterManageJobs />} />  
          <Route path="/applications" element={<RecruiterManageApplications />} />  


        </Route>

        {/* Admin Dashboard with Nested Routes */}
        <Route element={<ProtectedRoute allowedRoles={["3"]} />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />}>
            <Route index element={<AdminSideDashboard />} />  {/* Default page */}
            <Route path="job-list" element={<AdminJoblist />} />
            <Route path="ViewUserDashboard" element={<AdminViewUsers />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
