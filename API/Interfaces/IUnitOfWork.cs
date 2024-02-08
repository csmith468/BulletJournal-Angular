using API.Models.Entities;

namespace API.Data.Interfaces {
    public interface IUnitOfWork {
        IAccountRepository AccountRepository { get; }
        ISettingsRepository SettingsRepository { get; }
        IChecklistRepository ChecklistRepository { get; }
        Task<bool> Complete();
        bool HasChanges();
    }
}