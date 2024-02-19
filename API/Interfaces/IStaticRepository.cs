// static data that is un-related to any user or user data
using API.Models.Tables.Entities;
using API.Models.Views.Entities;

namespace API.Data.Interfaces
{
    public interface IStaticRepository {
        Task<IEnumerable<TimezoneLocationView>> GetTimezoneLocationsAsync();
        Task<TimezoneLocationView> GetTimezoneLocationByIDAsync(int id);
        Task<bool> TimezoneExistsAsync(int id);

        Task<IEnumerable<QuestionKind>> GetQuestionKindsAsync();
        Task<IEnumerable<QuestionKind>> GetChartQuestionKindsAsync();
        Task<QuestionKind> GetQuestionKindByIdAsync(int id);
    }
}