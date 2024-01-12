using API.Data.Interfaces;
using API.Data.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using API.Models.Entities;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController {
        private readonly IUnitOfWork _uow;

        public UsersController(IConfiguration config, IUnitOfWork uow) {
            _uow = new UnitOfWork(config);
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers() {
            var users = await _uow.UserRepository.GetAppUsersAsync();
            return Ok(users);
        }

        [HttpGet("{email}")]
        public async Task<ActionResult<AppUser>> GetUser(string email) {
            return await _uow.UserRepository.GetAppUserAsync(email);
        }
    }
}