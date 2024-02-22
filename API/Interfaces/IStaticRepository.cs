// static data that is un-related to any user or user data
using API.Models.Views.Entities;

namespace API.Data.Interfaces
{
    public interface IStaticRepository {
        Task<IEnumerable<TimezoneLocationView>> GetTimezoneLocationsAsync();
        Task<TimezoneLocationView> GetTimezoneLocationByIDAsync(int id);
        Task<bool> TimezoneExistsAsync(int id);

        Task<IEnumerable<QuestionKindView>> GetQuestionKindsAsync();
        Task<IEnumerable<QuestionKindView>> GetChartQuestionKindsAsync();
        Task<QuestionKindView> GetQuestionKindByIdAsync(int id);
    }
}