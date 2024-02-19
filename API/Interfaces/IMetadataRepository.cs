using API.Models.DTOs;

// getting data about tables/questions for user but not data within them
namespace API.Data.Interfaces
{
    public interface IMetadataRepository {
        Task<IEnumerable<QuestionSetDto>> GetQuestionSetAsync(int userId, string type);
        Task<IEnumerable<string>> GetInvisibleTablesAsync(int userId);
    }
}