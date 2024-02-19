// everything is related to user preferences for questions/tables
using API.Models.Tables.Entities;

namespace API.Data.Interfaces
{
    public interface IPreferencesRepository {
        Task<IEnumerable<QuestionPreferences>> GetQuestionPreferencesAsync(int userId);
        Task<IEnumerable<QuestionPreferences>> GetQuestionPreferencesByTypeAsync(int userId, string type);
        Task<QuestionPreferences> GetQuestionPreferencesByIdAsync(int userId, int id);

        Task<IEnumerable<TablePreferences>> GetTablePreferencesAsync(int userId);
        Task<IEnumerable<TablePreferences>> GetTablePreferencesByTypeAsync(int userId, string type);
        Task<TablePreferences> GetTablePreferencesByIdAsync(int userId, int id);
        
        Task<bool> CreateTablePreferencesAsync(int userId);
        Task<bool> CreateQuestionPreferencesAsync(int userId);
    }
}