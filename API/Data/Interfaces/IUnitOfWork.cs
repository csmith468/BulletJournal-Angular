namespace API.Data.Interfaces {
    public interface IUnitOfWork {
        IUserRepository UserRepository { get; }
        ISleepRepository SleepRepository { get; }
        IChecklistRepository ChecklistRepository { get; }
        Task<bool> Complete();
        bool HasChanges();
    }
}