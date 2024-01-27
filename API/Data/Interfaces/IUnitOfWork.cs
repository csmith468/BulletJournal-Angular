using API.Models.Entities;

namespace API.Data.Interfaces {
    public interface IUnitOfWork {
        IUserRepository UserRepository { get; }
        IChecklistRepository ChecklistRepository { get; }
        Task<bool> Complete();
        bool HasChanges();
    }
}