namespace API.Models.Tables.Entities {
    public class AppUser : BaseEntity {
        public int userID { get; set; }
        public string email { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public byte[] passwordHash { get; set; }
        public byte[] passwordSalt { get; set; } 
        public int timezoneLocationID { get; set; }
    }
}