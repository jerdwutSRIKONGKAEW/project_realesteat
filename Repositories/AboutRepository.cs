using serviceApiRealestate.Api;
using serviceApiRealestate.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace serviceApiRealestate.Repositories
{
    public interface IAboutRepository
    {
        Task<List<About>> GetAllAsync();
    }
    public class AboutRepository : IAboutRepository
    {
        private readonly AppDbContext _context;

        public AboutRepository(AppDbContext context)
        {
            _context = context;
        }
        

        public async Task<List<About>> GetAllAsync()
        {
            return await _context.about.ToListAsync();
        }
    }
}
