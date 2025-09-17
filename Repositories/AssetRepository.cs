using serviceApiWebAdminRealestate.Api;
using serviceApiWebAdminRealestate.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace serviceApiWebAdminRealestate.Repositories
{
    public interface IAssetRepository
    {
        Task<List<Asset>> GetAllAsync(string? typeasset);
        Task<List<Asset>> GetByIdAsync(int id);
        Task<bool> UpdateAssetAsync(int id,
            string assetName,
            string assetType,
            string assetAddress,
            decimal assetSalePrice,
            decimal assetRentPrice,
            int assetRoomBed,
            int assetRoomBath,
            string assetArea,
            string assetContact,
            string assetText,
            int ownerNo,
            string assetMap,
            string assetImg1,
            string assetImg2,
            string assetImg3,
            string assetImg4,
            string assetImg5,
            string assetImg6,
            string assetImg7,
            string assetImg8);
        Task<bool> DeleteAssetAsync(int id);
        Task<int> CreateAssetAsync(
            string assetName,
            string assetType,
            string assetAddress,
            decimal assetSalePrice,
            decimal assetRentPrice,
            int assetRoomBed,
            int assetRoomBath,
            string assetArea,
            string assetContact,
            string assetText,
            int ownerNo,
            string assetMap,
            string assetImg1,
            string assetImg2,
            string assetImg3,
            string assetImg4,
            string assetImg5,
            string assetImg6,
            string assetImg7,
            string assetImg8);
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

        public async Task<bool> UpdateAssetAsync(int id,
            string assetName,
            string assetType,
            string assetAddress,
            decimal assetSalePrice,
            decimal assetRentPrice,
            int assetRoomBed,
            int assetRoomBath,
            string assetArea,
            string assetContact,
            string assetText,
            int ownerNo,
            string assetMap,
            string assetImg1,
            string assetImg2,
            string assetImg3,
            string assetImg4,
            string assetImg5,
            string assetImg6,
            string assetImg7,
            string assetImg8)
        {
            var asset = await _context.asset.FirstOrDefaultAsync(x => x.asset_no == id);
            if (asset == null)
            {
                return false;
            }

            asset.asset_name = assetName;
            asset.asset_type = assetType;
            asset.asset_address = assetAddress;
            asset.asset_sale_price = assetSalePrice;
            asset.asset_rent_price = assetRentPrice;
            asset.asset_room_bed = assetRoomBed;
            asset.asset_room_bath = assetRoomBath;
            asset.asset_area = assetArea;
            asset.asset_contact = assetContact;
            asset.asset_text = assetText;
            asset.owner_no = ownerNo;
            asset.asset_map = assetMap;
            asset.asset_img1 = assetImg1;
            asset.asset_img2 = assetImg2;
            asset.asset_img3 = assetImg3;
            asset.asset_img4 = assetImg4;
            asset.asset_img5 = assetImg5;
            asset.asset_img6 = assetImg6;
            asset.asset_img7 = assetImg7;
            asset.asset_img8 = assetImg8;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAssetAsync(int id)
        {
            var asset = await _context.asset.FirstOrDefaultAsync(x => x.asset_no == id);
            if (asset == null)
            {
                return false; // ไม่พบข้อมูลที่ต้องการลบ
            }

            _context.asset.Remove(asset);
            await _context.SaveChangesAsync();
            return true; // ลบสำเร็จ
        }

        public async Task<int> CreateAssetAsync(
            string assetName,
            string assetType,
            string assetAddress,
            decimal assetSalePrice,
            decimal assetRentPrice,
            int assetRoomBed,
            int assetRoomBath,
            string assetArea,
            string assetContact,
            string assetText,
            int ownerNo,
            string assetMap,
            string assetImg1,
            string assetImg2,
            string assetImg3,
            string assetImg4,
            string assetImg5,
            string assetImg6,
            string assetImg7,
            string assetImg8)
        {
            try
            {
                var asset = new Asset
                {

                    asset_name = assetName,
                    asset_type = assetType,
                    asset_address = assetAddress,
                    asset_sale_price = assetSalePrice,
                    asset_rent_price = assetRentPrice,
                    asset_room_bed = assetRoomBed,
                    asset_room_bath = assetRoomBath,
                    asset_area = assetArea,
                    asset_contact = assetContact,
                    asset_text = assetText,
                    owner_no = ownerNo,
                    asset_map = assetMap,
                    asset_img1 = assetImg1,
                    asset_img2 = assetImg2,
                    asset_img3 = assetImg3,
                    asset_img4 = assetImg4,
                    asset_img5 = assetImg5,
                    asset_img6 = assetImg6,
                    asset_img7 = assetImg7,
                    asset_img8 = assetImg8
                };

                _context.asset.Add(asset);
                await _context.SaveChangesAsync();

                return asset.asset_no;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error creating asset: {ex.Message}. Inner: {ex.InnerException?.Message}", ex);
            }
        }
    }
}
