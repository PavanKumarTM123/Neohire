using Microsoft.AspNetCore.Authorization;
using Microsoft.Data.SqlClient;

namespace JobPortalForFreshers.BusinessLayer
{
    public class RecruiterBL
    {
        private readonly string _connectionString;

        public RecruiterBL(string connectionString)
        {
            _connectionString = connectionString;
        }
        public bool UpdateApplicationStatus(int applicationId, string status)
        {
            if (status != "Accepted" && status != "Rejected")
                throw new ArgumentException("Invalid status value.");

            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                string query = "UPDATE JobApplications SET Status = @Status WHERE ApplicationID = @ApplicationID";

                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@Status", status);
                cmd.Parameters.AddWithValue("@ApplicationID", applicationId);

                conn.Open();
                int rowsAffected = cmd.ExecuteNonQuery();
                return rowsAffected > 0;
            }
        }
    }
}
