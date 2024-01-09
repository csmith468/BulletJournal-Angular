using API.Models;

namespace API.Interfaces {
    public interface IUserRepository {
        Task<AppUser> GetAppUserAsync(string username);
        Task<IEnumerable<AppUser>> GetAppUsersAsync();
    }
}