using serviceApiRealestate.Api;
using serviceApiRealestate.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace serviceApiRealestate.Repositories
{
    public interface IAssetRepository
    {
        Task<List<Asset>> GetAllAsync(string? typeasset);
        Task<List<Asset>> GetByIdAsync(int id);
    }
    public class AssetRepository : IAssetRepository
    {
        private readonly AppDbContext _context;

        public AssetRepository(AppDbContext context)
        {
            _context = context;
        }
        

        public async Task<List<Asset>> GetAllAsync(string? typeasset)
        {
            if (typeasset == "ALL")
            {
                return await _context.asset.ToListAsync();
            }
            else
            {
                return await _context.asset
                .Where(a => a.asset_type == typeasset)
                .ToListAsync();
            }
        }

        /*getId Asset*/

        public async Task<List<Asset>> GetByIdAsync(int id)
        {
            return await _context.asset
                .Where(a => a.asset_no == id)
                .ToListAsync();
        }
    }
}
