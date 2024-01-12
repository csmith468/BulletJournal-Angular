using API.Models.Entities;

namespace API.Data.Interfaces {
    public interface IChecklistRepository {
        Task<MorningChecklist> AddMorningChecklist(MorningChecklist morningChecklist);
        // Task<SleepRecord>UpdateSleep(SleepRecord sleep);
    }
}