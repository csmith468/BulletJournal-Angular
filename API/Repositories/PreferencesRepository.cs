using API.Data.Interfaces;
using API.Models.Tables.DTOs;
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
        public PreferencesRepository(DataContextEF contextEF, DataContextDapper contextDapper, IMapper mapper) {
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
                .FirstOrDefaultAsync();
        }

        public async Task<QuestionPreferences> GetQuestionPreferencesByIdAsync(int userId, int id) {
            return await _contextEF.QuestionPreferences
                .Where(x => x.userID == userId && x.questionPreferencesID == id)
                .FirstOrDefaultAsync();
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
                .FirstOrDefaultAsync();
        }

        public async Task<ChecklistTypePreferences> GetChecklistTypePreferencesByIdAsync(int userId, int id) {
            return await _contextEF.ChecklistTypePreferences   
                .Where(x => x.userID == userId && x.checklistTypePreferencesID == id)
                .FirstOrDefaultAsync();
        }

        public async Task<GeneralPreferencesDto> GetGeneralPreferencesAsync(int userId) {
            var prefs = await _contextEF.GeneralPreferences.Where(x => x.userID == userId).FirstOrDefaultAsync();
            return _mapper.Map<GeneralPreferences, GeneralPreferencesDto>(prefs);
        }

        public async Task<bool> UpdateGeneralPreferencesAsync(int userId, GeneralPreferencesDto prefsToUpdate) {
            var prefs = await _contextEF.GeneralPreferences.Where(x => x.userID == userId).FirstOrDefaultAsync();
            if (prefs == null) return false;

            // only update if there is a value to update to
            if (prefsToUpdate.showDeleteGuard != null) 
                prefs.showDeleteGuard = (bool)prefsToUpdate.showDeleteGuard;
            if (prefsToUpdate.showUnsavedChangesGuard != null)
                prefs.showUnsavedChangesGuard = (bool)prefsToUpdate.showUnsavedChangesGuard;
                
            return _contextEF.SaveChanges() > 0;
        }

        public async Task<bool> CreateAllPreferencesAsync(int userId) {
            var resultAddChecklistType = await CreateChecklistTypePreferencesAsync(userId);
            var resultAddQuestions = await CreateQuestionPreferencesAsync(userId);
            var resultAddPreferences = await CreateGeneralPreferencesAsync(userId);

            return resultAddChecklistType || resultAddQuestions || resultAddPreferences;
        }

        private async Task<bool> CreateChecklistTypePreferencesAsync(int userId) {
            string sql = @" EXEC app.sp_createUserChecklistTypePreferences
                        @UserId = " + userId.ToString();
            return await _contextDapper.ExecuteAsync(sql);
        }

        private async Task<bool> CreateQuestionPreferencesAsync(int userId) {
            string sql = @" EXEC app.sp_createUserQuestionPreferences
                        @UserId = " + userId.ToString();
            return await _contextDapper.ExecuteAsync(sql);
        }

        private async Task<bool> CreateGeneralPreferencesAsync(int userId) {
            string sql = @" EXEC app.sp_createUserGeneralPreferences
                        @UserId = " + userId.ToString();
            return await _contextDapper.ExecuteAsync(sql);
        }

    }
}