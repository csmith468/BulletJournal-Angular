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

        public AccountController(IConfiguration config, IUnitOfWork uow) {
            _uow = new UnitOfWork(config);
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


    }
}