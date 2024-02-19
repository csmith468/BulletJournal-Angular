using API.Models.DTOs;
using API.Models.Entities;
using API.Models.Views;

// getting data about tables/questions for user but not data within them
namespace API.Data.Interfaces
{
    public interface IMetadataRepository {
        Task<IEnumerable<string>> GetInvisibleTablesAsync(int userId);
        Task<IEnumerable<Tables>> GetTablesAsync();

        // Chart Questions
        Task<IEnumerable<ChartQuestionsViewDto>> GetChartQuestionsAsync(int userId, string type);
        Task<IEnumerable<ChartQuestionsViewDto>> GetChartQuestionsByKindAsync(int userId, string type, int kindId);

        // Checklist Questions
        Task<IEnumerable<ChecklistQuestionsViewDto>> GetChecklistQuestionsAsync(int userId, string type);

    }
}