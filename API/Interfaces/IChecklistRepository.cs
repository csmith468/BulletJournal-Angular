using API.Data.Pagination;
using API.Models.Entities;

namespace API.Data.Interfaces {
    public interface IChecklistRepository<T> where T : Checklist {
        Task<Dictionary<string, object>> AddAsync(T item);
        Task<bool> DateUsedAsync(DateOnly date, int userId);
        Task<Tuple<List<Dictionary<string, object>>, PaginationHeader>> GetListAsync(int userId, PageParams pageParams);
        Task<IDictionary<string, object>> GetByIdAsync(int userId, int itemID);
        Task<T> GetMinDateEntry(int userID);
        Task<T> GetMaxDateEntry(int userID);
        void DeleteChecklist(T checklist);
        // Task<IEnumerable<QuestionSet>> GetQuestionSet(string type);
        Task<IEnumerable<string>> GetVisibleColumnsAsync(int userId);
        // Task<IEnumerable<CompletedChecklists>> GetCompletedChecklistsPerDay(string type, int userId);
    }
}