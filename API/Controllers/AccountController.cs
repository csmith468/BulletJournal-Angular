using System.Security.Cryptography;
using System.Text;
using API.Models.DTOs;
using API.Data.Helpers;
using API.Data.Interfaces;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using API.Models.Entities;

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
            if (await _uow.AccountRepository.EmailExistsAsync(registerDto.email)) 
                return BadRequest("Email is taken.");
            if (!await _uow.AccountRepository.TimezoneExists(registerDto.timezoneLocationID))
                return BadRequest("Invalid timezone.");
            
            using var hmac = new HMACSHA512();
            var user = new AppUser {
                email = registerDto.email.ToLower(),
                firstName = HelperFunctions.StringTitleCase(registerDto.firstName),
                lastName = HelperFunctions.StringTitleCase(registerDto.lastName),
                timezoneLocationID = registerDto.timezoneLocationID,
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.password)),
                passwordSalt = hmac.Key
            };

            var result = _uow.AccountRepository.RegisterUserAsync(user);
            if (result == null) return BadRequest("Failed to register user.");

            var resultAddTables = await _uow.SettingsRepository.CreateTablePreferencesAsync(result.Result.userID);
            var resultAddQuestions = await _uow.SettingsRepository.CreateQuestionPreferencesAsync(result.Result.userID);

            if (!resultAddTables || !resultAddQuestions) return BadRequest("Failed to register user.");

            return new AppUserDto{
                userID = result.Result.userID,
                email = result.Result.email,
                firstName = HelperFunctions.StringTitleCase(result.Result.firstName),
                lastName = HelperFunctions.StringTitleCase(result.Result.lastName),
                timezoneLocationID = result.Result.timezoneLocationID,
                token = _tokenService.CreateToken(user)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<AppUserDto>> Login(LoginDto loginDto) {
            var user = await _uow.AccountRepository.GetAppUserByEmailAsync(loginDto.email);

            if (user == null) return Unauthorized("Invalid email.");

            using var hmac = new HMACSHA512(user.passwordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.password));
            for (int i = 0; i < computedHash.Length; i++) {
                if (computedHash[i] != user.passwordHash[i]) return Unauthorized("Invalid password");
            }

            return new AppUserDto {
                userID = user.userID,
                email = user.email,
                firstName = HelperFunctions.StringTitleCase(user.firstName),
                lastName = HelperFunctions.StringTitleCase(user.lastName),
                timezoneLocationID = user.timezoneLocationID,
                token = _tokenService.CreateToken(user)
            };
        }

        [HttpGet("timezones")]
        public async Task<ActionResult<IEnumerable<TimezoneLocation>>> GetTimezoneLocation() {
            return Ok(await _uow.AccountRepository.GetTimezoneLocationsAsync());
        }

        [HttpGet("timezone/{id}")]
        public async Task<ActionResult<TimezoneLocation>> GetTimezoneById(int id) {
            return Ok(await _uow.AccountRepository.GetTimezoneLocationByID(id));
        }
    }
}