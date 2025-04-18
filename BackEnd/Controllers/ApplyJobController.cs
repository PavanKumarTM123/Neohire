using JobPortalForFreshers.BusinessLayer;
using JobPortalForFreshers.DataLayer;
using JobPortalForFreshers.Madals;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JobPortalForFreshers.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplyJobController(ApplyJobBL applyJobBL) : ControllerBase
    {

        [HttpGet("GetUserAppliedJobs")]
        public IActionResult GetUserAppliedJobs(int userId)
        {
            try
            {
                List<AppliedJobModel> appliedJobs = applyJobBL.GetUserAppliedJobs(userId);

                if (appliedJobs.Count == 0)
                {
                    return NotFound("No applied jobs found for this user.");
                }

                return Ok(appliedJobs);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }
    }
}
