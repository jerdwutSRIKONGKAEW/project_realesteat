using Microsoft.EntityFrameworkCore;
using serviceApiWebAdminRealestate.Handle;
using serviceApiWebAdminRealestate.Models.Domain;

namespace serviceApiWebAdminRealestate.Api;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions options) : base(options)
    {

    }

    public DbSet<UserAccounts> UserAccounts { get; set; }
    public DbSet<About> about { get; set; }
    public DbSet<Contact> contact { get; set; }
    public DbSet<Asset> asset { get; set; }
    public DbSet<Menu> menu { get; set; }
    public DbSet<News> news { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        _ = modelBuilder.Entity<UserAccounts>().HasData([
                new UserAccounts
                {
                    id = 1,
                    full_name = "Administrator",
                    username = "admin",
                    password = PasswordHashHandle.HashPassword("admin123")
                }
            ]);
    }
}
