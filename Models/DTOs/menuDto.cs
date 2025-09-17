namespace serviceApiWebAdminRealestate.Models.DTOs
{
    public class MenuDataDto
    {
        public List<MenuDto>? menu { get; set; }
    }
    public class MenuDto
    {
        public int id_menu { get; set; }
        public string? menu_name { get; set; }
        public string? menu_path { get; set; }
    }
}

