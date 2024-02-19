
using API.Data.Interfaces;
using API.Models.Tables.Entities;
using API.Models.Views.Entities;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

// static data that is un-related to any user or user data
namespace API.Data.Repositories
{
    public class StaticRepository : IStaticRepository {
        // private readonly DataContextDapper _contextDapper;
        private readonly DataContextEF _contextEF;
        private readonly IMapper _mapper;
        public StaticRepository(DataContextEF contextEF, IMapper mapper) {
            _contextEF = contextEF;
            _mapper = mapper;
        }

        public async Task<IEnumerable<TimezoneLocationView>> GetTimezoneLocationsAsync() {
            return await _contextEF.TimezoneLocationsView
                .OrderBy(t => t.timezoneLocationName)
                .ToListAsync();
        }

        public async Task<TimezoneLocationView> GetTimezoneLocationByIDAsync(int id) {
            return await _contextEF.TimezoneLocationsView
                .Where(t => t.timezoneLocationID == id)
                .SingleOrDefaultAsync();
        }

        public async Task<bool> TimezoneExistsAsync(int id) {
            return await _contextEF.TimezoneLocationsView.AnyAsync(x => x.timezoneLocationID == id);
        }

        public async Task<IEnumerable<QuestionKind>> GetQuestionKindsAsync() {
            return await _contextEF.QuestionKinds.ToListAsync();
        }

        public async Task<IEnumerable<QuestionKind>> GetChartQuestionKindsAsync() {
            return await _contextEF.QuestionKinds.Where(q => q.includeInCharts == true).ToListAsync();
        }

        public async Task<QuestionKind> GetQuestionKindByIdAsync(int id) {
            return await _contextEF.QuestionKinds.Where(q => q.questionKindID == id).FirstOrDefaultAsync();
        }
    }
}