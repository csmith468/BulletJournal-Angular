using API.Data.Interfaces;
using API.Data.Pagination;
using API.Models.Entities;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Repositories {
    public class DailyRepository : IChecklistRepository<DailyChecklist>
    {
        // private readonly DataContextDapper _contextDapper;
        private readonly DataContextEF _contextEF;
        private readonly IMapper _mapper;
        public DailyRepository(DataContextEF contextEF, IMapper mapper) {
            _contextEF = contextEF;
            _mapper = mapper;
        }

        public async Task<DailyChecklist> AddAsync(DailyChecklist dailyChecklist) {
            _contextEF.DailyChecklists.Add(dailyChecklist);
            var result = await _contextEF.SaveChangesAsync() > 0;
            if (!result) return null;
            return dailyChecklist;
        }

        public async Task<bool> DateUsedAsync(DateOnly date, int userId) {
            return await _contextEF.DailyChecklists.AnyAsync(x => x.Date == date && x.UserID == userId);
        }

        public async Task<PagedList<DailyChecklist>> GetListAsync(int userId, PageParams pageParams) {
            var query = _contextEF.DailyChecklists   
                .Where(x => x.UserID == userId)
                .OrderByDescending(x => x.Date)
                .AsNoTracking();
            return await PagedList<DailyChecklist>.CreateAsync(query, pageParams.PageNumber, pageParams.PageSize);
        }

        public async Task<DailyChecklist> GetByIdAsync(int userId, int dailyChecklistId) {
            return await _contextEF.DailyChecklists   
                .Where(x => x.UserID == userId)
                .Where(x => x.DailyChecklistID == dailyChecklistId)
                .SingleOrDefaultAsync();
        }
    }
}