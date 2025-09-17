using System.ComponentModel.DataAnnotations;

namespace serviceApiWebAdminRealestate.Models.DTOs
{
    public class UpdateContactDto
    {
        [Required]
        public string? tel { get; set; }
        [Required]
        public string? facebook { get; set; }
        [Required]
        public string? line { get; set; }
        [Required]
        public string? mail { get; set; }
        [Required]
        public string? location { get; set; }
        [Required]
        public string? company { get; set; }
        [Required]
        public string? img_company { get; set; }
    }
}
