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
using AutoMapper;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [Authorize]
    public class SleepController : BaseApiController {
        private readonly IUnitOfWork _uow;
        private readonly DataContextEF _contextEF;
        private readonly IMapper _mapper;

        public SleepController(IConfiguration config, IUnitOfWork uow, IMapper mapper) {
            _uow = new UnitOfWork(config);
            _contextEF = new DataContextEF(config);
            _mapper = mapper;
        }

        [HttpPost("add")]
        public async Task<ActionResult<SleepRecord>> AddSleepRecord(SleepRecord sleepRecord) {
            sleepRecord.UserID = User.GetUserId();
            var result = await _uow.SleepRepository.AddSleep(sleepRecord);
            return Ok(result);
        }

        // [HttpPost("edit")]
        // public async Task<ActionResult<AppUserDto>> Login(LoginDto loginDto) {
        //     var user = await _contextEF.AppUsers
        //         .SingleOrDefaultAsync(x => x.Email.ToLower() == loginDto.Email.ToLower());

        //     if (user == null) return Unauthorized("Invalid email.");

        //     using var hmac = new HMACSHA512(user.PasswordSalt);
        //     var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
        //     for (int i = 0; i < computedHash.Length; i++) {
        //         if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");
        //     }

        //     return new AppUserDto {
        //         Email = user.Email,
        //         FirstName = HelperFunctions.StringTitleCase(user.FirstName),
        //         LastName = HelperFunctions.StringTitleCase(user.LastName),
        //         Token = _tokenService.CreateToken(user)
        //     };
        // }

        //remove
    }
}