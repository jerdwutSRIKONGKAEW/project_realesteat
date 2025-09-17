using serviceApiWebAdminRealestate.Models.DTOs;
using serviceApiWebAdminRealestate.Repositories;
namespace serviceApiWebAdminRealestate.Services
{
    public interface IAssetService
    {
        Task<AssetDataDto> GetTypeAssetAsync(string? typeasset);
        Task<GetIdAssetDataDto> GetAssetByIdAsync(int id);
        Task<bool> UpdateAssetAsync(int id, UpdateAssetDto updateAssetDto);
        Task<bool> DeleteAssetAsync(int id);
        Task<int> CreateAssetAsync(CreateAssetDto createAssetDto);
    }
    public class AssetService : IAssetService
    {
        private readonly IAssetRepository _assetRepository;
        public AssetService(IAssetRepository assetRepository)
        {
            _assetRepository = assetRepository;
        }
        public async Task<AssetDataDto> GetTypeAssetAsync(string? typeasset)
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

        public async Task<bool> UpdateAssetAsync(int id, UpdateAssetDto updateAssetDto)
        {
            return await _assetRepository.UpdateAssetAsync(
                id,
                updateAssetDto.asset_name,
                updateAssetDto.asset_type,
                updateAssetDto.asset_address,
                updateAssetDto.asset_sale_price ?? 0,
                updateAssetDto.asset_rent_price ?? 0,
                updateAssetDto.asset_room_bed ?? 0,
                updateAssetDto.asset_room_bath ?? 0,
                updateAssetDto.asset_area,
                updateAssetDto.asset_contact,
                updateAssetDto.asset_text,
                updateAssetDto.owner_no ?? 0,
                updateAssetDto.asset_map,
                updateAssetDto.asset_img1,
                updateAssetDto.asset_img2,
                updateAssetDto.asset_img3,
                updateAssetDto.asset_img4,
                updateAssetDto.asset_img5,
                updateAssetDto.asset_img6,
                updateAssetDto.asset_img7,
                updateAssetDto.asset_img8
                );
        }

        public async Task<bool> DeleteAssetAsync(int id)
        {
            return await _assetRepository.DeleteAssetAsync(id);
        }

        public async Task<int> CreateAssetAsync(CreateAssetDto createAssetDto)
        {
            return await _assetRepository.CreateAssetAsync(
                createAssetDto.asset_name,
                createAssetDto.asset_type,
                createAssetDto.asset_address,
                createAssetDto.asset_sale_price ?? 0,
                createAssetDto.asset_rent_price ?? 0,
                createAssetDto.asset_room_bed ?? 0,
                createAssetDto.asset_room_bath ?? 0,
                createAssetDto.asset_area,
                createAssetDto.asset_contact,
                createAssetDto.asset_text,
                createAssetDto.owner_no ?? 0,
                createAssetDto.asset_map,
                createAssetDto.asset_img1,
                createAssetDto.asset_img2,
                createAssetDto.asset_img3,
                createAssetDto.asset_img4,
                createAssetDto.asset_img5,
                createAssetDto.asset_img6,
                createAssetDto.asset_img7,
                createAssetDto.asset_img8
            );
        }
    }
}