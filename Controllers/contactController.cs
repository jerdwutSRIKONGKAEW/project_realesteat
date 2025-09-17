using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using serviceApiWebAdminRealestate.Models.DTOs;
using serviceApiWebAdminRealestate.Services;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class contactController : ControllerBase
{
    private readonly IContactService _contactService;

    public contactController(IContactService contactService)
    {
        _contactService = contactService;
    }

    [HttpGet]
    public async Task<IActionResult> GetContact()
    {
        var contacts = await _contactService.GetAllContactAsync();
        return Ok(contacts);
    }

    [HttpPut("update")]
    public async Task<IActionResult> UpdateContact([FromBody] UpdateContactDto updateContactsDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var result = await _contactService.UpdateContactAsync(updateContactsDto);
            if (result)
            {
                return Ok(new { message = "contact text updated successfully" });
            }
            return NotFound(new { message = "not found" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred while updating", error = ex.Message });
        }
    }
}