using API.Data.Interfaces;
using API.Data.Pagination;
using API.Models.Entities;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Repositories {
    public class NightRepository : INightRepository {
        // private readonly DataContextDapper _contextDapper;
        private readonly DataContextEF _contextEF;
        private readonly IMapper _mapper;
        public NightRepository(DataContextEF contextEF, IMapper mapper) {
            _contextEF = contextEF;
            _mapper = mapper;
        }

        public async Task<NightChecklist> AddNightChecklistAsync(NightChecklist nightChecklist) {
            _contextEF.NightChecklists.Add(nightChecklist);
            var result = await _contextEF.SaveChangesAsync() > 0;
            if (!result) return null;
            return nightChecklist;
        }

        public async Task<bool> NightDateUsedAsync(DateOnly date, int userId) {
            return await _contextEF.NightChecklists.AnyAsync(x => x.Date == date && x.UserID == userId);
        }

        public async Task<PagedList<NightChecklist>> GetMyNightChecklistsAsync(int userId, PageParams pageParams) {
            var query = _contextEF.NightChecklists   
                .Where(x => x.UserID == userId)
                .OrderByDescending(x => x.Date)
                .AsNoTracking();

            return await PagedList<NightChecklist>.CreateAsync(query, pageParams.PageNumber, pageParams.PageSize);
        }

        public async Task<NightChecklist> GetMyNightChecklistByIdAsync(int userId, int nightChecklistId) {
            return await _contextEF.NightChecklists
                .Where(x => x.UserID == userId)
                .Where(x => x.NightChecklistID == nightChecklistId)
                .SingleOrDefaultAsync();
        }
    }
}