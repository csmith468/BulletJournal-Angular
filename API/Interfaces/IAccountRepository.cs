using API.Models.DTOs;
using API.Models.Entities;

namespace API.Data.Interfaces {
    public interface IAccountRepository {
        Task<AppUser> GetAppUserByEmailAsync(string email);
        Task<AppUser> GetAppUserByIdAsync(int id);
        Task<IEnumerable<AppUser>> GetAppUsersAsync();
        Task<bool> EmailExistsAsync(string email);
        Task<AppUserDto> RegisterUserAsync(AppUser user);
        void Update(AppUser user);
        Task<IEnumerable<TimezoneLocation>> GetTimezoneLocationsAsync();
        Task<TimezoneLocation> GetTimezoneLocationByID(int id);
        Task<bool> TimezoneExists(int id);
    }
}