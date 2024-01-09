using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Interfaces;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController {
        private readonly DataContextEF _contextEF;

        public AccountController(IConfiguration config) { 
             _contextEF = new DataContextEF(config);  
        }

        [HttpPost("Register")]
        public async Task<ActionResult<AppUser>> Register(RegisterDto registerDto) {
            if (await UserExists(registerDto.Username)) return BadRequest("Username is taken.");
            
            using var hmac = new HMACSHA512();
            var user = new AppUser {
                Username = registerDto.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };

            // _contextEF.Users.Add(user);
            // await _uow.SaveChanges_EF();
            // result = await _contextEF.SaveChangesAsync();

            return user;
        }

        private async Task<bool> UserExists(string username) {
            return await _contextEF.AppUsers.AnyAsync(x => x.Username.ToLower() == username.ToLower());
        }
    }
}