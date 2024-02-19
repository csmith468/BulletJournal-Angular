using System.ComponentModel.DataAnnotations;

namespace API.Models.Tables.DTOs {

    public class RegisterDto {
        [Required]
        public string email { get; set; }
        [Required]
        public string password { get; set; }
        [Required]
        public string firstName { get; set; }
        [Required]
        public string lastName { get; set; }
        [Required]
        public int timezoneLocationID { get; set; }
    }
}