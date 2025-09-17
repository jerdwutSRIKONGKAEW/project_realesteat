using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using serviceApiWebAdminRealestate.Models.DTOs;
using serviceApiWebAdminRealestate.Services;

[ApiController]
[Route("api/[controller]")]
[Authorize]
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

    [HttpPut("update/{id:int}")]
    public async Task<IActionResult> UpdateNews(int id, [FromBody] UpdateNewsDto updateNewssDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var result = await _newsService.UpdateNewsAsync(id, updateNewssDto);
            if (result)
            {
                return Ok(new { message = "news text updated successfully" });
            }
            return NotFound(new { message = "not found" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred while updating", error = ex.Message });
        }
    }

    [HttpDelete("delete/{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            var result = await _newsService.DeleteNewsAsync(id);
            if (result)
            {
                return Ok(new { message = "deleted successfully" });
            }
            return NotFound(new { message = "not found" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred while deleting", error = ex.Message });
        }
    }

    [HttpPost("create")]
    public async Task<IActionResult> CreateNews([FromBody] CreateNewsDto createNewsDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var newsId = await _newsService.CreateNewsAsync(createNewsDto);
            return Ok(new { message = "created successfully" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred while creating news", error = ex.Message });
        }
    }
}