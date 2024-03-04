using API.Data.Pagination;
using API.Models.Tables.Entities;

// Where you actually have to go into checklist 
namespace API.Data.Interfaces
{
    public interface IChecklistRepository<T> where T : Checklist {
        Task<Tuple<List<Dictionary<string, object>>, PaginationHeader>> GetListAsync(int userId, PageParams pageParams);
        Task<IDictionary<string, object>> GetByIdFilteredAsync(int userId, int itemID);
        Task<T> GetByIdAsync(int userId, int itemID);
        Task<Dictionary<string, object>> AddAsync(T item);
        void DeleteAsync(T checklist);
        Task<bool> DateUsedAsync(DateOnly date, int userId);
    }
}