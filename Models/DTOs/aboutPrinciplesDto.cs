namespace serviceApiRealestate.Models.DTOs
{
    public class AboutPrinciplesDataDto
    {
        public List<AboutPrinciplesDto>? about { get; set; }
    }
    public class AboutPrinciplesDto
    {
        public int id { get; set; }
        public string? about_principles { get; set; }
        public string? about_principles_details { get; set; }
        public string? about_house { get; set; }
        public string? about_house_details { get; set; }
        public string? about_condo { get; set; }
        public string? about_condo_details { get; set; }
        public string? about_img1 { get; set; }
        public string? about_img2 { get; set; }
        public string? about_img3 { get; set; }
    }
}
