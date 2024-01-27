using API.Models.Entities;

namespace API.Data.Interfaces {
    public interface IUnitOfWork {
        IUserRepository UserRepository { get; }
        // ISleepRepository SleepRepository { get; }
        // IChecklistRepository<MorningChecklist> MorningRepository { get; }
        IChecklistRepository<NightChecklist> NightRepository { get; }
        IChecklistRepository ChecklistRepository { get; }
        // IDailyRepository DailyRepository { get; }
        // IPhysicalRepository PhysicalRepository { get; }
        // IWellbeingRepository WellbeingRepository { get; }
        Task<bool> Complete();
        bool HasChanges();
    }
}