using API.Data.Pagination;
using API.Models.Entities;

namespace API.Data.Interfaces {
    public interface IChecklistRepository<T> {
        Task<T> AddAsync(T item);
        Task<bool> DateUsedAsync(DateOnly date, int userId);
        Task<PagedList<T>> GetListAsync(int userId, PageParams pageParams);
        Task<T> GetByIdAsync(int userId, int itemID);
    }
}