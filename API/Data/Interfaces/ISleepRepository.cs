using API.Models.Entities;

namespace API.Data.Interfaces {
    public interface ISleepRepository {
        Task<SleepRecord> AddSleep(SleepRecord sleep);
        // Task<SleepRecord>UpdateSleep(SleepRecord sleep);
    }
}