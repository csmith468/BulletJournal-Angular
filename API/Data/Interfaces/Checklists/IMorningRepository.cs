using API.Data.Pagination;
using API.Models.Entities;

namespace API.Data.Interfaces {
    public interface IMorningRepository {
        Task<MorningChecklist> AddMorningChecklistAsync(MorningChecklist morningChecklist);
        Task<bool> MorningDateUsedAsync(DateOnly date, int userId);
        Task<PagedList<MorningChecklist>> GetMyMorningChecklistsAsync(int userId, PageParams pageParams);
        Task<MorningChecklist> GetMyMorningChecklistByIdAsync(int userId, int morningChecklistId);
    }
}