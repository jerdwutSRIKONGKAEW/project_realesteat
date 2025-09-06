using serviceApiRealestate.Api;
using serviceApiRealestate.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace serviceApiRealestate.Repositories
{
    public interface INewsRepository
    {
        Task<List<News>> GetAllAsync();
        Task<List<News>> GetByIdAsync(int id);
    }
    public class NewsRepository : INewsRepository
    {
        private readonly AppDbContext _context;

        public NewsRepository(AppDbContext context)
        {
            _context = context;
        }
        

        public async Task<List<News>> GetAllAsync()
        {
            return await _context.news.ToListAsync();
        }

        public async Task<List<News>> GetByIdAsync(int id)
        {
            return await _context.news
                .Where(a => a.news_no == id)
                .ToListAsync();
        }
    }
}
