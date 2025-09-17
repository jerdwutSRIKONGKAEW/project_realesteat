using System.ComponentModel.DataAnnotations;

namespace serviceApiWebAdminRealestate.Models.DTOs
{
    public class UpdateAboutPrinciplesDto
    {
        [Required]
        public string? about_principles { get; set; } = string.Empty;
        [Required]
        public string? about_principles_details { get; set; } = string.Empty;
        [Required]
        public string? about_house { get; set; } = string.Empty;
        [Required]
        public string? about_house_details { get; set; } = string.Empty;
        [Required]
        public string? about_condo { get; set; } = string.Empty;
        [Required]
        public string? about_condo_details { get; set; } = string.Empty;
        public string? about_img1 { get; set; } = string.Empty;
        public string? about_img2 { get; set; } = string.Empty;
        public string? about_img3 { get; set; } = string.Empty;
    }
}
