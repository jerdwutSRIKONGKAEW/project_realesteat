using Microsoft.EntityFrameworkCore;
using serviceApiWebAdminRealestate.Api;
using serviceApiWebAdminRealestate.Models.Domain;
using serviceApiWebAdminRealestate.Repositories;

namespace serviceApiWebAdminRealestate.Repositories
{
    public interface IContactRepository
    {
        Task<List<Contact>> GetAllAsync();
        Task<bool> UpdateContactAsync(int id,
             string tel,
             string facebook,
             string line,
             string mail,
             string location,
             string company,
             string img_company);
    }
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

    public async Task<bool> UpdateContactAsync(int id,
         string tel,
         string facebook,
         string line,
         string mail,
         string location,
         string company,
         string img_company)
    {
        var contact = await _context.contact.FirstOrDefaultAsync(x => x.id == id);
        if (contact == null)
        {
            return false;
        }
        contact.tel = tel;
        contact.facebook = facebook;
        contact.line = line;
        contact.mail = mail;
        contact.location = location;
        contact.company = company;
        contact.img_company = img_company;
        await _context.SaveChangesAsync();
        return true;
    }
}

