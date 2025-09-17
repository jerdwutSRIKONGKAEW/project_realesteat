using System.ComponentModel.DataAnnotations;

namespace serviceApiWebAdminRealestate.Models.DTOs
{
    public class UpdateAboutDto
    {
        [Required]
        public string about_text { get; set; } = string.Empty;
    }
}
