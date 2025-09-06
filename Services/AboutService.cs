
using serviceApiRealestate.Models.DTOs;
using serviceApiRealestate.Repositories;

namespace serviceApiRealestate.Services
{
    public interface IAboutService
    {
        Task<AboutDataDto> GetAllUsersAsync();
        Task<AboutPrinciplesDataDto> GetAllPrinciplessAsync();
    }

    public class AboutService : IAboutService
    {
        private readonly IAboutRepository _aboutRepository;

        public AboutService(IAboutRepository aboutRepository)
        {
            _aboutRepository = aboutRepository;
        }

        public async Task<AboutDataDto> GetAllUsersAsync() 
        {
            var abouts = await _aboutRepository.GetAllAsync();
            var aboutList = abouts.Select(u => new AboutDto
            {
                id = u.id,
                about_text = u.about_text
            }).ToList();

            return new AboutDataDto
            {
                about = aboutList
            };
        }

        public async Task<AboutPrinciplesDataDto> GetAllPrinciplessAsync()
        {
            var principles = await _aboutRepository.GetAllAsync();
            var principlesList = principles.Select(u => new AboutPrinciplesDto
            {
                id = u.id,
                about_principles = u.about_principles,
                about_principles_details = u.about_principles_details,
                about_house = u.about_house,
                about_house_details = u.about_house_details,
                about_condo = u.about_condo,
                about_condo_details = u.about_condo_details,
                about_img1 = u.about_img1,
                about_img2 = u.about_img2,
                about_img3 = u.about_img3
            }).ToList();

            return new AboutPrinciplesDataDto
            {
                about = principlesList
            };
        }
    }
}