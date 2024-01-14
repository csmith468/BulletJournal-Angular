using API.Data.Interfaces;
using API.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Repositories {
    public class ChecklistRepository : IChecklistRepository {
        private readonly DataContextDapper _contextDapper;
        private readonly DataContextEF _contextEF;
        public ChecklistRepository(IConfiguration config) {
            _contextDapper = new DataContextDapper(config);
            _contextEF = new DataContextEF(config);
        }

        public async Task<MorningChecklist> AddMorningChecklistAsync(MorningChecklist morningChecklist) {
            _contextEF.MorningChecklists.Add(morningChecklist);
            var result = await _contextEF.SaveChangesAsync() > 0;
            if (!result) return null;
            return morningChecklist;
        }

        public async Task<NightChecklist> AddNightChecklistAsync(NightChecklist nightChecklist) {
            _contextEF.NightChecklists.Add(nightChecklist);
            var result = await _contextEF.SaveChangesAsync() > 0;
            if (!result) return null;
            return nightChecklist;
        }

        public async Task<bool> MorningDateUsedAsync(DateOnly date, int userId) {
            return await _contextEF.MorningChecklists.AnyAsync(x => x.Date == date && x.UserID == userId);
        }
        public async Task<bool> NightDateUsedAsync(DateOnly date, int userId) {
            return await _contextEF.NightChecklists.AnyAsync(x => x.Date == date && x.UserID == userId);
        }

        public async Task<IEnumerable<MorningChecklist>> GetMyMorningChecklistsAsync(int userId) {
            return await _contextEF.MorningChecklists   
                .Where(x => x.UserID == userId)
                .ToListAsync();
        }

        public async Task<IEnumerable<NightChecklist>> GetMyNightChecklistsAsync(int userId) {
            return await _contextEF.NightChecklists   
                .Where(x => x.UserID == userId)
                .ToListAsync();
        }

        public async Task<MorningChecklist> GetMyMorningChecklistByIdAsync(int userId, int morningChecklistId) {
            return await _contextEF.MorningChecklists   
                .Where(x => x.UserID == userId)
                .Where(x => x.MorningChecklistID == morningChecklistId)
                .SingleOrDefaultAsync();
        }

        public async Task<NightChecklist> GetMyNightChecklistByIdAsync(int userId, int nightChecklistId) {
            return await _contextEF.NightChecklists
                .Where(x => x.UserID == userId)
                .Where(x => x.NightChecklistID == nightChecklistId)
                .SingleOrDefaultAsync();
        }
    }
}