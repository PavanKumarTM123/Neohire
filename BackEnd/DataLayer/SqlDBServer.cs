using Microsoft.Data.SqlClient;
using System.Data;

namespace JobPortalForFreshers.DataLayer
{
    public class SqlDBServer
    {
        #region connection with sql server
        public string connection = string.Empty;
        public SqlDBServer()
        {
            var connectionString = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("ConnectionStrings")["jobportal"];
            connection = Convert.ToString(connectionString);
        }
        #endregion

        #region get data table

        public DataTable GetDataTable(string procedureName, CommandType commandType, params SqlParameter[] parameters)
        {
            using (SqlConnection sqlConnection = new SqlConnection(connection))
            {
                using (SqlCommand sqlCommand = new SqlCommand(procedureName, sqlConnection))
                {
                    sqlCommand.CommandType = commandType;
                    if (parameters != null)
                    {
                        sqlCommand.Parameters.AddRange(parameters);
                    }
                    sqlConnection.Open();
                    using (SqlDataAdapter adapter = new SqlDataAdapter(sqlCommand))
                    {
                        DataTable dataTable = new DataTable();
                        adapter.Fill(dataTable);
                        return dataTable;
                    }
                }
            }
        }
        #endregion

        #region post update delete
        public DataTable ExecuteQuery(string query, CommandType commandType, params SqlParameter[] parameters)
        {
            DataTable dataTable = new DataTable();

            using (SqlConnection sqlconnection = new SqlConnection(connection)) // Ensure _connectionString is properly set
            {
                using (SqlCommand command = new SqlCommand(query, sqlconnection))
                {
                    command.CommandType = commandType;

                    if (parameters != null)
                    {
                        command.Parameters.AddRange(parameters);
                    }

                    using (SqlDataAdapter adapter = new SqlDataAdapter(command))
                    {
                        adapter.Fill(dataTable);
                    }
                }
            }

            return dataTable;
        }
        #endregion

        public int ExecuteOnlyQuery(string query, CommandType commandType, params SqlParameter[] sqlParameters)
        {
            using (SqlConnection conn = new SqlConnection(connection))
            {
                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.CommandType = commandType;
                    if (sqlParameters != null)
                    {
                        cmd.Parameters.AddRange(sqlParameters);
                    }

                    conn.Open();
                    return cmd.ExecuteNonQuery(); // ✅ Executes the query and returns affected rows
                }
            }
        }

    }
}
