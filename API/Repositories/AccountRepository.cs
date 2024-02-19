using System.Xml.Linq;
using API.Data.Helpers;
using API.Data.Interfaces;
using API.Models.DTOs;
using API.Models.Entities;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Repositories {
    public class AccountRepository : IAccountRepository {
        // private readonly DataContextDapper _contextDapper;
        private readonly DataContextEF _contextEF;
        private readonly IMapper _mapper;
        public AccountRepository(DataContextEF contextEF, IMapper mapper) {
            _contextEF = contextEF;
            _mapper = mapper;
        }

        public async Task<AppUser> GetAppUserByEmailAsync(string email) {
            return await _contextEF.AppUsers   
                .Where(x => x.email.ToLower() == email.ToLower())
                .SingleOrDefaultAsync();
        }
        
        public async Task<AppUser> GetAppUserByIdAsync(int id) {
            return await _contextEF.AppUsers   
                .Where(x => x.userID == id)
                .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<AppUser>> GetAppUsersAsync() {
            return await _contextEF.AppUsers.ToListAsync();
        }

        public async Task<bool> EmailExistsAsync(string email) {
            return await _contextEF.AppUsers.AnyAsync(x => x.email.ToLower() == email.ToLower());
        }

        public async Task<AppUserDto> RegisterUserAsync(AppUser user) {
            _contextEF.AppUsers.Add(user);
            var result = await _contextEF.SaveChangesAsync() > 0;
            if (!result) return null;

            return new AppUserDto{
                userID = user.userID,
                email = user.email,
                firstName = HelperFunctions.StringTitleCase(user.firstName),
                lastName = HelperFunctions.StringTitleCase(user.lastName),
                timezoneLocationID = user.timezoneLocationID
            };
        }

        public void Update(AppUser user) {
            _contextEF.Entry(user).State = EntityState.Modified;
        }

        public async Task<IEnumerable<TimezoneLocation>> GetTimezoneLocationsAsync() {
            return await _contextEF.TimezoneLocations
                .OrderBy(t => t.timezoneLocationName)
                .ToListAsync();
        }

        public async Task<TimezoneLocation> GetTimezoneLocationByID(int id) {
            return await _contextEF.TimezoneLocations
                .Where(t => t.timezoneLocationID == id)
                .SingleOrDefaultAsync();
        }

        public async Task<bool> TimezoneExists(int id) {
            return await _contextEF.TimezoneLocations.AnyAsync(x => x.timezoneLocationID == id);
        }
    }
}