using Dapper;
using JobPortalForFreshers.common;
using JobPortalForFreshers.Madals;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;


namespace JobPortalForFreshers.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FetchProfileController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public FetchProfileController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet("profile/{email}")]
        public IActionResult GetUserProfile(string email)
        {
            using (SqlConnection conn = new SqlConnection(_configuration.GetConnectionString("jobportal")))
            {
                string query = "SELECT ID, UserId, FirstName, LastName, Gmail, LogginAs FROM REGISTERFORM WHERE LOWER(Gmail) = LOWER(@Email)";
                var user = conn.QueryFirstOrDefault<RegisterForm>(query, new { Email = email?.Trim() });

                if (user == null)
                {
                    Console.WriteLine($"No user found for email: {email}");
                    return NotFound(new { message = "User not found!" });
                }

                if (user == null)
                {
                    return NotFound(new { message = "User not found!" });
                }

                // Return different responses based on role
                if ((EnumUserRole)user.LogginAs == EnumUserRole.User) // Cast LogginAs to EnumUserRole
                {
                    return Ok(new { Message = "User Profile", Profile = user });
                }
                else if ((EnumUserRole)user.LogginAs == EnumUserRole.Recruiter)
                {
                    return Ok(new { Message = "Recruiter Profile", Profile = user });
                }
                else if ((EnumUserRole)user.LogginAs == EnumUserRole.Admin) // Admin
                {
                    return Ok(new
                    {
                        Message = "Admin Profile",
                        Profile = user
                    });
                }
                else
                {
                    return BadRequest(new { message = "Invalid Role" });
                }
            }
        }
    }
}
