using Microsoft.AspNetCore.Mvc;
using serviceApiRealestate.Services;

[ApiController]
[Route("api/[controller]")]
public class aboutController : ControllerBase
{
    private readonly  IAboutService _aboutService;

    public aboutController(IAboutService aboutService)
    {
        _aboutService = aboutService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAbout()
    {
        var abouts = await _aboutService.GetAllUsersAsync();
        return Ok(abouts);
    }

    [HttpGet("principles")]
    public async Task<IActionResult> GetPrinciples()
    {
        var principles = await _aboutService.GetAllPrinciplessAsync();
        return Ok(principles);
    }
}