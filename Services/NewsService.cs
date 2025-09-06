
using serviceApiRealestate.Models.DTOs;
using serviceApiRealestate.Repositories;

namespace serviceApiRealestate.Services
{
    public interface INewsService
    {
        Task<NewsDataDto> GetAllNewsAsync();
        Task<GetIdNewsDataDto> GetNewsByIdAsync(int id);
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
    }
}