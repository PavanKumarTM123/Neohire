namespace JobPortalForFreshers.Madals
{
    
        public class RecruiterPostJob
        {
            public int JobId { get; set; }
            public int RecruiterId { get; set; }

            public string JobTitle { get; set; }
            public string CompanyName { get; set; }
            public string Location { get; set; }
            public string Email { get; set; }
            public int? Vacancy { get; set; }
            public string JobType { get; set; }
            public decimal? CTC { get; set; }
            public string RequiredSkills { get; set; }
            public string JobDescription { get; set; }
        }
    }


