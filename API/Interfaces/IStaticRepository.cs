using API.Models.Entities;

// static data that is un-related to any user or user data
namespace API.Data.Interfaces
{
    public interface IStaticRepository {
        Task<IEnumerable<TimezoneLocation>> GetTimezoneLocationsAsync();
        Task<TimezoneLocation> GetTimezoneLocationByIDAsync(int id);
        Task<bool> TimezoneExistsAsync(int id);

        Task<IEnumerable<QuestionKinds>> GetQuestionKindsAsync();
        Task<IEnumerable<QuestionKinds>> GetChartQuestionKindsAsync();
        Task<QuestionKinds> GetQuestionKindByIdAsync(int id);
    }
}