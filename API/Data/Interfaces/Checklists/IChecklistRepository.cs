using API.Data.Pagination;
using API.Models.Entities;

namespace API.Data.Interfaces {
    public interface IChecklistRepository<T> {
        Task<T> AddItemAsync(T item);
        Task<bool> DateUsedAsync(DateOnly date, int userId);
        Task<PagedList<T>> GetMyItemsAsync(int userId, PageParams pageParams);
        Task<T> GetMyItemsByIdAsync(int userId, int itemID);
    }
}