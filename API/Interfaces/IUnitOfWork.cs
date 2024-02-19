using API.Models.Tables.Entities;

namespace API.Data.Interfaces
{
    public interface IUnitOfWork {
        IAccountRepository AccountRepository { get; }
        IChecklistRepository<T> GetChecklistRepository<T>() where T : Checklist;
        IMetadataRepository MetadataRepository { get; }
        IPreferencesRepository PreferencesRepository { get; }
        IStaticRepository StaticRepository { get; }
        Task<bool> Complete();
        bool HasChanges();
    }
}