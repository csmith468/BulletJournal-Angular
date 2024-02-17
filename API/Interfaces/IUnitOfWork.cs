using API.Models.Entities;

namespace API.Data.Interfaces {
    public interface IUnitOfWork {
        IAccountRepository AccountRepository { get; }
        ISettingsRepository SettingsRepository { get; }
        IChecklistRepository<T> GetChecklistRepository<T>() where T : Checklist;
        Task<bool> Complete();
        bool HasChanges();
    }
}