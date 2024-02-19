
using API.Data.Interfaces;
using API.Models.Entities;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

// static data that is un-related to any user or user data
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

        public async Task<IEnumerable<QuestionKinds>> GetQuestionKindsAsync() {
            return await _contextEF.QuestionKinds.ToListAsync();
        }

        public async Task<IEnumerable<QuestionKinds>> GetChartQuestionKindsAsync() {
            return await _contextEF.QuestionKinds.Where(q => q.includeInCharts == true).ToListAsync();
        }

        public async Task<QuestionKinds> GetQuestionKindByIdAsync(int id) {
            return await _contextEF.QuestionKinds.Where(q => q.questionKindID == id).FirstOrDefaultAsync();
        }
    }
}