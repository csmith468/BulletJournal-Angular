using Microsoft.EntityFrameworkCore;

namespace API.Data.Pagination {
    public class PagedList<T> : List<T> {
        
        public PagedList(IEnumerable<T> items, int count, int pageNumber, int pageSize) {
            CurrentPage = pageNumber;
            TotalPages = (int) Math.Ceiling(count / (double) pageSize);
            PageSize = pageSize;
            TotalCount = count;
            AddRange(items);
        }

        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }

        public static async Task<PagedList<T>> CreateAsync(IQueryable<T> source, int pageNumber, int pageSize) {
            var count = await source.CountAsync();
            // get items from the page we want (skip the items on previous pages)
            var items = await source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
            return new PagedList<T>(items, count, pageNumber, pageSize);
        }
    }
}