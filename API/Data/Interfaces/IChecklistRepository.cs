using API.Models.Entities;

namespace API.Data.Interfaces {
    public interface IChecklistRepository {
        Task<MorningChecklist> AddMorningChecklist(MorningChecklist morningChecklist);
        Task<NightChecklist> AddNightChecklist(NightChecklist nightChecklist);
        // Task<SleepRecord>UpdateSleep(SleepRecord sleep);
    }
}