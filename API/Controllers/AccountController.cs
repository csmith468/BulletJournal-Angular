using System.Security.Cryptography;
using System.Text;
using API.Models.DTOs;
using API.Data.Helpers;
using API.Data.Interfaces;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using API.Models.Entities;
using API.Extensions;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    public class AccountController : BaseApiController {
        private readonly IUnitOfWork _uow;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;

        public AccountController(IUnitOfWork uow, ITokenService tokenService, IMapper mapper) {
            _uow = uow;
            _tokenService = tokenService;
            _mapper = mapper;
        }

        [HttpPost("register")]
        public async Task<ActionResult<AppUserDto>> Register(RegisterDto registerDto) {
            if (await _uow.AccountRepository.EmailExistsAsync(registerDto.email)) 
                return BadRequest("Email is taken.");
            if (!await _uow.StaticRepository.TimezoneExistsAsync(registerDto.timezoneLocationID))
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

            var resultAddTables = await _uow.PreferencesRepository.CreateTablePreferencesAsync(result.Result.userID);
            var resultAddQuestions = await _uow.PreferencesRepository.CreateQuestionPreferencesAsync(result.Result.userID);

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

        [Authorize]
        [HttpPut("update")]
        public async Task<ActionResult> UpdateUser(AppUserUpdateDto appUserUpdateDto) {
            var user = await _uow.AccountRepository.GetAppUserByIdAsync(User.GetUserId());
            if (user == null) return NotFound();

            _mapper.Map(appUserUpdateDto, user);
            if (await _uow.Complete()) return NoContent();

            return BadRequest("Failed to update user.");
        }
    }
}