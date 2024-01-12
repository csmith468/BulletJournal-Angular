using System.ComponentModel.DataAnnotations;

namespace API.Models.DTOs {

    public class AppUserDto {
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Token { get; set; }
    }
}