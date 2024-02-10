using API.Data.Pagination;
using API.Models.Entities;

namespace API.Data.Interfaces {
    public interface IChecklistRepository {
        Task<T> AddAsync<T>(T item) where T : Checklist;
        Task<bool> DateUsedAsync<T>(DateOnly date, int userId) where T : Checklist;
        Task<PagedList<T>> GetListAsync<T>(int userId, PageParams pageParams) where T : Checklist;
        Task<T> GetByIdAsync<T>(int userId, int itemID) where T : Checklist;
        void DeleteChecklist<T>(T checklist) where T : Checklist;
        Task<IEnumerable<QuestionSet>> GetQuestionSet<T>() where T : Checklist;
        Task<IEnumerable<string>> GetInvisibleColumnsAsync<T>(int userId) where T : Checklist;
        Task<IEnumerable<CompletedChecklists>> GetCompletedChecklistsPerDay(int userId);
    }
}