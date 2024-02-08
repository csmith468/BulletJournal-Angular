using API.Models.Entities;

namespace API.Data.Interfaces {
    public interface ISettingsRepository {
        Task<IEnumerable<QuestionPreferences>> GetQuestionPreferencesAsync(int userId);
        Task<IEnumerable<QuestionPreferences>> GetQuestionPreferencesByTypeAsync(int userId, string type);
        Task<QuestionPreferences> GetQuestionPreferencesByIdAsync(int userId, int id);
        Task<IEnumerable<TablePreferences>> GetTablePreferencesAsync(int userId);
        Task<IEnumerable<TablePreferences>> GetTablePreferencesByTypeAsync(int userId, string type);
        Task<TablePreferences> GetTablePreferencesByIdAsync(int userId, int id);
        Task<IEnumerable<Tables>> GetTablesAsync();
    }
}