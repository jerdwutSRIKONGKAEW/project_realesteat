namespace serviceApiWebAdminRealestate.Models.DTOs
{
    public class AssetDataDto
    {
        public List<AssetDto>? asset { get; set; }
    }
    public class AssetDto
    {
        public int asset_no { get; set; }
        public string? asset_name { get; set; }
        public string? asset_type { get; set; }
        public string? asset_address { get; set; }
        public decimal? asset_sale_price { get; set; }
        public decimal? asset_rent_price { get; set; }
        public int? asset_room_bed { get; set; }
        public int? asset_room_bath { get; set; }
        public string? asset_area { get; set; }
        public string? asset_contact { get; set; }
        public string? asset_text { get; set; }
        public int? owner_no { get; set; }
        public string? asset_img { get; set; }
    }
}
