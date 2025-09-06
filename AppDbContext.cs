using Microsoft.EntityFrameworkCore;
using serviceApiRealestate.Models.Domain;

namespace serviceApiRealestate.Api;
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options){ }

    public DbSet<About> about { get; set; }
    public DbSet<Contact> contact { get; set; }
    public DbSet<Asset> asset { get; set; }
    public DbSet<Menu> menu { get; set; }
    public DbSet<News> news { get; set; }

}