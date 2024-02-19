
using API.Data.Interfaces;
using API.Models.Entities;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

// static data that is un-related to any user or checklist type
namespace API.Data.Repositories {
    public class StaticRepository : IStaticRepository {
        // private readonly DataContextDapper _contextDapper;
        private readonly DataContextEF _contextEF;
        private readonly IMapper _mapper;
        public StaticRepository(DataContextEF contextEF, IMapper mapper) {
            _contextEF = contextEF;
            _mapper = mapper;
        }

        public async Task<IEnumerable<TimezoneLocation>> GetTimezoneLocationsAsync() {
            return await _contextEF.TimezoneLocations
                .OrderBy(t => t.timezoneLocationName)
                .ToListAsync();
        }

        public async Task<TimezoneLocation> GetTimezoneLocationByIDAsync(int id) {
            return await _contextEF.TimezoneLocations
                .Where(t => t.timezoneLocationID == id)
                .SingleOrDefaultAsync();
        }

        public async Task<bool> TimezoneExistsAsync(int id) {
            return await _contextEF.TimezoneLocations.AnyAsync(x => x.timezoneLocationID == id);
        }

        public async Task<IEnumerable<QuestionTypes>> GetQuestionTypesAsync() {
            return await _contextEF.QuestionTypes.ToListAsync();
        }

        public async Task<IEnumerable<QuestionTypes>> GetChartQuestionTypesAsync() {
            return await _contextEF.QuestionTypes.Where(q => q.includeInCharts == true).ToListAsync();
        }

        public async Task<IEnumerable<Tables>> GetTablesAsync() {
            return await _contextEF.Tables.OrderBy(x => x.displayName).ToListAsync();
        }
    }
}