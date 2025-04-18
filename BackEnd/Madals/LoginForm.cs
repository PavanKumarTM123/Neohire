using JobPortalForFreshers.common;
using System.ComponentModel.DataAnnotations;

namespace JobPortalForFreshers.Madals
{
    public class LoginForm
    {

        [Required]
        public string Gmail { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
