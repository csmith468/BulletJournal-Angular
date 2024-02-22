using API.Data.Interfaces;
using API.Models.Tables.Entities;
using API.Models.Views.Entities;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Repositories
{
    public class PreferencesRepository : IPreferencesRepository {
        private readonly DataContextDapper _contextDapper;
        private readonly DataContextEF _contextEF;
        private readonly IMapper _mapper;
        public PreferencesRepository(DataContextEF contextEF, IMapper mapper, DataContextDapper contextDapper) {
            _contextEF = contextEF;
            _mapper = mapper;
            _contextDapper = contextDapper;
        }

        public async Task<IEnumerable<QuestionPreferencesView>> GetQuestionPreferencesViewAsync(int userId) {
            return await _contextEF.QuestionPreferencesView
                .Where(x => x.userID == userId)
                .OrderBy(x => x.questionOrder)
                .ToListAsync();
        }

        public async Task<IEnumerable<QuestionPreferencesView>> GetQuestionPreferencesViewByTypeAsync(int userId, string type) {
            return await _contextEF.QuestionPreferencesView   
                .Where(x => x.userID == userId && x.checklistTypeName == type)
                .OrderBy(x => x.questionOrder)
                .ToListAsync();
        }

        public async Task<QuestionPreferencesView> GetQuestionPreferencesViewByIdAsync(int userId, int id) {
            return await _contextEF.QuestionPreferencesView   
                .Where(x => x.userID == userId && x.questionPreferencesID == id)
                .SingleOrDefaultAsync();
        }

        public async Task<QuestionPreferences> GetQuestionPreferencesByIdAsync(int userId, int id) {
            return await _contextEF.QuestionPreferences
                .Where(x => x.userID == userId && x.questionPreferencesID == id)
                .SingleOrDefaultAsync();
        }


        public async Task<IEnumerable<ChecklistTypePreferencesView>> GetChecklistTypePreferencesViewAsync(int userId) {
            return await _contextEF.ChecklistTypePreferencesView   
                .Where(x => x.userID == userId)
                .OrderBy(x => x.defaultOrder)
                .ToListAsync();
        }

        public async Task<IEnumerable<ChecklistTypePreferencesView>> GetChecklistTypePreferencesViewByTypeAsync(int userId, string type) {
            return await _contextEF.ChecklistTypePreferencesView   
                .Where(x => x.userID == userId)
                .OrderBy(x => x.defaultOrder)
                .ToListAsync();
        }

        public async Task<ChecklistTypePreferencesView> GetChecklistTypePreferencesViewByIdAsync(int userId, int id) {
            return await _contextEF.ChecklistTypePreferencesView   
                .Where(x => x.userID == userId && x.checklistTypePreferencesID == id)
                .SingleOrDefaultAsync();
        }

        public async Task<ChecklistTypePreferences> GetChecklistTypePreferencesByIdAsync(int userId, int id) {
            return await _contextEF.ChecklistTypePreferences   
                .Where(x => x.userID == userId && x.checklistTypePreferencesID == id)
                .SingleOrDefaultAsync();

        }

        public async Task<bool> CreateChecklistTypePreferencesAsync(int userId) {
            string sql = @" EXEC app.sp_createUserChecklistTypePreferences
                        @UserId = " + userId.ToString();
            return await _contextDapper.ExecuteAsync(sql);
        }

        public async Task<bool> CreateQuestionPreferencesAsync(int userId) {
            string sql = @" EXEC app.sp_createUserQuestionPreferences
                        @UserId = " + userId.ToString();
            return await _contextDapper.ExecuteAsync(sql);
        }

    }
}