using API.Data;
using API.Interfaces;
using API.Models;
using API.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class UserController : BaseApiController {
        private readonly IUnitOfWork _uow;

        public UserController(IConfiguration config, IUnitOfWork uow) {
            _uow = new UnitOfWork(config);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers() {
            var users = await _uow.UserRepository.GetAppUsersAsync();
            return Ok(users);
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<AppUser>> GetUser(string username) {
            return await _uow.UserRepository.GetAppUserAsync(username);
        }
    }
}