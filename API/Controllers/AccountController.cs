using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Interfaces;
using API.Models;
using API.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController {
        private readonly IUnitOfWork _uow;
        private readonly DataContextEF _contextEF;

        public AccountController(IConfiguration config, IUnitOfWork uow) {
            _uow = new UnitOfWork(config);
            _contextEF = new DataContextEF(config);
        }

        [HttpPost("register")]
        public async Task<ActionResult<AppUser>> Register(RegisterDto registerDto) {
            if (await _uow.UserRepository.UsernameExists(registerDto.Username)) return BadRequest("Username is taken.");
            if (await _uow.UserRepository.EmailExists(registerDto.Email)) return BadRequest("Email is taken.");
            
            using var hmac = new HMACSHA512();
            var user = new AppUser {
                Username = registerDto.Username.ToLower(),
                Email = registerDto.Email.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };

            var result = _uow.UserRepository.RegisterUser(user);

            return user;
        }

        [HttpPost("login")]
        public async Task<ActionResult<AppUserDto>> Login(LoginDto loginDto) {
            var user = await _contextEF.AppUsers
                .SingleOrDefaultAsync(x => x.Username.ToLower() == loginDto.Username.ToLower());

            if (user == null) return Unauthorized("Invalid username.");

            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
            for (int i = 0; i < computedHash.Length; i++) {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");
            }

            return new AppUserDto {
                Username = user.Username,
                Email = user.Email
            };
        }
    }
}