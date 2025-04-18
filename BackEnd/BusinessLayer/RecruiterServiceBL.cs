using JobPortalForFreshers.DataLayer;
using Microsoft.Data.SqlClient;
using System.Data;

namespace JobPortalForFreshers.BusinessLayer
{
    public class RecruiterServiceBL
    {
        SqlDBServer dBServer = new SqlDBServer();
        private readonly RecruiterBL recruiterBL;

        public RecruiterServiceBL(string connectionString)
        {
            recruiterBL = new RecruiterBL(connectionString);
        }

        //post a job

        public string PostJob(RecruiterPostJob job)
        {
            int rowsAffected = dBServer.ExecuteOnlyQuery("sp_ManagePostJobRecruiter", CommandType.StoredProcedure,
            new SqlParameter("@Action", "INSERT"),
            new SqlParameter("@RecruiterID", job.RecruiterId),
            new SqlParameter("@JobTitle", job.JobTitle),
            new SqlParameter("@CompanyName", job.CompanyName),
            new SqlParameter("@Location", job.Location),
            new SqlParameter("@Email", job.Email),
            new SqlParameter("@Vacancy", job.Vacancy),
            new SqlParameter("@JobType", job.JobType),
            new SqlParameter("@CTC", job.CTC),
            new SqlParameter("@RequiredSkills", job.RequiredSkills),
            new SqlParameter("@JobDescription", job.JobDescription)
           );

            return rowsAffected > 0 ? "Job Posted Successfully" : "Error Posting Job";
        }



        //get all jobs posted by recruiter
        public List<RecruiterPostJob> GetPostedJobs(int jobid)
        {
            DataTable dt = dBServer.GetDataTable("sp_ManagePostJobRecruiter", CommandType.StoredProcedure,
                new SqlParameter("@Action", "SELECT_ALL"),
                new SqlParameter("@JobID", jobid));

            List<RecruiterPostJob> jobList = new List<RecruiterPostJob>();

            foreach (DataRow row in dt.Rows)
            {
                jobList.Add(new RecruiterPostJob
                {
                    JobId = Convert.ToInt32(row["JobId"]),
                    JobTitle = row["JobTitle"].ToString(),
                    CompanyName = row["CompanyName"].ToString(),
                    Location = row["Location"].ToString(),
                    Email = row["Email"].ToString(),
                    Vacancy = Convert.ToInt32(row["Vacancy"]),
                    JobType = row["JobType"].ToString(),
                    CTC = Convert.ToDecimal(row["CTC"]),
                    RequiredSkills = row["RequiredSkills"].ToString(),
                    JobDescription = row["JobDescription"].ToString()
                });
            }

            return jobList;
        }

        //update a job

        public string UpdateJobById(int jobId, RecruiterPostJob job)
        {
            if (job == null || jobId <= 0)
                return "Invalid job data";

            List<SqlParameter> parameters = new List<SqlParameter>
    {
        new SqlParameter("@Action", "UPDATE"),
        new SqlParameter("@JobID", jobId) // Ensure JobID is passed correctly
    };

            if (!string.IsNullOrWhiteSpace(job.CompanyName))
                parameters.Add(new SqlParameter("@CompanyName", job.CompanyName));

            if (!string.IsNullOrWhiteSpace(job.JobTitle))
                parameters.Add(new SqlParameter("@JobTitle", job.JobTitle));

            if (!string.IsNullOrWhiteSpace(job.JobType))
                parameters.Add(new SqlParameter("@JobType", job.JobType));

            if (job.CTC.HasValue && job.CTC > 0)
                parameters.Add(new SqlParameter("@CTC", job.CTC));

            if (job.Vacancy.HasValue && job.Vacancy > 0)
                parameters.Add(new SqlParameter("@Vacancy", job.Vacancy));

            if (!string.IsNullOrWhiteSpace(job.Email))
                parameters.Add(new SqlParameter("@Email", job.Email));

            if (!string.IsNullOrWhiteSpace(job.RequiredSkills))
                parameters.Add(new SqlParameter("@RequiredSkills", job.RequiredSkills));

            if (!string.IsNullOrWhiteSpace(job.Location))
                parameters.Add(new SqlParameter("@Location", job.Location));

            int rowsAffected = dBServer.ExecuteOnlyQuery("sp_ManagePostJobRecruiter", CommandType.StoredProcedure, parameters.ToArray());

            return rowsAffected > 0 ? "Job Updated Successfully" : "No Changes Made or Job Not Found";
        }



        //delete a job 
        public string DeleteJob(int jobId)
        {
            int rowsAffected = dBServer.ExecuteOnlyQuery("sp_ManagePostJobRecruiter", CommandType.StoredProcedure,
                new SqlParameter("@Action", "DELETE"),
                new SqlParameter("@JobID", jobId));


            return rowsAffected > 0 ? "Job Deleted Successfully" : "Unauthorized or Error Deleting Job";
        }



