
using serviceApiWebAdminRealestate.Models.DTOs;
using serviceApiWebAdminRealestate.Repositories;

namespace serviceApiWebAdminRealestate.Services
{
    public interface IContactService
    {
        Task<ContactDataDto> GetAllContactAsync(); 
        Task<bool> UpdateContactAsync(UpdateContactDto updateContactsDto);
    }

    public class ContactService : IContactService
    {
        private readonly IContactRepository _contactRepository;

        public ContactService(IContactRepository contactRepository)
        {
            _contactRepository = contactRepository;
        }

        public async Task<ContactDataDto> GetAllContactAsync() 
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

        public async Task<bool> UpdateContactAsync(UpdateContactDto updateContactsDto)
        {
            const int targetId = 1;
            return await _contactRepository.UpdateContactAsync(targetId, updateContactsDto.tel,
                updateContactsDto.facebook,
                updateContactsDto.line,
                updateContactsDto.mail,
                updateContactsDto.location,
                updateContactsDto.company,
                updateContactsDto.img_company
                );
        }
    }
}