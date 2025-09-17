using System.ComponentModel.DataAnnotations;
namespace serviceApiWebAdminRealestate.Models.Domain;
public class Menu
{
    [Key]
    public int id_menu { get; set; }
    public string? menu_name { get; set; }
    public string? menu_path { get; set; }

}

