namespace serviceApiRealestate.Models.DTOs
{
    public class GetIdAssetDataDto
    {
        public List<GetIdAssetDto>? asset { get; set; }
    }
    public class GetIdAssetDto
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
        public string? asset_map { get; set; }
        public List<Img>? img { get; set; }
    }

    public class Img
    {
        public string? asset_img1 { get; set; }
        public string? asset_img2 { get; set; }
        public string? asset_img3 { get; set; }
        public string? asset_img4 { get; set; }
        public string? asset_img5 { get; set; }
        public string? asset_img6 { get; set; }
        public string? asset_img7 { get; set; }
        public string? asset_img8 { get; set; }
    }
}
