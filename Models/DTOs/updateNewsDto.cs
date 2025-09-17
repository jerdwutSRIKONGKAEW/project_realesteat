using System.ComponentModel.DataAnnotations;

namespace serviceApiWebAdminRealestate.Models.DTOs
{
    public class UpdateNewsDto
    {
        [Required]
        public string? news_title { get; set; }
        [Required]
        public string? news_detail { get; set; }
        [Required]
        public string? news_image { get; set; }
    }
}
