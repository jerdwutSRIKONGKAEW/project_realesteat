using serviceApiWebAdminRealestate.Api;
using serviceApiWebAdminRealestate.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace serviceApiWebAdminRealestate.Repositories
{
    public interface IAboutRepository
    {
        Task<List<About>> GetAllAsync();
        Task<About?> GetByIdAsync(int id);
        Task<bool> UpdateAboutTextAsync(int id, string aboutText);
        Task<bool> UpdateAboutPrinciplesAsync(int id, 
            string aboutPrinciples,
            string aboutPrinciplesDetail,
            string aboutHouse,
            string aboutHouseDetail,
            string aboutCondo,
            string aboutCondoDetail,
            string aboutImg1,
            string aboutImg2,
            string aboutImg3);
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

        public async Task<About?> GetByIdAsync(int id)
        {
            return await _context.about.FirstOrDefaultAsync(x => x.id == id);
        }

        public async Task<bool> UpdateAboutTextAsync(int id, string aboutText)
        {
            var about = await _context.about.FirstOrDefaultAsync(x => x.id == id);
            if (about == null)
            {
                return false;
            }

            about.about_text = aboutText;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateAboutPrinciplesAsync(int id, 
            string aboutPrinciples,
            string aboutPrinciplesDetail,
            string aboutHouse,
            string aboutHouseDetail,
            string aboutCondo,
            string aboutCondoDetail,
            string aboutImg1,
            string aboutImg2,
            string aboutImg3)
        {
            var about = await _context.about.FirstOrDefaultAsync(x => x.id == id);
            if (about == null)
            {
                return false;
            }

            about.about_principles = aboutPrinciples;
            about.about_principles_details = aboutPrinciplesDetail;
            about.about_house = aboutHouse;
            about.about_house_details = aboutHouseDetail;
            about.about_condo = aboutCondo;
            about.about_condo_details = aboutCondoDetail;
            about.about_img1 = aboutImg1;
            about.about_img2 = aboutImg2;
            about.about_img3 = aboutImg3;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}