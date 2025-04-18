using JobPortalForFreshers.BusinessLayer;
using JobPortalForFreshers.Madals;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;


namespace JobPortalForFreshers.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterFormController : ControllerBase
    {
        RegisterFormBL registerFormBL = new RegisterFormBL();

        [HttpPost ("InsertCredentialsOfUser")]
        public IActionResult Post([FromBody]RegisterForm registerForm)
        {
            try
            {
                if (registerForm == null)
                {
                    return BadRequest(new { Message = "Invalid Customer Data" });
                }
                string result = registerFormBL.InsertCredentials(registerForm);
                return Ok(result);

            }
            catch (Exception e)
            {
                return BadRequest("Error Occurred: " + e.Message);
            }
        }





        [HttpPost("Login")]
        public IActionResult Login([FromBody] LoginForm login)
        {
            if (string.IsNullOrEmpty(login.Gmail) || string.IsNullOrEmpty(login.Password))
            {
                return BadRequest(new { message = "UserId and Password are required!" });
            }

            bool isValidUser = registerFormBL.ValidateUser(login.Gmail, login.Password);

            if (!isValidUser)
            {
                return Unauthorized(new { message = "Invalid UserId or Password!" });
            }

            return Ok(new { message = "Login Successful!" });
        }

    }
}
