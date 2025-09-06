namespace serviceApiRealestate.Models.DTOs
{
    public class NewsDataDto
    {
        public List<NewsDto>? news { get; set; }
    }
    public class NewsDto
    {
        public int news_no { get; set; }
        public string? news_title { get; set; }
        public string? news_detail { get; set; }
        public string? news_image { get; set; }
    }
}
