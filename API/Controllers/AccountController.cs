using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Data.Helpers;
using API.Data.Interfaces;
using API.Models;
using API.Data.Repositories;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController {
        private readonly IUnitOfWork _uow;
        private readonly DataContextEF _contextEF;
        private readonly ITokenService _tokenService;

        public AccountController(IConfiguration config, IUnitOfWork uow, ITokenService tokenService) {
            _uow = new UnitOfWork(config);
            _contextEF = new DataContextEF(config);
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<AppUserDto>> Register(RegisterDto registerDto) {
            if (await _uow.UserRepository.EmailExists(registerDto.Email)) return BadRequest("Email is taken.");
            
            using var hmac = new HMACSHA512();
            var user = new AppUser {
                Email = registerDto.Email.ToLower(),
                FirstName = HelperFunctions.StringTitleCase(registerDto.FirstName),
                LastName = HelperFunctions.StringTitleCase(registerDto.LastName),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };

            var result = _uow.UserRepository.RegisterUser(user);

            return new AppUserDto{
                Email = user.Email,
                FirstName = HelperFunctions.StringTitleCase(registerDto.FirstName),
                LastName = HelperFunctions.StringTitleCase(registerDto.LastName),
                Token = _tokenService.CreateToken(user)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<AppUserDto>> Login(LoginDto loginDto) {
            var user = await _contextEF.AppUsers
                .SingleOrDefaultAsync(x => x.Email.ToLower() == loginDto.Email.ToLower());

            if (user == null) return Unauthorized("Invalid email.");

            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
            for (int i = 0; i < computedHash.Length; i++) {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");
            }

            return new AppUserDto {
                Email = user.Email,
                FirstName = HelperFunctions.StringTitleCase(user.FirstName),
                LastName = HelperFunctions.StringTitleCase(user.LastName),
                Token = _tokenService.CreateToken(user)
            };
        }
    }
}