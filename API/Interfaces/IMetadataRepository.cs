// getting data about tables/questions for user but not data within them
using API.Models.Tables.Entities;
using API.Models.Views.DTOs;

namespace API.Data.Interfaces
{
    public interface IMetadataRepository {

        // Chart Questions
        Task<IEnumerable<ChartQuestionViewDto>> GetChartQuestionsAsync(int userId, string type);
        Task<IEnumerable<ChartQuestionViewDto>> GetChartQuestionsByKindAsync(int userId, string type, int kindId);

        // Checklist Questions
        Task<IEnumerable<ChecklistQuestionViewDto>> GetChecklistQuestionsAsync(int userId, string type);

        // Table Types for Layout
        Task<IEnumerable<TableTypeLayoutDto>> GetTableTypeLayoutAsync(int userId);

    }
}