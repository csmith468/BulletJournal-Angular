namespace API.Models.DTOs {
    public class AppUserDto {
        public int userID { get; set; }
        public string email { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public int timezoneLocationID { get; set; }
        public string token { get; set; }
    }
}