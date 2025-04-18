
using System.Data;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using JobPortalForFreshers.Madals;
using Microsoft.Extensions.Configuration;
namespace JobPortalForFreshers.DataLayer
{
    public class ApplyJobDAL
    {
        private readonly string _connectionString;

        public ApplyJobDAL(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("jobportal");
        }

        public List<AppliedJobModel> GetUserAppliedJobs(int userId)
        {
            List<AppliedJobModel> jobs = new List<AppliedJobModel>();

            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                string query = @"
                SELECT 
                    ja.ApplicationID,
                    pj.JobTitle,
                    pj.CompanyName,
                    ja.AppliedDate,
                    ja.Status
                FROM JobApplications ja
                JOIN PostJob_Recruiter pj ON ja.JobID = pj.JobID
                WHERE ja.UserID = @UserID";

                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@UserID", userId);

                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        jobs.Add(new AppliedJobModel
                        {
                            ApplicationID = Convert.ToInt32(reader["ApplicationID"]),
                            JobTitle = reader["JobTitle"].ToString(),
                            CompanyName = reader["CompanyName"].ToString(),
                            AppliedDate = Convert.ToDateTime(reader["AppliedDate"]),
                            Status = reader["Status"].ToString()
                        });
                    }
                }
            }
            return jobs;
        }
    }
}


