using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using JobPortalForFreshers.Madals; // Import your model
using JobPortalForFreshers.common; // Import EnumUserRole

[Route("api/auth")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _config;
    private readonly string _connectionString;

    public AuthController(IConfiguration config)
    {
        _config = config;
        _connectionString = _config.GetConnectionString("jobportal"); // Load connection string
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginForm model)
    {
        var user = ValidateUser(model.Gmail, model.Password);

        if (user != null)
        {
            var token = GenerateJwtToken(user.Gmail, user.LogginAs);
            return Ok(new { token, role = (int)user.LogginAs, id = user.Id });
        }
        else
        {
            return Unauthorized(new { message = "Invalid email or password" });
        }
    }

    private RegisterForm ValidateUser(string gmail, string password)
    {
        using (SqlConnection conn = new SqlConnection(_connectionString))
        {
            conn.Open();
            string query = "SELECT Id, UserId, FirstName, LastName, Gmail, LogginAs, Password FROM RegisterForm WHERE Gmail = @Gmail AND Password = @Password";

            using (SqlCommand cmd = new SqlCommand(query, conn))
            {
                cmd.Parameters.AddWithValue("@Gmail", gmail);
                cmd.Parameters.AddWithValue("@Password", password);

                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        return new RegisterForm
                        {
                            Id = Convert.ToInt32(reader["Id"]),
                            UserId = reader["UserId"].ToString(),
                            FirstName = reader["FirstName"].ToString(),
                            LastName = reader["LastName"].ToString(),
                            Gmail = reader["Gmail"].ToString(),
                            LogginAs = (EnumUserRole)Enum.Parse(typeof(EnumUserRole), reader["LogginAs"].ToString()),
                            Password = reader["Password"].ToString()
                        };
                    }
                }
            }
        }

        return null;
    }

    private string GenerateJwtToken(string gmail, EnumUserRole role)
    {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(ClaimTypes.Email, gmail),
            new Claim(ClaimTypes.Role, role.ToString()) // Store role as a string in JWT
        };

        var token = new JwtSecurityToken(
            _config["Jwt:Issuer"],
            _config["Jwt:Audience"],
            claims,
            expires: DateTime.UtcNow.AddHours(1),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}



