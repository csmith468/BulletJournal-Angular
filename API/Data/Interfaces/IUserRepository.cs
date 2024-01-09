using API.Models;

namespace API.Interfaces {
    public interface IUserRepository {
        Task<AppUser> GetAppUserAsync(string username);
        Task<IEnumerable<AppUser>> GetAppUsersAsync();
        Task<bool> UsernameExists(string username);
        Task<bool> EmailExists(string email);
        Task<bool> RegisterUser(AppUser user);
    }
}