        public List<RecruiterPostJob> GetAllJobs()
        {
            DataTable dt = dBServer.GetDataTable("sp_ManagePostJobRecruiter", CommandType.StoredProcedure,
                new SqlParameter("@Action", "SELECT_ALL"));

            List<RecruiterPostJob> jobList = new List<RecruiterPostJob>();

            foreach (DataRow row in dt.Rows)
            {
                jobList.Add(new RecruiterPostJob
                {
                    JobId = row["JobId"] == DBNull.Value ? 0 : Convert.ToInt32(row["JobId"]),
                    JobTitle = row["JobTitle"] == DBNull.Value ? string.Empty : row["JobTitle"].ToString(),
                    CompanyName = row["CompanyName"] == DBNull.Value ? string.Empty : row["CompanyName"].ToString(),
                    Location = row["Location"] == DBNull.Value ? string.Empty : row["Location"].ToString(),
                    Email = row["Email"] == DBNull.Value ? string.Empty : row["Email"].ToString(),
                    Vacancy = row["Vacancy"] == DBNull.Value ? 0 : Convert.ToInt32(row["Vacancy"]),
                    JobType = row["JobType"] == DBNull.Value ? string.Empty : row["JobType"].ToString(),
                    CTC = row["CTC"] == DBNull.Value ? 0.0m : Convert.ToDecimal(row["CTC"]),
                    RequiredSkills = row["RequiredSkills"] == DBNull.Value ? string.Empty : row["RequiredSkills"].ToString(),
                    JobDescription = row["JobDescription"] == DBNull.Value ? string.Empty : row["JobDescription"].ToString()
                });
            }

            return jobList;
        }


        //get job by jobid




        public RecruiterPostJob GetJobById(int jobId)
        {
            DataTable dt = dBServer.GetDataTable("sp_ManagePostJobRecruiter", CommandType.StoredProcedure,
                new SqlParameter("@Action", "SELECT_ONE"),
                new SqlParameter("@JobID", jobId));

            if (dt.Rows.Count == 0)
                return null;

            DataRow row = dt.Rows[0];

            return new RecruiterPostJob
            {
                JobTitle = row["JobTitle"].ToString(),
                CompanyName = row["CompanyName"].ToString(),
                Location = row["Location"].ToString(),
                Email = row["Email"].ToString(),
                Vacancy = Convert.ToInt32(row["Vacancy"]),
                JobType = row["JobType"].ToString(),
                CTC = Convert.ToDecimal(row["CTC"]),
                RequiredSkills = row["RequiredSkills"].ToString(),
                JobDescription = row["JobDescription"].ToString()
            };
        }



        // Accept or Reject Job Application
        public bool UpdateApplicationStatus(int applicationId, string status)
        {
            return recruiterBL.UpdateApplicationStatus(applicationId, status);
        }

        // get all jobs 
        public List<RecruiterPostJob> GetJobsByRecruiterId(int recruiterId)
        {
            DataTable dt = dBServer.GetDataTable("sp_ManagePostJobRecruiter", CommandType.StoredProcedure,
                new SqlParameter("@Action", "SELECT_BY_ID"),
                new SqlParameter("@RecruiterId", recruiterId));

            List<RecruiterPostJob> jobList = new List<RecruiterPostJob>();

            foreach (DataRow row in dt.Rows)
            {
                jobList.Add(new RecruiterPostJob
                {
                    JobId = row["JobId"] != DBNull.Value ? Convert.ToInt32(row["JobId"]) : 0,
                    RecruiterId = row["RecruiterId"] != DBNull.Value ? Convert.ToInt32(row["RecruiterId"]) : 0,
                    JobTitle = row["JobTitle"] != DBNull.Value ? row["JobTitle"].ToString() : string.Empty,
                    CompanyName = row["CompanyName"] != DBNull.Value ? row["CompanyName"].ToString() : string.Empty,
                    Location = row["Location"] != DBNull.Value ? row["Location"].ToString() : string.Empty,
                    Email = row["Email"] != DBNull.Value ? row["Email"].ToString() : string.Empty,
                    Vacancy = row["Vacancy"] != DBNull.Value ? Convert.ToInt32(row["Vacancy"]) : 0,
                    JobType = row["JobType"] != DBNull.Value ? row["JobType"].ToString() : string.Empty,
                    CTC = row["CTC"] != DBNull.Value ? Convert.ToDecimal(row["CTC"]) : 0m,
                    RequiredSkills = row["RequiredSkills"] != DBNull.Value ? row["RequiredSkills"].ToString() : string.Empty,
                    JobDescription = row["JobDescription"] != DBNull.Value ? row["JobDescription"].ToString() : string.Empty
                });
            }

            return jobList;
        }


    }
}

