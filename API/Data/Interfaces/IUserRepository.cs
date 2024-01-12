using API.Models.Entities;

namespace API.Data.Interfaces {
    public interface IUserRepository {
        Task<AppUser> GetAppUserByEmailAsync(string email);
        Task<AppUser> GetAppUserByIdAsync(int id);
        Task<IEnumerable<AppUser>> GetAppUsersAsync();
        Task<bool> EmailExists(string email);
        Task<bool> RegisterUser(AppUser user);
    }
}