namespace JobPortalForFreshers.Madals
{
    public class JobApply
    {
        public int JobID { get; set; }
        public int UserID { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Qualification { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Skills { get; set; }
        public decimal? CGPA { get; set; }
        public string? Gender { get; set; }
        public string? Location { get; set; }
        public string? Email { get; set; }
        public string? ResumePath { get; set; }

        public DateTime? AppliedDate { get; set; }


        public string? Status { get; set; }
        public string? CompanyName { get; set; }

        public string? JobTitle { get; set; }

        public string? JobType { get; set; }
    }

}
