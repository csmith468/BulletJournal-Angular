using API.Models.Entities;

namespace API.Data.Interfaces {
    public interface IChecklistRepository {
        Task<MorningChecklist> AddMorningChecklist(MorningChecklist morningChecklist);
        Task<NightChecklist> AddNightChecklist(NightChecklist nightChecklist);
        Task<bool> MorningDateUsed(DateOnly date, int userId);
        Task<bool> NightDateUsed(DateOnly date, int userId);
        
        // Task<SleepRecord>UpdateSleep(SleepRecord sleep);
    }
}