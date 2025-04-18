using JobPortalForFreshers.common;
using System.ComponentModel.DataAnnotations;

namespace JobPortalForFreshers.Madals
{
    public class RegisterForm
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }

        [Required]
        public string Gmail { get; set; }
        [Required]
        public EnumUserRole LogginAs { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
