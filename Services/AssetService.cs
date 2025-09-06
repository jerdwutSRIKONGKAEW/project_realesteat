using serviceApiRealestate.Models.DTOs;
using serviceApiRealestate.Repositories;
namespace serviceApiRealestate.Services
{
    public interface IAssetService
    {
        Task<AssetDataDto> GetAllAssetAsync(string? typeasset);
        Task<GetIdAssetDataDto> GetAssetByIdAsync(int id);
    }
    public class AssetService : IAssetService
    {
        private readonly IAssetRepository _assetRepository;
        public AssetService(IAssetRepository assetRepository)
        {
            _assetRepository = assetRepository;
        }
        public async Task<AssetDataDto> GetAllAssetAsync(string? typeasset)
        {
            var assets = await _assetRepository.GetAllAsync(typeasset);
            var assetList = assets.Select(u => new AssetDto
            {
                asset_no = u.asset_no,
                asset_name = u.asset_name,
                asset_type = u.asset_type,
                asset_address = u.asset_address,
                asset_sale_price = u.asset_sale_price,
                asset_rent_price = u.asset_rent_price,
                asset_room_bed = u.asset_room_bed,
                asset_room_bath = u.asset_room_bath,
                asset_area = u.asset_area,
                asset_contact = u.asset_contact,
                asset_text = u.asset_text,
                owner_no = u.owner_no,
                asset_img = u.asset_img1,
            }).ToList();
            return new AssetDataDto
            {
                asset = assetList
            };
        }

        public async Task<GetIdAssetDataDto> GetAssetByIdAsync(int id)
        {
            var assets = await _assetRepository.GetByIdAsync(id);
            var assetList = assets.Select(u => new GetIdAssetDto
            {
                asset_no = u.asset_no,
                asset_name = u.asset_name,
                asset_type = u.asset_type,
                asset_address = u.asset_address,
                asset_sale_price = u.asset_sale_price,
                asset_rent_price = u.asset_rent_price,
                asset_room_bed = u.asset_room_bed,
                asset_room_bath = u.asset_room_bath,
                asset_area = u.asset_area,
                asset_contact = u.asset_contact,
                asset_text = u.asset_text,
                owner_no = u.owner_no,
                asset_map = u.asset_map,
                img = new List<Img>
                {
                    new Img
                    {
                        asset_img1 = u.asset_img1,
                        asset_img2 = u.asset_img2,
                        asset_img3 = u.asset_img3,
                        asset_img4 = u.asset_img4,
                        asset_img5 = u.asset_img5,
                        asset_img6 = u.asset_img6,
                        asset_img7 = u.asset_img7,
                        asset_img8 = u.asset_img8
                    }
                }
            }).ToList();
            return new GetIdAssetDataDto
            {
                asset = assetList
            };

        }
    }
}