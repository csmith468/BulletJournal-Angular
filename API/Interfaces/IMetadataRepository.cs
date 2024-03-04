// getting data about checklist types/questions for user but not data within them
using API.Models.Tables.Entities;
using API.Models.Views.DTOs;
using API.Models.Views.Entities;

namespace API.Data.Interfaces
{
    public interface IMetadataRepository {
        Task<IEnumerable<QuestionPreferencesView>> GetVisibleQuestionsAsync(int userId, string type, bool chartQuestion, int? kindId);
        // Task<IEnumerable<QuestionPreferencesView>> GetVisibleQuestionsByKindAsync(int userId, string type, int kindId, bool chartQuestions);

        Task<IEnumerable<ChecklistTypePreferencesView>> GetVisibleChecklistTypeAsync(int userID);

        Task<IEnumerable<CompletedChecklists>> GetCompletedChecklistsPerDay(int userId);
    }
}