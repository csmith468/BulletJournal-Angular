// everything is related to user preferences for questions/tables
using API.Models.Tables.Entities;
using API.Models.Views.Entities;

namespace API.Data.Interfaces
{
    public interface IPreferencesRepository {
        Task<IEnumerable<QuestionPreferencesView>> GetQuestionPreferencesViewAsync(int userId);
        Task<IEnumerable<QuestionPreferencesView>> GetQuestionPreferencesViewByTypeAsync(int userId, string type);
        Task<QuestionPreferencesView> GetQuestionPreferencesViewByIdAsync(int userId, int id);
        Task<QuestionPreferences> GetQuestionPreferencesByIdAsync(int userId, int id);

        Task<IEnumerable<ChecklistTypePreferencesView>> GetChecklistTypePreferencesViewAsync(int userId);
        Task<IEnumerable<ChecklistTypePreferencesView>> GetChecklistTypePreferencesViewByTypeAsync(int userId, string type);
        Task<ChecklistTypePreferencesView> GetChecklistTypePreferencesViewByIdAsync(int userId, int id);
        Task<ChecklistTypePreferences> GetChecklistTypePreferencesByIdAsync(int userId, int id);
        
        Task<bool> CreateChecklistTypePreferencesAsync(int userId);
        Task<bool> CreateQuestionPreferencesAsync(int userId);
    }
}