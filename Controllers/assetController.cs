using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using serviceApiWebAdminRealestate.Models.DTOs;
using serviceApiWebAdminRealestate.Services;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class assetController : ControllerBase
{
    private readonly IAssetService _assetService;

    public assetController(IAssetService assetService)
    {
        _assetService = assetService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAsset(string? typeasset = "ALL")
    {
        var assets = await _assetService.GetTypeAssetAsync(typeasset);
        return Ok(assets);
    }

    /*[HttpGet("{typeasset}")]
    public async Task<IActionResult> GetTypeAsset(string? typeasset)
    {
        var assets = await _assetService.GetTypeAssetAsync(typeasset);
        return Ok(assets);
    }

    [HttpGet("detail/{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
       
            var assets = await _assetService.GetAssetByIdAsync(id);
            return Ok(assets);

    }*/

    [HttpPut("update/{id:int}")]
    public async Task<IActionResult> UpdateAsset(int id, [FromBody] UpdateAssetDto updateNewssDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var result = await _assetService.UpdateAssetAsync(id, updateNewssDto);
            if (result)
            {
                return Ok(new { message = "asset text updated successfully" });
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
            var result = await _assetService.DeleteAssetAsync(id);
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
    public async Task<IActionResult> CreateNews([FromBody] CreateAssetDto createAssetDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var newsId = await _assetService.CreateAssetAsync(createAssetDto);
            return Ok(new { message = "created successfully" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred while creating news", error = ex.Message });
        }
    }
}