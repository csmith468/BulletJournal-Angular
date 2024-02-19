using API.Models.DTOs;
using API.Models.Entities;
using API.Models.Views;

// getting data about tables/questions for user but not data within them
namespace API.Data.Interfaces
{
    public interface IMetadataRepository {
        Task<IEnumerable<QuestionSetDto>> GetQuestionSetAsync(int userId, string type);
        Task<IEnumerable<string>> GetInvisibleTablesAsync(int userId);

        Task<IEnumerable<ChartQuestionsView>> GetChartQuestionsAsync(int userId);
        Task<IEnumerable<ChartQuestionsView>> GetChartQuestionsByTypeAsync(int userId, string type);
        Task<IEnumerable<ChartQuestionsView>> GetChartQuestionsByKindIdAsync(int userId, int kindId);
        Task<IEnumerable<ChartQuestionsView>> GetChartQuestionsByTypeAndKindIdAsync(int userId, string type, int kindId);
        Task<IEnumerable<Tables>> GetTablesAsync();
    }
}