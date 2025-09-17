using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using serviceApiWebAdminRealestate.Services;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class menuController : ControllerBase
{
    private readonly IMenuService _menuService;

    public menuController(IMenuService menuService)
    {
        _menuService = menuService;
    }

    [HttpGet]
    public async Task<IActionResult> GetMenu()
    {
        var menus = await _menuService.GetAllMenuAsync();
        return Ok(menus);
    }
}