using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.Models.DTOs;
using API.Data.Helpers;
using API.Data.Interfaces;
using API.Data.Repositories;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Models.Entities;
using API.Extensions;

namespace API.Controllers
{
    public class AccountController : BaseApiController {
        private readonly IUnitOfWork _uow;
        private readonly ITokenService _tokenService;

        public AccountController(IUnitOfWork uow, ITokenService tokenService) {
            _uow = uow;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<AppUserDto>> Register(RegisterDto registerDto) {
            if (await _uow.UserRepository.EmailExistsAsync(registerDto.Email)) 
                return BadRequest("Email is taken.");
            if (!await _uow.UserRepository.TimezoneExists(registerDto.TimezoneLocationID))
                return BadRequest("Invalid timezone.");
            
            using var hmac = new HMACSHA512();
            var user = new AppUser {
                Email = registerDto.Email.ToLower(),
                FirstName = HelperFunctions.StringTitleCase(registerDto.FirstName),
                LastName = HelperFunctions.StringTitleCase(registerDto.LastName),
                TimezoneLocationID = registerDto.TimezoneLocationID,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };

            var result = _uow.UserRepository.RegisterUserAsync(user);

            return new AppUserDto{
                UserID = result.Result.UserID,
                Email = result.Result.Email,
                FirstName = HelperFunctions.StringTitleCase(result.Result.FirstName),
                LastName = HelperFunctions.StringTitleCase(result.Result.LastName),
                TimezoneLocationID = result.Result.TimezoneLocationID,
                Token = _tokenService.CreateToken(user)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<AppUserDto>> Login(LoginDto loginDto) {
            var user = await _uow.UserRepository.GetAppUserByEmailAsync(loginDto.Email);

            if (user == null) return Unauthorized("Invalid email.");

            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
            for (int i = 0; i < computedHash.Length; i++) {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");
            }

            return new AppUserDto {
                UserID = user.UserID,
                Email = user.Email,
                FirstName = HelperFunctions.StringTitleCase(user.FirstName),
                LastName = HelperFunctions.StringTitleCase(user.LastName),
                TimezoneLocationID = user.TimezoneLocationID,
                Token = _tokenService.CreateToken(user)
            };
        }

        [HttpGet("timezones")]
        public async Task<ActionResult<IEnumerable<TimezoneLocation>>> GetTimezoneLocation() {
            return Ok(await _uow.UserRepository.GetTimezoneLocationsAsync());
        }

        [HttpGet("timezone/{id}")]
        public async Task<ActionResult<TimezoneLocation>> GetTimezoneById(int id) {
            return Ok(await _uow.UserRepository.GetTimezoneLocationByID(id));
        }
    }
}