using API.Data.Pagination;
using API.Models.Entities;

namespace API.Data.Interfaces {
    public interface INightRepository {
        Task<NightChecklist> AddNightChecklistAsync(NightChecklist nightChecklist);
        Task<bool> NightDateUsedAsync(DateOnly date, int userId);
        Task<PagedList<NightChecklist>> GetMyNightChecklistsAsync(int userId, PageParams pageParams);
        Task<NightChecklist> GetMyNightChecklistByIdAsync(int userId, int nightChecklistId);
    }
}