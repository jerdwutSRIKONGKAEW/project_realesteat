
using serviceApiWebAdminRealestate.Models.DTOs;
using serviceApiWebAdminRealestate.Repositories;

namespace serviceApiWebAdminRealestate.Services
{
    public interface INewsService
    {
        Task<NewsDataDto> GetAllNewsAsync();
        Task<GetIdNewsDataDto> GetNewsByIdAsync(int id);
        Task<bool> UpdateNewsAsync(int id, UpdateNewsDto updateNewssDto);
        Task<bool> DeleteNewsAsync(int id);
        Task<int> CreateNewsAsync(CreateNewsDto createNewsDto);
    }

    public class NewsService : INewsService
    {
        private readonly INewsRepository _newsRepository;

        public NewsService(INewsRepository newsRepository)
        {
            _newsRepository = newsRepository;
        }

        public async Task<NewsDataDto> GetAllNewsAsync() 
        {
            var news = await _newsRepository.GetAllAsync();
            var newsList = news.Select(u => new NewsDto
            {
                news_no = u.news_no,
                news_title = u.news_title,
                news_detail = u.news_detail,
                news_image = u.news_image
            }).ToList();

            return new NewsDataDto
            {
                news = newsList
            };
        }

        public async Task<GetIdNewsDataDto> GetNewsByIdAsync(int id)
        {
            var news = await _newsRepository.GetByIdAsync(id);
            var newsList = news.Select(u => new GetIdNewsDto
            {
                news_no = u.news_no,
                news_title = u.news_title,
                news_detail = u.news_detail,
                news_image = u.news_image

            }).ToList();
            return new GetIdNewsDataDto
            {
                news = newsList
            };
        }

        public async Task<bool> UpdateNewsAsync(int id, UpdateNewsDto updateNewssDto)
        {
            return await _newsRepository.UpdateNewsAsync(
                id,
                updateNewssDto.news_title,
                updateNewssDto.news_detail,
                updateNewssDto.news_image
                );
        }

        public async Task<bool> DeleteNewsAsync(int id)
        {
            return await _newsRepository.DeleteNewsAsync(id);
        }

        public async Task<int> CreateNewsAsync(CreateNewsDto createNewsDto)
        {
            return await _newsRepository.CreateNewsAsync(
                createNewsDto.news_title,
                createNewsDto.news_detail,
                createNewsDto.news_image
            );
        }
    }
}