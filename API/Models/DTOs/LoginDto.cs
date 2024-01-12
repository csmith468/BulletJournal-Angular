using System.ComponentModel.DataAnnotations;

namespace API.Models.DTOs {

    public class LoginDto {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}