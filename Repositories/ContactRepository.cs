using serviceApiRealestate.Api;
using serviceApiRealestate.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace serviceApiRealestate.Repositories
{
    public interface IContactRepository
    {
        Task<List<Contact>> GetAllAsync();
    }
    public class ContactRepository : IContactRepository
    {
        private readonly AppDbContext _context;

        public ContactRepository(AppDbContext context)
        {
            _context = context;
        }
        

        public async Task<List<Contact>> GetAllAsync()
        {
            return await _context.contact.ToListAsync();
        }
    }
}
