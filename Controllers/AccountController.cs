using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using serviceApiWebAdminRealestate.Models.Api;
using serviceApiWebAdminRealestate.Services;

namespace serviceApiWebAdminRealestate.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AccountController : ControllerBase
{
    private readonly JwtService _jwtService;
    public AccountController(JwtService jwtService) =>
        _jwtService = jwtService;

    [AllowAnonymous]
    [HttpPost("Login")]
    public async Task<ActionResult<LoginResponse>> Login(LoginRequest request)
    {
        var result = await _jwtService.Authenticate(request);
        if (result is null)
            return Unauthorized();

        return result;
    }
}

