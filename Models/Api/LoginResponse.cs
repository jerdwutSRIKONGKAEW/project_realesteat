namespace serviceApiWebAdminRealestate.Models.Api
{
    public class LoginResponse
    {
        public string? username { get; set; }
        public string? access_token { get; set; }
        public int expires_in { get; set; }
    }
}
