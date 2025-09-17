using System.ComponentModel.DataAnnotations;
namespace serviceApiWebAdminRealestate.Models.Domain;
public class News
{
    [Key]
    public int news_no { get; set; }
    public string? news_title { get; set; }
    public string? news_detail { get; set; }
    public string? news_image { get; set; }
}

