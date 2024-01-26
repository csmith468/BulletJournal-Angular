namespace API.Data.Interfaces {
    public interface IUnitOfWork {
        IUserRepository UserRepository { get; }
        ISleepRepository SleepRepository { get; }
        IMorningRepository MorningRepository { get; }
        INightRepository NightRepository { get; }
        Task<bool> Complete();
        bool HasChanges();
    }
}