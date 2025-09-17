using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using serviceApiWebAdminRealestate.Api;
using serviceApiWebAdminRealestate.Handle;
using serviceApiWebAdminRealestate.Models.Domain;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class UserAccountController : ControllerBase
{
    private readonly AppDbContext _dbContext;

    public UserAccountController(AppDbContext dbContext) =>
        _dbContext = dbContext;

    [HttpGet]
    public async Task<List<UserAccounts>> Get()
    {
        return await _dbContext.UserAccounts.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<UserAccounts?> GetById(int id)
    {
        return await _dbContext.UserAccounts.FirstOrDefaultAsync(x => x.id == id);
    }

    [HttpPost]
    public async Task<ActionResult> Create([FromBody] UserAccounts userAccount)
    {
        if (string.IsNullOrWhiteSpace(userAccount.full_name) ||
            string.IsNullOrWhiteSpace(userAccount.username) ||
            string.IsNullOrWhiteSpace(userAccount.password))
        {
            return BadRequest("Invalid Request");
        }

        userAccount.password = PasswordHashHandle.HashPassword(userAccount.password);
        await _dbContext.UserAccounts.AddAsync(userAccount);
        await _dbContext.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = userAccount.id }, userAccount);
    }

    [HttpPut]
    public async Task<ActionResult> Update([FromBody] UserAccounts userAccount)
    {
        if (userAccount.id == 0 ||
            string.IsNullOrWhiteSpace(userAccount.full_name) ||
            string.IsNullOrWhiteSpace(userAccount.username) ||
            string.IsNullOrWhiteSpace(userAccount.password))
        {
            return BadRequest("Invalid Request");
        }

        userAccount.password = PasswordHashHandle.HashPassword(userAccount.password);
        _dbContext.UserAccounts.Update(userAccount);
        await _dbContext.SaveChangesAsync();

        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(int id)
    {
        var userAccount = await GetById(id);
        if (userAccount is null)
            return NotFound();

        _dbContext.UserAccounts.Remove(userAccount);
        await _dbContext.SaveChangesAsync();

        return Ok();
    }


}
