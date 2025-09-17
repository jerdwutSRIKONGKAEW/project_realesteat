using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using serviceApiWebAdminRealestate.Models.DTOs;
using serviceApiWebAdminRealestate.Services;

[ApiController]
[Route("api/[controller]")]
[Authorize]
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

    [HttpPut("update-about")]
    public async Task<IActionResult> UpdateAboutText([FromBody] UpdateAboutDto updateAboutDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var result = await _aboutService.UpdateAboutTextAsync(updateAboutDto);
            if (result)
            {
                return Ok(new { message = "About text updated successfully" });
            }
            return NotFound(new { message = "About record with id 1 not found" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred while updating", error = ex.Message });
        }
    }

    [HttpPut("update-principles")]
    public async Task<IActionResult> UpdateAboutPrinciplesAsync([FromBody] UpdateAboutPrinciplesDto updateAboutPrinciplesDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var result = await _aboutService.UpdateAboutPrinciplesAsync(updateAboutPrinciplesDto);
            if (result)
            {
                return Ok(new { message = "About text updated successfully" });
            }
            return NotFound(new { message = "About record with id 1 not found" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred while updating", error = ex.Message });
        }
    }
}