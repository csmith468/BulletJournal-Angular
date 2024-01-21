using API.Data.Interfaces;
using API.Data.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using API.Models.Entities;
using AutoMapper;
using API.Models.DTOs;
using API.Extensions;

namespace API.Controllers
{
    [Authorize] 
    public class UsersController : BaseApiController {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public UsersController(IUnitOfWork uow, IMapper mapper) {
            _uow = uow;
            _mapper = mapper;
        }

        // [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUserDto>>> GetUsers() {
            var users = await _uow.UserRepository.GetAppUsersAsync();
            var usersToReturn = _mapper.Map<IEnumerable<AppUserDto>>(users);
            return Ok(usersToReturn);
        }

        [HttpGet("email/{email}")]
        public async Task<ActionResult<AppUserDto>> GetUserByEmail(string email) {
            var user = await _uow.UserRepository.GetAppUserByEmailAsync(email);
            return _mapper.Map<AppUserDto>(user);
        }

        [HttpGet("id/{id}")]
        public async Task<ActionResult<AppUserDto>> GetUserById(int id) {
            var user = await _uow.UserRepository.GetAppUserByIdAsync(id);
            return _mapper.Map<AppUserDto>(user);
        }

        [HttpPut("update")]
        public async Task<ActionResult> UpdateUser(AppUserUpdateDto appUserUpdateDto) {
            var user = await _uow.UserRepository.GetAppUserByIdAsync(User.GetUserId());
            if (user == null) return NotFound();

            _mapper.Map(appUserUpdateDto, user);
            if (await _uow.Complete()) return NoContent();

            return BadRequest("Failed to update user.");
            
        }
    }
}