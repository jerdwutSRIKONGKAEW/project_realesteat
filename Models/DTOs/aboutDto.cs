namespace serviceApiRealestate.Models.DTOs
{
    public class AboutDataDto
    {
        public List<AboutDto>? about { get; set; }
    }
    public class AboutDto
    {
        public int id { get; set; }
        public string? about_text { get; set; }
    }
}
