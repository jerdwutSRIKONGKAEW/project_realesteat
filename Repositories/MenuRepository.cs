using serviceApiWebAdminRealestate.Api;
using serviceApiWebAdminRealestate.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace serviceApiWebAdminRealestate.Repositories
{
    public interface IMenuRepository
    {
        Task<List<Menu>> GetAllAsync();
    }
    public class MenuRepository : IMenuRepository
    {
        private readonly AppDbContext _context;

        public MenuRepository(AppDbContext context)
        {
            _context = context;
        }
        

        public async Task<List<Menu>> GetAllAsync()
        {
            return await _context.menu.ToListAsync();
        }
    }
}
