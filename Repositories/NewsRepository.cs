using serviceApiWebAdminRealestate.Api;
using serviceApiWebAdminRealestate.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace serviceApiWebAdminRealestate.Repositories
{
    public interface INewsRepository
    {
        Task<List<News>> GetAllAsync();
        Task<List<News>> GetByIdAsync(int id);
        Task<bool> UpdateNewsAsync(int id,
            string newsTitle,
            string newsDetail,
            string newsImage);
        Task<bool> DeleteNewsAsync(int id);
        Task<int> CreateNewsAsync(string newsTitle, string newsDetail, string newsImage);
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

        public async Task<bool> UpdateNewsAsync(int id,
            string newsTitle,
            string newsDetail,
            string newsImage)
        {
            var about = await _context.news.FirstOrDefaultAsync(x => x.news_no == id);
            if (about == null)
            {
                return false;
            }

            about.news_title = newsTitle;
            about.news_detail = newsDetail;
            about.news_image = newsImage;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteNewsAsync(int id)
        {
            var news = await _context.news.FirstOrDefaultAsync(x => x.news_no == id);
            if (news == null)
            {
                return false; // ไม่พบข้อมูลที่ต้องการลบ
            }

            _context.news.Remove(news);
            await _context.SaveChangesAsync();
            return true; // ลบสำเร็จ
        }

        public async Task<int> CreateNewsAsync(string newsTitle, string newsDetail, string newsImage)
        {
            try
            {
                var news = new News
                {
                   
                    news_title = newsTitle ,
                    news_detail = newsDetail ,
                    news_image = newsImage 
                };

                _context.news.Add(news);
                await _context.SaveChangesAsync();

                return news.news_no; 
            }
            catch (Exception ex)
            {
                throw new Exception($"Error creating news: {ex.Message}. Inner: {ex.InnerException?.Message}", ex);
            }
        }
    }
}
