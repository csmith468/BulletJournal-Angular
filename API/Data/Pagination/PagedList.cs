using API.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Pagination {
    public class PagedList<T> : List<T> where T : Checklist{
        
        public PagedList(IEnumerable<T> items, int count, int pageNumber, int pageSize, DateOnly? minDate, DateOnly? maxDate) {
            CurrentPage = pageNumber;
            TotalPages = (int) Math.Ceiling(count / (double) pageSize);
            PageSize = pageSize;
            TotalCount = count;
            MinDate = minDate;
            MaxDate = maxDate;
            AddRange(items);
        }

        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }
        public DateOnly? MinDate { get; set; }
        public DateOnly? MaxDate { get; set; }

        public static async Task<PagedList<T>> CreateAsync(IQueryable<T> source, int pageNumber, int pageSize) {
            var count = await source.CountAsync();
            // get items from the page we want (skip the items on previous pages)
            var items = await source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();

            var minDateEntry = await source.OrderBy(x => x.Date).FirstOrDefaultAsync();
            var maxDateEntry = await source.OrderByDescending(x => x.Date).FirstOrDefaultAsync();
            
            if (count > 0) {
                return new PagedList<T>(items, count, pageNumber, pageSize, minDateEntry.Date, maxDateEntry.Date);
            } else {
                return new PagedList<T>(items, count, pageNumber, pageSize, null, null);
            }
        }
    }
}