
using serviceApiRealestate.Models.DTOs;
using serviceApiRealestate.Repositories;

namespace serviceApiRealestate.Services
{
    public interface IContactService
    {
        Task<ContactDataDto> GetAllContactAsync(); // เปลี่ยนจาก List<AboutDto> เป็น AboutDataDto
    }

    public class ContactService : IContactService
    {
        private readonly IContactRepository _contactRepository;

        public ContactService(IContactRepository contactRepository)
        {
            _contactRepository = contactRepository;
        }

        public async Task<ContactDataDto> GetAllContactAsync() // เปลี่ยนจาก List<AboutDto> เป็น AboutDataDto
        {
            var contacts = await _contactRepository.GetAllAsync();
            var contactList = contacts.Select(u => new ContactDto
            {
                id = u.id,
                tel = u.tel,
                facebook = u.facebook,
                line = u.line,
                mail = u.mail,
                location = u.location,
                company = u.company,
                img_company = u.img_company
            }).ToList();

            return new ContactDataDto
            {
                contact = contactList
            };
        }
    }
}