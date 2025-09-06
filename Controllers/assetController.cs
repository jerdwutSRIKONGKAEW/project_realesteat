using Microsoft.AspNetCore.Mvc;
using serviceApiRealestate.Services;

[ApiController]
[Route("api/[controller]")]
public class assetController : ControllerBase
{
    private readonly IAssetService _assetService;

    public assetController(IAssetService assetService)
    {
        _assetService = assetService;
    }

    [HttpGet("{typeasset}")]
    public async Task<IActionResult> GetAsset(string? typeasset)
    {
        var assets = await _assetService.GetAllAssetAsync(typeasset);
        return Ok(assets);
    }

    [HttpGet("detail/{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
       
            var assets = await _assetService.GetAssetByIdAsync(id);
            return Ok(assets);

    }
}