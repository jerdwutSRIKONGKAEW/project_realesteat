namespace serviceApiRealestate.Models.DTOs
{
    public class GetIdNewsDataDto
    {
        public List<GetIdNewsDto>? news { get; set; }
    }
    public class GetIdNewsDto
    {
        public int news_no { get; set; }
        public string? news_title { get; set; }
        public string? news_detail { get; set; }
        public string? news_image { get; set; }

    }
}
