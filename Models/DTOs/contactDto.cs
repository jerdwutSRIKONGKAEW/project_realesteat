namespace serviceApiRealestate.Models.DTOs
{
    public class ContactDataDto
    {
        public List<ContactDto>? contact { get; set; }
    }
    public class ContactDto
    {
        public int id { get; set; }
        public string? tel { get; set; }
        public string? facebook { get; set; }
        public string? line { get; set; }
        public string? mail { get; set; }
        public string? location { get; set; }
        public string? company { get; set; }
        public string? img_company { get; set; }
    }
}
