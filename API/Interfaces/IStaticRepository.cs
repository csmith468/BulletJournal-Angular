using API.Models.Entities;

// static data that is un-related to any user or checklist type
namespace API.Data.Interfaces
{
    public interface IStaticRepository {
        Task<IEnumerable<TimezoneLocation>> GetTimezoneLocationsAsync();
        Task<TimezoneLocation> GetTimezoneLocationByIDAsync(int id);
        Task<bool> TimezoneExistsAsync(int id);
        
        Task<IEnumerable<QuestionTypes>> GetQuestionTypesAsync();
        Task<IEnumerable<QuestionTypes>> GetChartQuestionTypesAsync();
        Task<IEnumerable<Tables>> GetTablesAsync();
    }
}