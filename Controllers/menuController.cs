using Microsoft.AspNetCore.Mvc;
using serviceApiRealestate.Services;

[ApiController]
[Route("api/[controller]")]
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