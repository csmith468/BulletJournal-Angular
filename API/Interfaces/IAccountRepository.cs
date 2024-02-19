using API.Models.DTOs;
using API.Models.Entities;

namespace API.Data.Interfaces {
    public interface IAccountRepository {
        Task<AppUser> GetAppUserByEmailAsync(string email);
        Task<AppUser> GetAppUserByIdAsync(int id);
        Task<bool> EmailExistsAsync(string email);
        void UpdateUserAsync(AppUser user);
        Task<AppUserDto> RegisterUserAsync(AppUser user);
    }
}