using Microsoft.AspNetCore.Mvc;
using serviceApiRealestate.Services;

[ApiController]
[Route("api/[controller]")]
public class newsController : ControllerBase
{
    private readonly  INewsService _newsService;

    public newsController(INewsService newsService)
    {
        _newsService = newsService;
    }

    [HttpGet]
    public async Task<IActionResult> GetNews()
    {
        var news = await _newsService.GetAllNewsAsync();
        return Ok(news);
    }

    [HttpGet("detail/{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {

        var news = await _newsService.GetNewsByIdAsync(id);
        return Ok(news);

    }
}