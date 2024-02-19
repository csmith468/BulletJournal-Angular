// getting data about tables/questions for user but not data within them
using API.Models.Tables.Entities;
using API.Models.Views.DTOs;

namespace API.Data.Interfaces
{
    public interface IMetadataRepository {

        // Questions with Relevant Data for Each UI Page
        Task<IEnumerable<ChartQuestionViewDto>> GetChartQuestionsAsync(int userId, string type);
        Task<IEnumerable<ChartQuestionViewDto>> GetChartQuestionsByKindAsync(int userId, string type, int kindId);

        Task<IEnumerable<ChecklistQuestionViewDto>> GetChecklistQuestionsAsync(int userId, string type);

        Task<IEnumerable<TableQuestionViewDto>> GetTableQuestionsAsync(int userId, string type);

        
        // Table Types with Relevant Data for Each UI Page
        Task<IEnumerable<TableTypeLayoutDto>> GetTableTypeLayoutAsync(int userId);

    }
}