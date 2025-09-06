using Microsoft.AspNetCore.Mvc;
using serviceApiRealestate.Services;

[ApiController]
[Route("api/[controller]")]
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
}