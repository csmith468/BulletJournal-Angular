using API.Models.Entities;

namespace API.Data.Interfaces {
    public interface IChecklistRepository {
        Task<MorningChecklist> AddMorningChecklistAsync(MorningChecklist morningChecklist);
        Task<NightChecklist> AddNightChecklistAsync(NightChecklist nightChecklist);
        Task<bool> MorningDateUsedAsync(DateOnly date, int userId);
        Task<bool> NightDateUsedAsync(DateOnly date, int userId);
        Task<IEnumerable<MorningChecklist>> GetMyMorningChecklistsAsync(int userId);
        Task<IEnumerable<NightChecklist>> GetMyNightChecklistsAsync(int userId);
        Task<MorningChecklist> GetMyMorningChecklistByIdAsync(int userId, int morningChecklistId);
        Task<NightChecklist> GetMyNightChecklistByIdAsync(int userId, int nightChecklistId);
    }
}