using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace serviceApiWebAdminRealestate.Models.DTOs
{
    public class CreateNewsDto
    {
        public string? news_title { get; set; }
        public string? news_detail { get; set; }
        public string? news_image { get; set; }
    }
}
