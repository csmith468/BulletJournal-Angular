using API.Data.Interfaces;
using API.Data.Pagination;
using API.Models.Entities;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Repositories {
    public class MorningRepository : IChecklistRepository<MorningChecklist> {
        // private readonly DataContextDapper _contextDapper;
        private readonly DataContextEF _contextEF;
        private readonly IMapper _mapper;
        public MorningRepository(DataContextEF contextEF, IMapper mapper) {
            _contextEF = contextEF;
            _mapper = mapper;
        }

        public async Task<MorningChecklist> AddAsync(MorningChecklist morningChecklist) {
            _contextEF.MorningChecklists.Add(morningChecklist);
            var result = await _contextEF.SaveChangesAsync() > 0;
            if (!result) return null;
            return morningChecklist;
        }

        public async Task<bool> DateUsedAsync(DateOnly date, int userId) {
            return await _contextEF.MorningChecklists.AnyAsync(x => x.Date == date && x.UserID == userId);
        }

        public async Task<PagedList<MorningChecklist>> GetListAsync(int userId, PageParams pageParams) {
            var query = _contextEF.MorningChecklists   
                .Where(x => x.UserID == userId)
                .OrderByDescending(x => x.Date)
                .AsNoTracking();

            return await PagedList<MorningChecklist>.CreateAsync(query, pageParams.PageNumber, pageParams.PageSize);
        }

        public async Task<MorningChecklist> GetByIdAsync(int userId, int morningChecklistId) {
            return await _contextEF.MorningChecklists   
                .Where(x => x.UserID == userId)
                .Where(x => x.MorningChecklistID == morningChecklistId)
                .SingleOrDefaultAsync();
        }
    }
}