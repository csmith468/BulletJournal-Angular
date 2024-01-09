using API.Data;
using API.Interfaces;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories {
    public class UserRepository : IUserRepository {
        private readonly DataContextDapper _contextDapper;
        private readonly DataContextEF _contextEF;
        public UserRepository(IConfiguration config) {
            _contextDapper = new DataContextDapper(config);
            _contextEF = new DataContextEF(config);
        }

        public async Task<AppUser> GetAppUserAsync(string username) {
            return await _contextEF.AppUsers   
                .Where(x => x.Username.ToLower() == username.ToLower())
                .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<AppUser>> GetAppUsersAsync() {
            return await _contextEF.AppUsers.ToListAsync();
        }

        public async Task<bool> UsernameExists(string username) {
            return await _contextEF.AppUsers.AnyAsync(x => x.Username.ToLower() == username.ToLower());
        }

        public async Task<bool> EmailExists(string email) {
            return await _contextEF.AppUsers.AnyAsync(x => x.Email.ToLower() == email.ToLower());
        }

        public async Task<bool> RegisterUser(AppUser user) {
            _contextEF.AppUsers.Add(user);
            return await _contextEF.SaveChangesAsync() > 0;
        }
        
    }
}