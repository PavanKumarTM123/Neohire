using JobPortalForFreshers.BusinessLayer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JobPortalForFreshers.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecruiterController : ControllerBase
    {
        private readonly RecruiterServiceBL recruiterServiceBL;

        public RecruiterController(IConfiguration configuration)
        {
            string connectionString = configuration.GetConnectionString("jobportal");
            recruiterServiceBL = new RecruiterServiceBL(connectionString);
        }

        //create a job

        [HttpPost("post-job")]
        public IActionResult PostJob([FromBody] RecruiterPostJob job)
        {
            try
            {
                if (job == null)
                    return BadRequest(new { message = "Invalid job data" });

                string response = recruiterServiceBL.PostJob(job);

                if (response.Contains("Invalid RecruiterId"))
                    return BadRequest(new { message = response });

                if (response.Contains("Database Error"))
                    return StatusCode(500, new { message = response });

                return Ok(new { message = response });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal Server Error", error = ex.Message });
            }
        }

        //get a posted job 
        [HttpGet("manage-posted-jobs/{jobid}")]
        public IActionResult ManagePostedJobs(int jobid)
        {
            try
            {
                if (jobid <= 0)
                    return BadRequest(new { message = "Invalid Recruiter ID" });

                List<RecruiterPostJob> jobs = recruiterServiceBL.GetPostedJobs(jobid);

                if (jobs == null || jobs.Count == 0)
                    return NotFound(new { message = "No jobs found" });

                return Ok(jobs);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal Server Error", error = ex.Message });
            }
        }

        //end point to update 
        [HttpPatch("update-job/{jobId}")]
        public IActionResult UpdateJob(int jobId, [FromBody] RecruiterPostJob job)
        {
            if (job == null)
                return BadRequest(new { message = "Invalid job data" });

            string result = recruiterServiceBL.UpdateJobById(jobId, job);

            if (result == "Job Updated Successfully")
                return Ok(new { message = result });

            return BadRequest(new { message = result });
        }


        //endpoint of delete job 
        [HttpDelete("delete-job/{jobId}")]
        public IActionResult DeleteJob(int jobId)
        {
            try
            {
                string response = recruiterServiceBL.DeleteJob(jobId);
                return Ok(new { message = response });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal Server Error", error = ex.Message });
            }
        }

        //get job by id
        [HttpGet("job/{jobId}")]
        public IActionResult GetJobById(int jobId)
        {
            try
            {
                if (jobId <= 0)
                    return BadRequest(new { message = "Invalid Job ID" });

                var job = recruiterServiceBL.GetJobById(jobId);

                if (job == null)
                    return NotFound(new { message = "Job not found" });

                return Ok(job);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal Server Error", error = ex.Message });
            }
        }

        //[HttpPost("update-application-status")]
        //public IActionResult UpdateApplicationStatus([FromBody] ApplicationStatusUpdateModel model)
        //{
        //    try
        //    {
        //        if (model == null || (model.Status != "Accepted" && model.Status != "Rejected"))
        //            return BadRequest(new { message = "Invalid status value" });

        //        bool isUpdated = recruiterServiceBL.UpdateApplicationStatus(model.ApplicationID, model.Status);
        //        return isUpdated ? Ok(new { message = "Application status updated successfully" }) : NotFound(new { message = "Application not found" });
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, new { message = "Internal Server Error", error = ex.Message });
        //    }
        //}
        [HttpPost("update-application-status")]
        public IActionResult UpdateApplicationStatus([FromBody] ApplicationStatusUpdateModel model)
        {
            try
            {
                if (model == null || (model.Status != "Accepted" && model.Status != "Rejected"))
                    return BadRequest(new { message = "Invalid status value" });

                bool isUpdated = recruiterServiceBL.UpdateApplicationStatus(model.ApplicationID, model.Status);
                return isUpdated ? Ok(new { message = "Application status updated successfully" }) : NotFound(new { message = "Application not found" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal Server Error", error = ex.Message });
            }
        }

        [HttpGet("jobs-by-id/{recruiterId}")]
        public IActionResult GetJobsByRecruiterId(int recruiterId)
        {
            try
            {
                var jobs = recruiterServiceBL.GetJobsByRecruiterId(recruiterId);

                if (jobs == null || !jobs.Any())
                    return NotFound(new { message = "No jobs found for this recruiter." });

                return Ok(jobs);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal Server Error", error = ex.Message });
            }
        }

        [HttpGet("AllJobs")]
        public IActionResult GetAllJobs()
        {
            try
            {
                var jobs = recruiterServiceBL.GetAllJobs();

                if (jobs == null || jobs.Count == 0)
                    return NotFound(new { message = "No jobs found" });

                return Ok(jobs);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal Server Error", error = ex.Message });
            }
        }


        public class ApplicationStatusUpdateModel
        {
            public int ApplicationID { get; set; }
            public string Status { get; set; } // Accepted or Rejected
        }
    }
}


