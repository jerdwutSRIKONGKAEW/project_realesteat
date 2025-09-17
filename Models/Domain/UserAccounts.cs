using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace serviceApiWebAdminRealestate.Models.Domain;
[Table("user_account")]
public class UserAccounts
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("id")]
    public int id { get; set; }
    [Column("full_name")]
    public string? full_name { get; set; }
    [Column("username")]
    public string? username { get; set; }
    [Column("password")]
    public string? password { get; set; }
}

