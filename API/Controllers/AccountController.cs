using API.Data;

namespace API.Controllers
{
    public class AccountController : BaseApiController {
        private readonly DataContextEF _contextEF;

        public AccountController(DataContextEF contextEF) {
            _contextEF = contextEF;
        }

        // [HttpPost("Register")]
        // public async Task<ActionResult<AppUser>> Register(RegisterDto registerDto) {
            
        //     using var hmac = new HMACSHA512();
        //     var user = new AppUser {
        //         Username = registerDto.Username.ToLower(),
        //         PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
        //         PasswordSalt = hmac.Key
        //     };

        //     _contextEF.Users.Add(user);
        //     await _contextEF.SaveChangesAsync();

        // }
    }
}