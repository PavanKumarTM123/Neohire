using JobPortalForFreshers.BusinessLayer;
using JobPortalForFreshers.Madals;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JobPortalForFreshers.Controllers
{
    [Route("api/admin")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly RegisterFormBL _registerFormBL;

        public AdminController(RegisterFormBL registerFormBL)
        {
            _registerFormBL = registerFormBL;
        }

        // Get All Users
        [HttpGet("users")]
        public IActionResult GetAllUsers()
        {
            var users = _registerFormBL.GetAllUsers(); // Ensure this method is implemented
            return Ok(users);
        }

        // Get User by ID
        [HttpGet("users/{userid}")]
        public IActionResult GetUserById(string userid)
        {
            var user = _registerFormBL.GetUserById(userid);
            if (user == null)
                return NotFound("User Not Found");
            return Ok(user);
        }

        // Update User
        [HttpPut("users/{userid}")]
        public IActionResult UpdateUser(string userid, [FromBody] RegisterForm registerForm)
        {
            if (userid != registerForm.UserId)
                return BadRequest("User ID Mismatch");

            string result = _registerFormBL.UpdateUser(registerForm);
            return Ok(result);
        }

        // Delete User
        [HttpDelete("users/{id}")]
        public IActionResult DeleteUser(int id)
        {
            string result = _registerFormBL.DeleteUser(id);
            return Ok(result);
        }
    }
}
