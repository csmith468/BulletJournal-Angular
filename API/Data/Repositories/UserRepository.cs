using System.Xml.Linq;
using API.Data.Helpers;
using API.Data.Interfaces;
using API.Models.DTOs;
using API.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Repositories {
    public class UserRepository : IUserRepository {
        private readonly DataContextDapper _contextDapper;
        private readonly DataContextEF _contextEF;
        public UserRepository(IConfiguration config) {
            _contextDapper = new DataContextDapper(config);
            _contextEF = new DataContextEF(config);
        }

        public async Task<AppUser> GetAppUserByEmailAsync(string email) {
            return await _contextEF.AppUsers   
                .Where(x => x.Email.ToLower() == email.ToLower())
                .SingleOrDefaultAsync();
        }
        
        public async Task<AppUser> GetAppUserByIdAsync(int id) {
            return await _contextEF.AppUsers   
                .Where(x => x.UserID == id)
                .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<AppUser>> GetAppUsersAsync() {
            return await _contextEF.AppUsers.ToListAsync();
        }

        public async Task<bool> EmailExistsAsync(string email) {
            return await _contextEF.AppUsers.AnyAsync(x => x.Email.ToLower() == email.ToLower());
        }

        public async Task<AppUserDto> RegisterUserAsync(AppUser user) {
            _contextEF.AppUsers.Add(user);
            var result = await _contextEF.SaveChangesAsync() > 0;
            if (!result) return null;

            return new AppUserDto{
                UserID = user.UserID,
                Email = user.Email,
                FirstName = HelperFunctions.StringTitleCase(user.FirstName),
                LastName = HelperFunctions.StringTitleCase(user.LastName)
            };
        }

        public async Task<IEnumerable<TimezoneLocation>> GetTimezoneLocationsAsync() {
            return await _contextEF.TimezoneLocations
                .OrderBy(t => t.TimezoneLocationName)
                .ToListAsync();
        }
        
    }
}