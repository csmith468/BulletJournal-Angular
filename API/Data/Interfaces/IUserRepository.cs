using API.Models.DTOs;
using API.Models.Entities;

namespace API.Data.Interfaces {
    public interface IUserRepository {
        Task<AppUser> GetAppUserByEmailAsync(string email);
        Task<AppUser> GetAppUserByIdAsync(int id);
        Task<IEnumerable<AppUser>> GetAppUsersAsync();
        Task<bool> EmailExistsAsync(string email);
        Task<AppUserDto> RegisterUserAsync(AppUser user);
    }
}